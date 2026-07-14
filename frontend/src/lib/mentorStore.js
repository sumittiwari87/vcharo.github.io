// Mentor profile overrides. Layers user-edited fields over the static mentor list.
// Swap `readOverrides` + `writeOverride` with a real API call and everything reading
// via `getMentor` will keep working — that's the point of this file.

import { mentors as staticMentors } from '../data/vcharo';

const KEY = 'vcharo.mentor_overrides.v1';

const readOverrides = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};

const writeAllOverrides = (all) => {
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event('vcharo:mentor_overrides'));
};

export const getMentor = (id) => {
  const base = staticMentors.find((m) => m.id === id);
  if (!base) return null;
  const override = readOverrides()[id] || {};
  return { ...base, ...override };
};

export const getAllMentors = () => {
  const overrides = readOverrides();
  return staticMentors.map((m) => ({ ...m, ...(overrides[m.id] || {}) }));
};

export const updateMentor = (id, patch) => {
  const all = readOverrides();
  all[id] = { ...(all[id] || {}), ...patch };
  writeAllOverrides(all);
  return getMentor(id);
};

export const resetMentor = (id) => {
  const all = readOverrides();
  delete all[id];
  writeAllOverrides(all);
};

export const subscribeMentorOverrides = (fn) => {
  window.addEventListener('vcharo:mentor_overrides', fn);
  return () => window.removeEventListener('vcharo:mentor_overrides', fn);
};
