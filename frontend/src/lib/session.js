// Thin session layer. Backed by localStorage today; the useSession() interface
// is designed to be a drop-in for a future Emergent Google Auth / JWT integration.

import { useEffect, useState } from 'react';

const KEY = 'vcharo.session.v1';
const EVT = 'vcharo:session';

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
};

export const setSession = (session) => {
  localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(EVT));
};

export const clearSession = () => {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
};

export const useSession = () => {
  const [user, setUser] = useState(getSession);

  useEffect(() => {
    const sync = () => setUser(getSession());
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return {
    user,
    isAuthed: !!user,
    login: (payload) => setSession({ ...payload, loggedInAt: new Date().toISOString() }),
    logout: () => clearSession(),
  };
};
