// Mentee profile store. Same swap-out pattern as mentorStore.

const KEY = 'vcharo.mentee_profile.v1';

export const defaultMenteeProfile = {
  name: '',
  city: '',
  currentRole: '',
  goal: '',
  domains: [],
  languages: ['English'],
  budget: 2000,
  availability: 'Weekday evenings',
  bio: '',
  resume: null, // { name, size, uploadedAt }
  githubUser: '',
  selectedRepos: [], // array of repo IDs
};

export const readMenteeProfile = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    return { ...defaultMenteeProfile, ...(raw || {}) };
  } catch {
    return { ...defaultMenteeProfile };
  }
};

export const writeMenteeProfile = (patch) => {
  const next = { ...readMenteeProfile(), ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('vcharo:mentee_profile'));
  return next;
};
