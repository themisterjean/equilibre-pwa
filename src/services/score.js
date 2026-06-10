// score.js — Moteur Score Équilibre Global
// TODO: Remplacer localStorage par Supabase

import { getLogsByPeriod, getLogsByType } from './storage.js';

const POINTS_SPORT = {
  marche: 15,
  kb_complet: 25,
  kb_allege: 15,
  corde_complete: 20,
  corde_allegee: 12,
  vacances_a: 22,
  vacances_a_allege: 14,
  vacances_b: 18,
  vacances_c: 12,
};

const calcScoreSport = () => {
  const logs = getLogsByPeriod(7).filter(l => l.type === 'sport');
  let total = 0;
  logs.forEach(l => { total += POINTS_SPORT[l.activite] || 0; });
  return Math.min(total, 100);
};

const calcScoreNutrition = () => {
  const logs = getLogsByPeriod(7).filter(l =>
    ['repas', 'journee_libre', 'repas_libre', 'ecart_petit', 'ecart_gros'].includes(l.type)
  );

  // Group by day
  const byDay = {};
  logs.forEach(l => {
    const day = l.created_at.slice(0, 10);
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(l);
  });

  // For each of last 7 days, compute day score
  let totalPts = 0;
  let daysWithData = 0;

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStr = d.toISOString().slice(0, 10);
    const dayLogs = byDay[dayStr] || [];
    if (!dayLogs.length) continue;

    daysWithData++;
    let dayPts = 0;

    const hasJourneeLibre = dayLogs.some(l => l.type === 'journee_libre');
    if (hasJourneeLibre) {
      dayPts = 15;
    } else {
      // Check if within budget
      const repas = dayLogs.filter(l => l.type === 'repas');
      const repasLibres = dayLogs.filter(l => l.type === 'repas_libre');
      const ecartsPetits = dayLogs.filter(l => l.type === 'ecart_petit');
      const ecartsGros = dayLogs.filter(l => l.type === 'ecart_gros');

      const totalKcal = repas.reduce((s, r) => s + (r.kcal || 0), 0);
      const budget = dayLogs.find(l => l.budget)?.budget || 2320;

      if (repas.length && totalKcal <= budget) dayPts += 15;
      repasLibres.forEach(() => { dayPts += 12; });
      ecartsPetits.forEach(() => { dayPts += 8; });
      ecartsGros.forEach(() => { dayPts += 3; });
    }

    // Hydratation
    const hydro = dayLogs.find(l => l.type === 'hydratation');
    if (hydro) {
      const v = hydro.verres || 0;
      if (v < 3) dayPts -= 5;
      else if (v >= 6) dayPts += 8;
      else if (v >= 5) dayPts += 5;
    }

    totalPts += Math.max(dayPts, 0);
  }

  if (!daysWithData) return 0;
  return Math.min(Math.round(totalPts / daysWithData), 100);
};

const calcScoreSevrage = () => {
  const logs = getLogsByPeriod(7).filter(l => l.type === 'pulsion');
  let total = 0;
  logs.forEach(l => {
    if (l.resiste) total += 10;
    else total += 3;
  });
  // Neutral if no events
  if (!logs.length) return 50;
  return Math.min(total, 100);
};

export const calcScoreEquilibre = () => {
  const sport = calcScoreSport();
  const nutrition = calcScoreNutrition();
  const sevrage = calcScoreSevrage();
  return Math.round((sport * 0.4) + (nutrition * 0.4) + (sevrage * 0.2));
};

export const getZoneScore = (score) => {
  if (score >= 90) return { zone: 'Excellent', color: 'var(--color-success)', message: 'Tu es dans ta zone optimale' };
  if (score >= 70) return { zone: 'Bon rythme', color: 'var(--color-success)', message: 'Continue, tu es sur la bonne voie' };
  if (score >= 50) return { zone: 'À relancer', color: 'var(--color-alert)', message: 'Une séance aujourd\'hui te remet dans le vert' };
  return { zone: 'Attention', color: 'var(--color-alert)', message: 'Pas de jugement — une marche suffit pour repartir' };
};

// Weekly report data
export const getWeeklyReport = () => {
  const logs = getLogsByPeriod(14);
  const lastWeekLogs = logs.filter(l => {
    const today = new Date();
    const d = new Date(l.created_at);
    const diff = Math.floor((today - d) / (24 * 60 * 60 * 1000));
    return diff >= 7 && diff < 14;
  });

  const sportLogs = lastWeekLogs.filter(l => l.type === 'sport');
  const pulsionLogs = lastWeekLogs.filter(l => l.type === 'pulsion');
  const resistees = pulsionLogs.filter(l => l.resiste).length;
  const craquages = pulsionLogs.filter(l => !l.resiste).length;

  const feedbacks = [
    'Chaque jour déclaré est une victoire — continue comme ça.',
    'La régularité prime sur la performance. Tu es sur la bonne voie.',
    'Ton corps enregistre chaque effort, même les petits.',
    'Une semaine de plus dans la bonne direction. Bravo.',
    'Le chemin compte autant que la destination.',
  ];
  const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];

  return { seances: sportLogs.length, resistees, craquages, feedback };
};
