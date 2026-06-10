// screenB.js — Journal de bord

import { getLogs, getLogsByPeriod, shouldShowWeeklyReport, markWeeklyReportShown } from '../services/storage.js';
import { getWeeklyReport } from '../services/score.js';

const TYPE_CONFIG = {
  repas:        { emoji: '🍽', label: 'Repas',           color: 'var(--color-success)' },
  repas_libre:  { emoji: '✨', label: 'Repas libre',      color: 'var(--color-water)' },
  journee_libre:{ emoji: '✨', label: 'Journée libre',    color: 'var(--color-water)' },
  ecart_petit:  { emoji: '🍪', label: 'Petit écart',      color: 'var(--color-text-secondary)' },
  ecart_gros:   { emoji: '🍕', label: 'Écart déclaré',    color: 'var(--color-text-secondary)' },
  sport:        { emoji: '🏋️', label: 'Séance sport',    color: 'var(--color-success)' },
  pulsion:      { emoji: '🫁', label: 'Pulsion',          color: 'var(--color-alert)' },
  hydratation:  { emoji: '💧', label: 'Hydratation',      color: 'var(--color-water)' },
  mesure:       { emoji: '📏', label: 'Mesure corporelle', color: 'var(--color-text-secondary)' },
  zepp_sync:    { emoji: '⌚', label: 'Synchro Amazfit',   color: 'var(--color-text-secondary)' },
};

const formatHour = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const formatDay = (iso) => {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayStr = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  if (d.toDateString() === today.toDateString()) return 'Aujourd\'hui';
  if (d.toDateString() === yesterday.toDateString()) return 'Hier';
  return dayStr.charAt(0).toUpperCase() + dayStr.slice(1);
};

const renderLogEntry = (log) => {
  const cfg = TYPE_CONFIG[log.type] || { emoji: '•', label: log.type, color: 'var(--color-text-secondary)' };

  let details = '';
  if (log.type === 'repas') {
    const parts = [];
    if (log.kcal) parts.push(`${log.kcal} kcal`);
    if (log.prot) parts.push(`${log.prot}g prot`);
    if (log.nom) details = `<span class="log-name">${log.nom}</span>`;
    if (parts.length) details += `<span class="log-macros">${parts.join(' · ')}</span>`;
  } else if (log.type === 'sport') {
    const parts = [];
    if (log.activite) parts.push(log.activite.replace(/_/g, ' '));
    if (log.duree) parts.push(`${log.duree} min`);
    if (log.calories) parts.push(`~${log.calories} kcal`);
    details = `<span class="log-macros">${parts.join(' · ')}</span>`;
  } else if (log.type === 'pulsion') {
    const res = log.resiste ? '✓ Résistée' : '✗ Craquage';
    const resColor = log.resiste ? 'var(--color-success)' : 'var(--color-alert)';
    details = `<span class="log-macros" style="color:${resColor}">${res}</span>`;
    if (log.sousType === 'alimentaire') cfg.emoji = '🍫';
  } else if (log.type === 'hydratation') {
    details = `<span class="log-macros">${log.verres || 0} verres · ${(log.verres || 0) * 50} cl</span>`;
  } else if (log.type === 'mesure') {
    const parts = [];
    if (log.poids) parts.push(`${log.poids} kg`);
    if (log.tourTaille) parts.push(`Tour de taille : ${log.tourTaille} cm`);
    details = `<span class="log-macros">${parts.join(' · ')}</span>`;
  } else if (log.type === 'journee_libre' || log.type === 'repas_libre') {
    details = `<span class="log-macros" style="color:var(--color-water)">Déclaré — score non impacté</span>`;
  }

  return `
    <div class="log-entry animate-in" data-id="${log.id}">
      <span class="log-emoji">${cfg.emoji}</span>
      <div class="log-content">
        <span class="log-label" style="color:${cfg.color}">${cfg.label}</span>
        ${details}
      </div>
      <span class="log-time">${formatHour(log.created_at)}</span>
    </div>
  `;
};

const groupLogsByDay = (logs) => {
  const groups = {};
  logs.forEach(log => {
    const day = log.created_at.slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(log);
  });
  return groups;
};

const renderWeeklyReportModal = (container, navigate) => {
  const report = getWeeklyReport();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay visible';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <h2 class="modal-title">Rapport de la semaine</h2>
      <div class="report-grid">
        <div class="report-stat">
          <span class="report-num">${report.seances}</span>
          <span class="report-label">séances</span>
        </div>
        <div class="report-stat">
          <span class="report-num" style="color:var(--color-success)">${report.resistees}</span>
          <span class="report-label">pulsions résistées</span>
        </div>
        ${report.craquages > 0 ? `
        <div class="report-stat">
          <span class="report-num" style="color:var(--color-alert)">${report.craquages}</span>
          <span class="report-label">déclarés honnêtement</span>
        </div>` : ''}
      </div>
      <p class="report-feedback">"${report.feedback}"</p>
      <button class="btn-primary" id="close-report">Continuer</button>
    </div>
  `;
  container.appendChild(overlay);
  overlay.querySelector('#close-report')?.addEventListener('click', () => {
    markWeeklyReportShown();
    overlay.remove();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      markWeeklyReportShown();
      overlay.remove();
    }
  });
};

export const renderScreenB = (container, navigate, data = {}) => {
  let currentFilter = 'today';

  const render = () => {
    const allLogs = currentFilter === 'today' ? getLogsByPeriod(1)
      : currentFilter === 'week' ? getLogsByPeriod(7)
      : getLogsByPeriod(30);

    const groups = groupLogsByDay(allLogs);
    const sortedDays = Object.keys(groups).sort((a, b) => b.localeCompare(a));

    const isEmpty = sortedDays.length === 0;

    container.innerHTML = `
      <div class="screen-inner">
        <header class="screen-header">
          <h1 class="screen-title">Journal de bord</h1>
        </header>

        <div class="filter-tabs">
          <button class="filter-tab ${currentFilter === 'today' ? 'active' : ''}" data-filter="today">Aujourd'hui</button>
          <button class="filter-tab ${currentFilter === 'week' ? 'active' : ''}" data-filter="week">Cette semaine</button>
          <button class="filter-tab ${currentFilter === 'month' ? 'active' : ''}" data-filter="month">Ce mois</button>
        </div>

        ${isEmpty ? `
          <div class="empty-state">
            <p class="empty-icon">📋</p>
            <p class="empty-msg">Aucune entrée pour cette période.</p>
            <p class="empty-sub">Déclare un repas ou une séance depuis le dashboard.</p>
          </div>
        ` : sortedDays.map(day => `
          <div class="log-day-group">
            <div class="log-day-header">${formatDay(day + 'T12:00:00')}</div>
            <div class="log-day-entries">
              ${groups[day].map(renderLogEntry).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Filter tabs
    container.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        render();
      });
    });
  };

  render();

  // Weekly report check
  if (shouldShowWeeklyReport()) renderWeeklyReportModal(container, navigate);
};
