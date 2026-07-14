"""Backend regression tests for Vcharo iteration 4.

Covers:
- Root API tagline (Vcharo rename)
- Waitlist POST + count endpoints
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or os.environ.get(
    "PUBLIC_BACKEND_URL", ""
).rstrip("/")

# Fall back to reading from frontend/.env in the test env
if not BASE_URL:
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass

assert BASE_URL, "REACT_APP_BACKEND_URL is required"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root / rename ----------
class TestRoot:
    def test_root_returns_vcharo_tagline(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("message") == "Vcharo API is live", data
        # Ensure the old brand did NOT leak into the API response
        assert "VICHARO" not in str(data)
        assert "vicharo" not in str(data).lower()


# ---------- Waitlist ----------
class TestWaitlist:
    def test_waitlist_count_returns_integer(self, api):
        r = api.get(f"{BASE_URL}/api/waitlist/count")
        assert r.status_code == 200, r.text
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 0

    def test_waitlist_post_new_email(self, api):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"

        # Baseline count
        before = api.get(f"{BASE_URL}/api/waitlist/count").json()["count"]

        r = api.post(
            f"{BASE_URL}/api/waitlist",
            json={"email": email, "role": "mentee", "source": "iteration-4-test"},
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("success") is True
        assert data.get("already_registered") is False
        assert "id" in data

        after = api.get(f"{BASE_URL}/api/waitlist/count").json()["count"]
        assert after == before + 1

    def test_waitlist_duplicate_email_idempotent(self, api):
        email = f"dup_{uuid.uuid4().hex[:8]}@example.com"
        r1 = api.post(f"{BASE_URL}/api/waitlist", json={"email": email, "role": "mentor"})
        assert r1.status_code == 200
        assert r1.json()["already_registered"] is False

        r2 = api.post(f"{BASE_URL}/api/waitlist", json={"email": email, "role": "mentor"})
        assert r2.status_code == 200
        assert r2.json()["already_registered"] is True

    def test_waitlist_rejects_invalid_role(self, api):
        r = api.post(
            f"{BASE_URL}/api/waitlist",
            json={"email": f"role_{uuid.uuid4().hex[:8]}@example.com", "role": "admin"},
        )
        assert r.status_code == 400

    def test_waitlist_rejects_bad_email(self, api):
        r = api.post(f"{BASE_URL}/api/waitlist", json={"email": "not-an-email"})
        assert r.status_code == 422
