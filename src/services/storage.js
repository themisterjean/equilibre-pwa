// storage.js — TODO: Remplacer par Supabase

export const saveLog = (type, data) => {
  const logs = getLogs();
  logs.unshift({ type, ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() });
  localStorage.setItem('logs', JSON.stringify(logs));
};

export const getLogs = () => JSON.parse(localStorage.getItem('logs') || '[]');

export const getLogsByType = (type) => getLogs().filter(l => l.type === type);

export const getLogsByPeriod = (days) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return getLogs().filter(l => new Date(l.created_at) >= cutoff);
};

export const getLogsForDay = (date = new Date()) => {
  const day = date.toISOString().slice(0, 10);
  return getLogs().filter(l => l.created_at.slice(0, 10) === day);
};

export const saveProfile = (profile) => localStorage.setItem('profile', JSON.stringify(profile));

export const getProfile = () => JSON.parse(localStorage.getItem('profile') || 'null');

export const saveMesure = (mesure) => {
  const mesures = getMesures();
  mesures.push({ ...mesure, id: crypto.randomUUID(), created_at: new Date().toISOString() });
  localStorage.setItem('mesures', JSON.stringify(mesures));
};

export const getMesures = () => JSON.parse(localStorage.getItem('mesures') || '[]');

export const getLastMesure = () => {
  const m = getMesures();
  return m.length ? m[m.length - 1] : null;
};

// Aliments fréquents — apprentissage automatique
export const trackAlimentUsage = (alimentId) => {
  const freq = JSON.parse(localStorage.getItem('aliments_freq') || '{}');
  freq[alimentId] = (freq[alimentId] || 0) + 1;
  localStorage.setItem('aliments_freq', JSON.stringify(freq));
};

export const getTopAliments = (n = 10) => {
  const freq = JSON.parse(localStorage.getItem('aliments_freq') || '{}');
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(e => e[0]);
};

// First launch date — for progressive pedagogy
export const getFirstLaunchDate = () => {
  let d = localStorage.getItem('first_launch_date');
  if (!d) {
    d = new Date().toISOString();
    localStorage.setItem('first_launch_date', d);
  }
  return new Date(d);
};

export const getWeeksOfUsage = () => {
  const first = getFirstLaunchDate();
  const now = new Date();
  return Math.floor((now - first) / (7 * 24 * 60 * 60 * 1000));
};

// Last workout timestamp — for post-session notification
export const saveLastWorkout = () => localStorage.setItem('last_workout_end', new Date().toISOString());

export const getLastWorkout = () => {
  const d = localStorage.getItem('last_workout_end');
  return d ? new Date(d) : null;
};

// Streak calculation
export const getStreak = () => {
  const logs = getLogs();
  if (!logs.length) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; ; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dayStr = day.toISOString().slice(0, 10);
    const hasEvent = logs.some(l => l.created_at.slice(0, 10) === dayStr);
    // A "journee_libre" declared counts as a streak day
    const isLibre = logs.some(l => l.type === 'journee_libre' && l.created_at.slice(0, 10) === dayStr);
    if (hasEvent || isLibre) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

// Weekly report — check if we should show it (first load on Monday)
export const shouldShowWeeklyReport = () => {
  const today = new Date();
  if (today.getDay() !== 1) return false; // not Monday
  const lastReportKey = 'last_weekly_report';
  const lastReport = localStorage.getItem(lastReportKey);
  const thisWeekMonday = today.toISOString().slice(0, 10);
  if (lastReport === thisWeekMonday) return false;
  // Check if there's data from last week
  const lastWeek = getLogsByPeriod(14);
  const lastWeekData = lastWeek.filter(l => {
    const d = new Date(l.created_at);
    const diff = Math.floor((today - d) / (24 * 60 * 60 * 1000));
    return diff >= 7 && diff < 14;
  });
  return lastWeekData.length > 0;
};

export const markWeeklyReportShown = () => {
  const today = new Date();
  localStorage.setItem('last_weekly_report', today.toISOString().slice(0, 10));
};

// Settings
export const getSetting = (key, defaultValue = null) => {
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  return key in settings ? settings[key] : defaultValue;
};

export const setSetting = (key, value) => {
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  settings[key] = value;
  localStorage.setItem('settings', JSON.stringify(settings));
};

// Free meals counter this week
export const getFreeRepasThisWeek = () => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - cutoff.getDay()); // Start of week
  cutoff.setHours(0, 0, 0, 0);
  return getLogs().filter(l => l.type === 'repas_libre' && new Date(l.created_at) >= cutoff).length;
};
