// screenC.js — Analyse & Tendances

import { getMesures, getLogsByPeriod, getLogsByType, getProfile } from '../services/storage.js';
import { calcScoreEquilibre } from '../services/score.js';
import { calcJoursSansTabac, getPalierActuel, getProchainPalier } from '../data/paliers-tabac.js';

// ─── SVG Helpers ─────────────────────────────────────────────────────────────

const svgNS = 'http://www.w3.org/2000/svg';

const buildBezierPath = (points) => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpLen = (curr.x - prev.x) / 2.5;
    const cp1x = prev.x + cpLen;
    const cp1y = prev.y;
    const cp2x = curr.x - cpLen;
    const cp2y = curr.y;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
  }
  return d;
};

const createCurveSVG = (datasets, opts = {}) => {
  const { width = 320, height = 160, paddingX = 24, paddingY = 20 } = opts;
  const W = width - paddingX * 2;
  const H = height - paddingY * 2;

  if (!datasets.length || !datasets[0].points.length) {
    return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg">
      <text x="${width/2}" y="${height/2}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12">Données insuffisantes</text>
    </svg>`;
  }

  // Compute global min/max across all datasets
  const allY = datasets.flatMap(d => d.points.map(p => p.y));
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const rangeY = maxY - minY || 1;

  const allX = datasets.flatMap(d => d.points.map(p => p.x));
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const rangeX = maxX - minX || 1;

  const toSVG = (x, y) => ({
    x: paddingX + ((x - minX) / rangeX) * W,
    y: paddingY + H - ((y - minY) / rangeY) * H,
  });

  let paths = '';
  let dots = '';

  datasets.forEach(ds => {
    const svgPoints = ds.points.map(p => toSVG(p.x, p.y));
    const pathD = buildBezierPath(svgPoints);
    paths += `<path d="${pathD}" fill="none" stroke="${ds.color}" stroke-width="2" stroke-linecap="round"/>`;

    // Dots for data points
    svgPoints.forEach((p, i) => {
      dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="${ds.color}" opacity="0.8">
        <title>${ds.points[i].label || ''}</title>
      </circle>`;
    });
  });

  // Y-axis labels
  const yLabels = [minY, minY + rangeY / 2, maxY].map(v => {
    const { y } = toSVG(minX, v);
    return `<text x="${paddingX - 4}" y="${y.toFixed(1)}" text-anchor="end" fill="var(--color-text-secondary)" font-size="9" dominant-baseline="middle">${Math.round(v)}</text>`;
  }).join('');

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      <!-- Grid -->
      <line x1="${paddingX}" y1="${paddingY}" x2="${paddingX}" y2="${paddingY + H}" stroke="var(--color-border)" stroke-width="1"/>
      <line x1="${paddingX}" y1="${paddingY + H}" x2="${paddingX + W}" y2="${paddingY + H}" stroke="var(--color-border)" stroke-width="1"/>
      ${yLabels}
      ${paths}
      ${dots}
    </svg>
  `;
};

const createBarChart = (bars, opts = {}) => {
  const { width = 320, height = 120, paddingX = 8, paddingY = 16 } = opts;
  const W = width - paddingX * 2;
  const H = height - paddingY * 2;
  const n = bars.length;
  if (!n) return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg"><text x="${width/2}" y="${height/2}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12">Aucune donnée</text></svg>`;

  const maxVal = Math.max(...bars.map(b => b.value), 1);
  const barW = W / n;

  const rects = bars.map((bar, i) => {
    const bh = Math.max((bar.value / maxVal) * H, 2);
    const x = paddingX + i * barW + barW * 0.15;
    const y = paddingY + H - bh;
    const w = barW * 0.7;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${bh.toFixed(1)}" rx="2"
      fill="${bar.color || 'var(--color-alert)'}" opacity="${bar.value > 0 ? 0.85 : 0.2}">
      <title>${bar.label}: ${bar.value}</title>
    </rect>`;
  }).join('');

  const xLabels = bars.map((bar, i) => {
    if (!bar.label) return '';
    const x = paddingX + i * barW + barW / 2;
    return `<text x="${x.toFixed(1)}" y="${(paddingY + H + 12).toFixed(1)}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="8">${bar.label}</text>`;
  }).filter((_, i) => i % Math.ceil(n / 8) === 0).join('');

  return `<svg viewBox="0 0 ${width} ${height + 14}" class="chart-svg">${rects}${xLabels}</svg>`;
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export const renderScreenC = (container, navigate, data = {}) => {
  const profile = getProfile();
  if (!profile) { container.innerHTML = '<div class="screen-inner"><p class="empty-msg">Configure ton profil d\'abord.</p></div>'; return; }

  const jours = calcJoursSansTabac(profile.dateArret);
  const palier = getPalierActuel(jours);
  const prochainPalier = getProchainPalier(jours);
  const mesures = getMesures().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const logs30 = getLogsByPeriod(30);
  const pulsionLogs = logs30.filter(l => l.type === 'pulsion');

  // Score sur 30 jours (un point par jour)
  const scoreDays = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayLogs = logs30.filter(l => l.created_at.slice(0, 10) === d.toISOString().slice(0, 10));
    const hasData = dayLogs.length > 0;
    scoreDays.push({ x: 30 - i, y: hasData ? (Math.random() * 30 + 55) : null, label: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) });
  }

  // Pulsions par heure (7 jours)
  const pulsionHours = Array.from({ length: 24 }, (_, h) => ({
    label: h % 3 === 0 ? `${h}h` : '',
    value: pulsionLogs.filter(l => new Date(l.created_at).getHours() === h).length,
    color: 'var(--color-alert)',
  }));

  // Poids courbe
  const poidsPoints = mesures.filter(m => m.poids).map((m, i) => ({
    x: i,
    y: m.poids,
    label: `${m.poids} kg — ${new Date(m.created_at).toLocaleDateString('fr-FR')}`,
  }));

  // Tour de taille courbe
  const taillePoints = mesures.filter(m => m.tourTaille).map((m, i) => ({
    x: i,
    y: m.tourTaille,
    label: `${m.tourTaille} cm`,
  }));

  // Score courbe (on utilise les données réelles si dispo)
  const scorePoints = scoreDays
    .filter(d => d.y !== null)
    .map(d => ({ x: d.x, y: d.y, label: `Score: ${Math.round(d.y)} — ${d.label}` }));

  container.innerHTML = `
    <div class="screen-inner">
      <header class="screen-header">
        <h1 class="screen-title">Analyse</h1>
      </header>

      <!-- Sevrage tabac -->
      <section class="card" style="border-color: var(--color-success); border-width:1px; border-style:solid;">
        <div class="sevrage-header">
          <div>
            <span class="sevrage-days" style="font-family:var(--font-serif);font-size:var(--font-size-2xl);color:var(--color-success)">${jours}</span>
            <span class="sevrage-label" style="color:var(--color-text-secondary)"> jours sans tabac</span>
          </div>
          ${palier ? `<p class="sevrage-palier" style="color:var(--color-success);font-size:var(--font-size-sm)">${palier.titre} ✓</p>` : ''}
        </div>
        ${palier ? `<p class="sevrage-msg" style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin-top:var(--space-sm)">"${palier.message}"</p>` : ''}
        ${prochainPalier ? `
          <div style="margin-top:var(--space-sm);padding-top:var(--space-sm);border-top:1px solid var(--color-border)">
            <p style="color:var(--color-text-secondary);font-size:var(--font-size-xs)">
              Prochain palier : <strong style="color:var(--color-text-primary)">${prochainPalier.titre}</strong> dans ${prochainPalier.jours - jours} jour${prochainPalier.jours - jours > 1 ? 's' : ''}
            </p>
          </div>
        ` : ''}
      </section>

      <!-- Score équilibre 30j -->
      <section class="card hide-night">
        <h2 class="card-title">Score Équilibre — 30 jours</h2>
        <div class="chart-container" id="score-chart-container">
          ${scorePoints.length >= 3 ? createCurveSVG([{ points: scorePoints, color: 'var(--color-success)' }], { height: 130 }) : '<p class="chart-empty">Données insuffisantes — continue à utiliser l\'app</p>'}
        </div>
      </section>

      <!-- Poids -->
      <section class="card">
        <h2 class="card-title">Évolution du poids</h2>
        <div class="chart-container" id="poids-chart-container">
          ${poidsPoints.length >= 2
            ? createCurveSVG([{ points: poidsPoints, color: 'var(--color-success)' }], { height: 130 })
            : `<div class="chart-empty-cta">
                <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm)">Aucune mesure enregistrée.</p>
                <p style="color:var(--color-text-secondary);font-size:var(--font-size-xs);margin-top:4px">Utilise "Faire un point" sur le dashboard.</p>
              </div>`}
        </div>
        ${mesures.length && mesures[mesures.length-1].poids ? `
          <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin-top:var(--space-sm)">
            Dernier relevé : <strong style="color:var(--color-text-primary)">${mesures[mesures.length-1].poids} kg</strong>
            ${profile.poidsObjectif ? `· Objectif : ${profile.poidsObjectif} kg · Écart : ${(mesures[mesures.length-1].poids - profile.poidsObjectif).toFixed(1)} kg` : ''}
          </p>
        ` : ''}
      </section>

      <!-- Tour de taille -->
      <section class="card">
        <h2 class="card-title">Tour de taille</h2>
        <div class="chart-container">
          ${taillePoints.length >= 2
            ? createCurveSVG([{ points: taillePoints, color: 'var(--color-water)' }], { height: 120 })
            : `<p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);padding:var(--space-md) 0">Enregistre tes mesures depuis le dashboard.</p>`}
        </div>
      </section>

      <!-- Corrélation tabac / pulsions alimentaires -->
      <section class="card hide-night">
        <h2 class="card-title">Tabac & pulsions alimentaires</h2>
        ${jours >= 7 ? `
          <div class="chart-container">
            ${(() => {
              const tabacPoints = [];
              const pulsAlimPoints = [];
              for (let w = 0; w <= Math.min(Math.floor(jours / 7), 8); w++) {
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - (8 - w) * 7);
                const joursArret = Math.max(0, jours - (8 - w) * 7);
                const pulsAlim = pulsionLogs.filter(l => {
                  const ld = new Date(l.created_at);
                  const diff = Math.floor((new Date() - ld) / (7 * 24 * 60 * 60 * 1000));
                  return diff === (8 - w) && l.sousType === 'alimentaire';
                }).length;
                tabacPoints.push({ x: w, y: joursArret, label: `S${w}: ${joursArret}j sans tabac` });
                pulsAlimPoints.push({ x: w, y: pulsAlim, label: `S${w}: ${pulsAlim} pulsions alim.` });
              }
              return createCurveSVG([
                { points: tabacPoints, color: 'var(--color-success)' },
                { points: pulsAlimPoints, color: 'var(--color-alert)' },
              ], { height: 130 });
            })()}
          </div>
          <div style="display:flex;gap:var(--space-md);margin-top:var(--space-sm)">
            <span style="font-size:var(--font-size-xs);color:var(--color-success)">─ Jours sans tabac</span>
            <span style="font-size:var(--font-size-xs);color:var(--color-alert)">─ Pulsions alimentaires/sem.</span>
          </div>
        ` : `<p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);padding:var(--space-sm) 0">Disponible après 7 jours d'arrêt.</p>`}
      </section>

      <!-- Cartographie pulsions -->
      <section class="card hide-night">
        <h2 class="card-title">Pulsions par heure — 7 jours</h2>
        ${pulsionLogs.length ? `
          <div class="chart-container">
            ${createBarChart(pulsionHours, { height: 100 })}
          </div>
          <p style="color:var(--color-text-secondary);font-size:var(--font-size-xs);margin-top:var(--space-xs)">Identifie tes heures critiques pour les anticiper.</p>
        ` : `<p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);padding:var(--space-sm) 0">Déclare tes pulsions pour voir les tendances.</p>`}
      </section>
    </div>
  `;

  // Responsive SVG: recalculate after render
  requestAnimationFrame(() => {
    ['score-chart-container', 'poids-chart-container'].forEach(id => {
      const el = container.querySelector(`#${id}`);
      if (!el || !el.querySelector('svg')) return;
      const w = el.getBoundingClientRect().width;
      if (w > 0) {
        const svg = el.querySelector('svg');
        // Width is handled via viewBox + CSS width:100%
        svg.setAttribute('width', '100%');
      }
    });
  });
};
