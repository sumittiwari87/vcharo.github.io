// Connect / booking requests store. Shape:
// {
//   id, direction: 'mentor->mentee' | 'mentee->mentor',
//   mentorId, menteeId,
//   customPrice: number | null,  (only mentor-initiated requests can set this)
//   note?: string,
//   status: 'pending' | 'accepted' | 'declined',
//   createdAt: ISOString
// }
// Same swap-out pattern — replace read/write with /api/requests later.

const KEY = 'vcharo.requests.v1';
const EVT = 'vcharo:requests';

let nextId = 1;

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

const write = (arr) => {
  localStorage.setItem(KEY, JSON.stringify(arr));
  window.dispatchEvent(new Event(EVT));
};

export const listRequests = (filter = {}) =>
  read().filter((r) => {
    if (filter.mentorId && r.mentorId !== filter.mentorId) return false;
    if (filter.menteeId && r.menteeId !== filter.menteeId) return false;
    if (filter.direction && r.direction !== filter.direction) return false;
    if (filter.status && r.status !== filter.status) return false;
    return true;
  });

export const createRequest = (payload) => {
  const all = read();
  const req = {
    id: `req-${Date.now()}-${nextId++}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...payload,
  };
  all.push(req);
  write(all);
  return req;
};

export const updateRequestStatus = (id, status) => {
  const all = read().map((r) => (r.id === id ? { ...r, status } : r));
  write(all);
};

export const subscribeRequests = (fn) => {
  window.addEventListener(EVT, fn);
  return () => window.removeEventListener(EVT, fn);
};
