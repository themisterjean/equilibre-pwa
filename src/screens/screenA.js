// screenA.js — Dashboard principal

import { saveLog, getLogsForDay, getLogs, getProfile, saveMesure, getLastMesure,
  getMesures, trackAlimentUsage, getTopAliments, saveLastWorkout, getLastWorkout,
  getSetting, setSetting, getFreeRepasThisWeek, getStreak } from '../services/storage.js';
import { calcAll, getMacroLabel, estimCaloriesSport } from '../services/metabolism.js';
import { calcScoreEquilibre, getZoneScore } from '../services/score.js';
import { searchAliments, getAlimentById, calcNutriPour } from '../data/aliments.js';
import { getCircuitKB, circuitAllegue, circuitMinimal, getProtocoleCorde,
  getCircuitVacances, getExerciceById } from '../data/circuits.js';
import { calcJoursSansTabac, getPalierActuel } from '../data/paliers-tabac.js';
import { getWeeksOfUsage } from '../services/storage.js';

// ─── SVG Jauge Circulaire ─────────────────────────────────────────────────────

const buildGauge = (consumed, budget) => {
  const r = 72;
  const cx = 96, cy = 96;
  const circ = 2 * Math.PI * r;
  const progress = Math.min(consumed / budget, 1.1);
  const dashOffset = circ * (1 - Math.min(progress, 1));
  const isOver = consumed > budget;
  const strokeColor = isOver ? 'var(--color-alert)' : 'var(--color-success)';
  const pct = Math.round((consumed / budget) * 100);

  return `
    <svg viewBox="0 0 192 192" class="caloric-gauge" aria-label="${consumed} sur ${budget} kcal consommées">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--color-border)" stroke-width="10"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
        stroke="${strokeColor}" stroke-width="10"
        stroke-dasharray="${circ.toFixed(2)}"
        stroke-dashoffset="${dashOffset.toFixed(2)}"
        stroke-linecap="round"
        transform="rotate(-90 ${cx} ${cy})"/>
      <text x="${cx}" y="${cy - 12}" text-anchor="middle"
        fill="var(--color-text-primary)" font-family="var(--font-serif)"
        font-size="28" font-weight="600">${consumed}</text>
      <text x="${cx}" y="${cy + 10}" text-anchor="middle"
        fill="var(--color-text-secondary)" font-family="var(--font-sans)" font-size="11">/ ${budget} kcal</text>
      <text x="${cx}" y="${cy + 27}" text-anchor="middle"
        fill="${isOver ? 'var(--color-alert)' : 'var(--color-text-secondary)'}"
        font-family="var(--font-sans)" font-size="10">${isOver ? 'Budget dépassé' : `${pct}% du budget`}</text>
    </svg>
  `;
};

// ─── Barre Macro ─────────────────────────────────────────────────────────────

const buildMacroBar = (nom, eaten, target, color, label) => {
  const pct = Math.min((eaten / target) * 100, 100);
  const isOver = eaten > target;
  return `
    <div class="macro-row">
      <div class="macro-header">
        <span class="macro-nom">${nom}</span>
        <span class="macro-val" style="color:${isOver ? 'var(--color-alert)' : color}">${eaten}<span class="macro-target">/${target}g</span></span>
      </div>
      <div class="macro-track">
        <div class="macro-fill" style="width:${pct}%;background:${isOver ? 'var(--color-alert)' : color}"></div>
      </div>
      ${label ? `<p class="macro-label">${label}</p>` : ''}
    </div>
  `;
};

// ─── Toast ────────────────────────────────────────────────────────────────────

const showToast = (msg, duration = 3000) => {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast animate-in';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, duration);
};

// ─── Modal helpers ────────────────────────────────────────────────────────────

const openModal = (html, onClose) => {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-sheet">${html}</div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));

  const close = () => {
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.remove(); onClose?.(); }, 300);
  };

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('[data-close]')?.addEventListener('click', close);
  return { overlay, close };
};

// ─── Modal Mesure ─────────────────────────────────────────────────────────────

const showMesureModal = (onSave) => {
  const last = getLastMesure();
  const poids = last?.poids || 120;
  const taille = last?.tourTaille || 115;

  const poidsOptions = Array.from({ length: 181 }, (_, i) => (60 + i * 0.5).toFixed(1))
    .map(v => `<option value="${v}" ${parseFloat(v) === poids ? 'selected' : ''}>${v} kg</option>`).join('');
  const tailleOptions = Array.from({ length: 181 }, (_, i) => (60 + i * 0.5).toFixed(1))
    .map(v => `<option value="${v}" ${parseFloat(v) === taille ? 'selected' : ''}>${v} cm</option>`).join('');

  const { close } = openModal(`
    <div class="modal-close-row">
      <h2 class="modal-title">Faire un point</h2>
      <button class="modal-close-btn" data-close>✕</button>
    </div>
    <p class="modal-sub">Optionnel — remplis ce que tu veux</p>
    <div class="form-group">
      <label class="form-label">Poids</label>
      <select id="mesure-poids">${poidsOptions}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Tour de taille</label>
      <select id="mesure-taille">${tailleOptions}</select>
    </div>
    <button class="btn-primary" id="save-mesure">Enregistrer</button>
  `, onSave);

  document.querySelector('#save-mesure')?.addEventListener('click', () => {
    const p = parseFloat(document.querySelector('#mesure-poids').value);
    const t = parseFloat(document.querySelector('#mesure-taille').value);
    saveMesure({ poids: p, tourTaille: t });
    close();
    showToast('📏 Mesure enregistrée');
    onSave?.();
  });
};

// ─── Modal Repas ──────────────────────────────────────────────────────────────

const showRepasModal = (dayTotals, budget, modeLibre, onSave) => {
  const topIds = getTopAliments(10);
  let selectedAliment = null;
  let quantite = 100;
  let modeComposer = false;
  const freeRepasUsed = getFreeRepasThisWeek();

  const buildModal = () => {
    const html = `
      <div class="modal-close-row">
        <h2 class="modal-title">Ajouter un repas</h2>
        <button class="modal-close-btn" data-close>✕</button>
      </div>
      <div class="repas-mode-tabs">
        <button class="repas-tab ${!modeComposer ? 'active' : ''}" id="tab-search">Recherche</button>
        <button class="repas-tab ${modeComposer ? 'active' : ''}" id="tab-composer">Avec mes placards</button>
      </div>

      ${!modeComposer ? `
        <input type="search" id="aliment-search" placeholder="Poulet, riz, yaourt..." autocomplete="off"/>
        <div class="aliment-results" id="aliment-results">
          ${renderAlimentList(searchAliments('', topIds))}
        </div>
        <div id="aliment-selected" style="display:none;">
          <div class="selected-aliment" id="selected-info"></div>
          <div class="form-group" style="margin-top:var(--space-md)">
            <label class="form-label">Quantité (grammes)</label>
            <input type="number" id="quantite-input" value="100" min="1" max="2000" step="5"/>
          </div>
          <div class="nutrival-preview" id="nutrival-preview"></div>
          <button class="btn-primary" id="add-repas">Ajouter au journal</button>
        </div>
        ${modeLibre ? `<button class="btn-ghost" id="btn-repas-libre" style="margin-top:var(--space-md)">
          Ce repas est libre ${freeRepasUsed < 2 ? `(${2 - freeRepasUsed} restant${2 - freeRepasUsed > 1 ? 's' : ''} cette sem.)` : '(limite atteinte)'}
        </button>` : ''}
      ` : `
        <p class="modal-sub">Liste tes ingrédients disponibles</p>
        <textarea id="placards-input" placeholder="Œufs, lentilles, tomates, riz..." rows="3" style="width:100%;background:var(--color-surface-raised);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:var(--space-sm);color:var(--color-text-primary);font-size:var(--font-size-md);resize:none;"></textarea>
        <button class="btn-primary" id="composer-calc" style="margin-top:var(--space-sm)">Calculer les macros</button>
        <div id="composer-result" style="display:none;"></div>
      `}
    `;
    return html;
  };

  const { overlay, close } = openModal(buildModal(), onSave);

  const setupSearch = () => {
    const input = overlay.querySelector('#aliment-search');
    const results = overlay.querySelector('#aliment-results');
    const selectedDiv = overlay.querySelector('#aliment-selected');

    input?.addEventListener('input', () => {
      const found = searchAliments(input.value, topIds);
      if (results) results.innerHTML = renderAlimentList(found);
      attachResultClicks();
    });

    const showSelected = (aliment) => {
      selectedAliment = aliment;
      selectedDiv.style.display = 'block';
      overlay.querySelector('#aliment-results').style.display = 'none';
      overlay.querySelector('#aliment-search').style.display = 'none';
      updateNutriPreview();
    };

    const attachResultClicks = () => {
      overlay.querySelectorAll('.aliment-item').forEach(el => {
        el.addEventListener('click', () => {
          const a = getAlimentById(el.dataset.id);
          if (a) showSelected(a);
        });
      });
    };
    attachResultClicks();

    overlay.querySelector('#quantite-input')?.addEventListener('input', (e) => {
      quantite = parseInt(e.target.value) || 100;
      updateNutriPreview();
    });

    overlay.querySelector('#add-repas')?.addEventListener('click', () => {
      if (!selectedAliment) return;
      const n = calcNutriPour(selectedAliment, quantite);
      saveLog('repas', { nom: selectedAliment.nom, grammes: quantite, ...n, alimentId: selectedAliment.id });
      trackAlimentUsage(selectedAliment.id);
      close();
      showToast(`✓ ${selectedAliment.nom} ajouté`);
      onSave?.();
    });

    overlay.querySelector('#btn-repas-libre')?.addEventListener('click', () => {
      if (freeRepasUsed >= 2) { showToast('Limite de 2 repas libres atteinte cette semaine'); return; }
      saveLog('repas_libre', { note: 'repas libre déclaré' });
      close();
      showToast('Repas libre déclaré');
      onSave?.();
    });
  };

  const updateNutriPreview = () => {
    if (!selectedAliment) return;
    const n = calcNutriPour(selectedAliment, quantite);
    const preview = overlay.querySelector('#nutrival-preview');
    const info = overlay.querySelector('#selected-info');
    if (info) info.innerHTML = `
      <strong>${selectedAliment.nom}</strong>
      <p class="aliment-label">${selectedAliment.label}</p>
    `;
    if (preview) preview.innerHTML = `
      <div class="nutrival-row">
        <span>${n.kcal} kcal</span>
        <span>${n.prot}g prot</span>
        <span>${n.lip}g lip</span>
        <span>${n.gluc}g gluc</span>
      </div>
      <p style="font-size:var(--font-size-xs);color:var(--color-text-secondary);margin-top:4px">
        Budget restant : ${Math.max(budget - dayTotals.kcal - n.kcal, 0)} kcal après
      </p>
    `;
  };

  const setupComposer = () => {
    overlay.querySelector('#composer-calc')?.addEventListener('click', () => {
      const input = overlay.querySelector('#placards-input')?.value || '';
      const ingredients = input.split(/[,\n]+/).map(s => s.trim().toLowerCase()).filter(Boolean);

      // Find matching aliments
      const found = ingredients.map(ing => {
        return searchAliments(ing).slice(0, 1)[0];
      }).filter(Boolean);

      if (!found.length) {
        showToast('Aucun aliment reconnu — essaie des noms simples');
        return;
      }

      const protNeeded = Math.max(0, (dayTotals.macros?.protTarget || 180) - (dayTotals.prot || 0));
      const hasLegume = found.some(a => a.categorie === 'legumes');

      // Estimate quantities
      const totalKcal = found.reduce((s, a) => s + a.kcal, 0);
      const portion = Math.round(Math.min(400 / found.length, 200));
      const composed = found.map(a => {
        const n = calcNutriPour(a, portion);
        return { ...a, grammes: portion, ...n };
      });

      const totals = composed.reduce((acc, a) => ({
        kcal: acc.kcal + a.kcal,
        prot: acc.prot + a.prot,
        lip: acc.lip + a.lip,
        gluc: acc.gluc + a.gluc,
      }), { kcal: 0, prot: 0, lip: 0, gluc: 0 });

      const suggestions = [];
      if (!hasLegume) suggestions.push('Ajouter des épinards ou brocolis maximise ta satiété');
      if (totals.prot < 25) suggestions.push('Ce repas est pauvre en protéines — ajouter des œufs ou du thon');

      const resultHtml = `
        <div class="composer-result-card">
          <p><strong>Avec ces ingrédients (${portion}g chacun) :</strong></p>
          <div class="nutrival-row" style="margin-top:var(--space-sm)">
            <span>${Math.round(totals.kcal)} kcal</span>
            <span>${Math.round(totals.prot)}g prot</span>
            <span>${Math.round(totals.lip)}g lip</span>
            <span>${Math.round(totals.gluc)}g gluc</span>
          </div>
          ${suggestions.map(s => `<p class="composer-tip">💡 ${s}</p>`).join('')}
          <button class="btn-primary" id="save-composed" style="margin-top:var(--space-md)">Enregistrer ce repas</button>
        </div>
      `;

      const resultEl = overlay.querySelector('#composer-result');
      if (resultEl) { resultEl.style.display = 'block'; resultEl.innerHTML = resultHtml; }

      overlay.querySelector('#save-composed')?.addEventListener('click', () => {
        const nom = found.map(a => a.nom).join(', ');
        saveLog('repas', { nom: `Compo: ${nom}`, ...{ kcal: Math.round(totals.kcal), prot: Math.round(totals.prot), lip: Math.round(totals.lip), gluc: Math.round(totals.gluc) } });
        close();
        showToast('✓ Repas composé enregistré');
        onSave?.();
      });
    });
  };

  overlay.querySelector('#tab-search')?.addEventListener('click', () => {
    modeComposer = false;
    overlay.querySelector('.modal-sheet').innerHTML = buildModal();
    setupSearch();
    setupComposer();
    reattachTabs();
  });

  overlay.querySelector('#tab-composer')?.addEventListener('click', () => {
    modeComposer = true;
    overlay.querySelector('.modal-sheet').innerHTML = buildModal();
    setupSearch();
    setupComposer();
    reattachTabs();
  });

  const reattachTabs = () => {
    overlay.querySelector('[data-close]')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#tab-search')?.addEventListener('click', () => {
      modeComposer = false;
      overlay.querySelector('.modal-sheet').innerHTML = buildModal();
      setupSearch(); setupComposer(); reattachTabs();
    });
    overlay.querySelector('#tab-composer')?.addEventListener('click', () => {
      modeComposer = true;
      overlay.querySelector('.modal-sheet').innerHTML = buildModal();
      setupSearch(); setupComposer(); reattachTabs();
    });
  };

  setupSearch();
  setupComposer();
};

const renderAlimentList = (aliments) => aliments.map(a => `
  <div class="aliment-item" data-id="${a.id}" role="button">
    <div>
      <span class="aliment-nom">${a.nom}</span>
      <span class="aliment-kcal">${a.kcal} kcal/100g</span>
    </div>
    <p class="aliment-label">${a.label}</p>
  </div>
`).join('');

// ─── Modal Sport ──────────────────────────────────────────────────────────────

const showSportModal = (profile, onSave, navigate) => {
  const weeks = getWeeksOfUsage ? Math.floor((new Date() - new Date(localStorage.getItem('first_launch_date') || new Date())) / (7 * 24 * 60 * 60 * 1000)) : 0;
  const modeVacances = getSetting('modeVacances', false);
  let forme = null;

  // Step 1: How are you feeling?
  const step1Html = `
    <div class="modal-close-row">
      <h2 class="modal-title">Séance sport</h2>
      <button class="modal-close-btn" data-close>✕</button>
    </div>
    <p class="modal-sub">Comment tu te sens aujourd'hui ?</p>
    <div class="forme-choices">
      <button class="forme-btn" data-forme="enforme">🟢 En forme</button>
      <button class="forme-btn" data-forme="moyen">🟡 Moyen</button>
      <button class="forme-btn" data-forme="fatigue">🔴 Fatigué</button>
    </div>
  `;

  const { overlay, close } = openModal(step1Html, onSave);

  const showStep2 = (formeChoisie) => {
    forme = formeChoisie;
    const circuit = modeVacances
      ? getCircuitVacances(formeChoisie)
      : (formeChoisie === 'enforme' ? getCircuitKB(weeks) : formeChoisie === 'moyen' ? circuitAllegue(getCircuitKB(weeks)) : circuitMinimal(getCircuitKB(weeks)));
    const corde = getProtocoleCorde(weeks);

    const fatMsg = formeChoisie === 'fatigue' ? `<p class="forme-msg">"2 tours comptent. Zéro ne compte pas."</p>` : '';

    overlay.querySelector('.modal-sheet').innerHTML = `
      <div class="modal-close-row">
        <h2 class="modal-title">Quelle activité ?</h2>
        <button class="modal-close-btn" data-close>✕</button>
      </div>
      ${fatMsg}
      <div class="activite-choices">
        <button class="activite-btn" id="btn-kb">
          <span class="activite-icon">🏋️</span>
          <div>
            <strong>${modeVacances ? circuit.nom : circuit.nom}</strong>
            <p class="activite-sub">~${circuit.dureeEstimee} min · ${circuit.tours || 3} tours</p>
          </div>
        </button>
        ${!modeVacances ? `
        <button class="activite-btn" id="btn-corde">
          <span class="activite-icon">🪢</span>
          <div>
            <strong>Corde à sauter — ${corde.nom}</strong>
            <p class="activite-sub">~${corde.dureeEstimee} min · ${corde.rounds} rounds</p>
          </div>
        </button>
        ` : ''}
        <button class="activite-btn" id="btn-marche">
          <span class="activite-icon">🚶</span>
          <div>
            <strong>Marche libre</strong>
            <p class="activite-sub">Durée libre — compte toujours</p>
          </div>
        </button>
      </div>
      <button data-close class="btn-ghost">Annuler</button>
    `;

    overlay.querySelector('[data-close]')?.addEventListener('click', close);

    overlay.querySelector('#btn-kb')?.addEventListener('click', () => {
      close();
      startSportTimer(circuit, profile, navigate, onSave, 'kb');
    });
    overlay.querySelector('#btn-corde')?.addEventListener('click', () => {
      close();
      startSportTimer(corde, profile, navigate, onSave, 'corde');
    });
    overlay.querySelector('#btn-marche')?.addEventListener('click', () => {
      close();
      startMarcheTimer(profile, navigate, onSave);
    });
  };

  overlay.querySelectorAll('.forme-btn').forEach(btn => {
    btn.addEventListener('click', () => showStep2(btn.dataset.forme));
  });
};

// ─── Timer Séance ─────────────────────────────────────────────────────────────

let sportTimerInterval = null;

const playTone = (freq, vol = 0.25, dur = 0.4) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch (_) {}
};

const startSportTimer = (circuit, profile, navigate, onSave) => {
  const exercises = circuit.exercices || [];
  const repos = circuit.repos || 75;
  const tours = circuit.tours || 3;
  let currentTour = 1;
  let currentExIdx = 0;
  let isRepos = false;
  let phaseSeconds = 0;
  let totalSeconds = 0;
  let paused = false;

  const totalExercicesParTour = exercises.length;
  const phases = [];
  for (let t = 1; t <= tours; t++) {
    exercises.forEach(ex => {
      phases.push({ type: 'exercice', tour: t, exercise: ex });
    });
    if (t < tours) phases.push({ type: 'repos', tour: t, duree: repos });
  }

  let phaseIdx = 0;
  let phaseDuration = 0;
  let phaseElapsed = 0;

  const getPhase = () => phases[phaseIdx] || null;
  const getPhaseDuration = (p) => p.type === 'repos' ? p.duree : (p.exercise.duree || 45);

  const overlay = document.createElement('div');
  overlay.className = 'sport-timer-overlay';
  document.body.appendChild(overlay);

  const startPhase = () => {
    const p = getPhase();
    if (!p) { endWorkout(); return; }
    phaseDuration = getPhaseDuration(p);
    phaseElapsed = 0;
    playTone(p.type === 'repos' ? 330 : 660);
    renderTimer();
  };

  const renderTimer = () => {
    const p = getPhase();
    if (!p) return;
    const remaining = phaseDuration - phaseElapsed;

    let phaseLabel, exerciseInfo, subInfo;
    if (p.type === 'repos') {
      phaseLabel = 'REPOS';
      exerciseInfo = `Récupération`;
      subInfo = `Tour ${p.tour} terminé`;
    } else {
      phaseLabel = `TOUR ${p.tour} / ${tours}`;
      exerciseInfo = p.exercise.nom;
      subInfo = `${p.exercise.reps || `${p.exercise.duree}s`} · ${p.exercise.kb || ''}`;
    }

    const progTotal = (phaseIdx / phases.length) * 100;
    const progPhase = (phaseElapsed / phaseDuration) * 100;
    const circumference = 2 * Math.PI * 60;

    overlay.innerHTML = `
      <div class="sport-timer-screen">
        <div class="sport-timer-top">
          <span class="sport-phase-label" style="color:${p.type === 'repos' ? 'var(--color-water)' : 'var(--color-success)'}">${phaseLabel}</span>
          <span class="sport-total-time">${formatSecs(totalSeconds)}</span>
        </div>

        <div class="sport-timer-center">
          <svg viewBox="0 0 140 140" class="sport-timer-svg">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-border)" stroke-width="6"/>
            <circle cx="70" cy="70" r="60" fill="none"
              stroke="${p.type === 'repos' ? 'var(--color-water)' : 'var(--color-success)'}"
              stroke-width="6"
              stroke-dasharray="${circumference.toFixed(1)}"
              stroke-dashoffset="${(circumference * (1 - progPhase / 100)).toFixed(1)}"
              stroke-linecap="round"
              transform="rotate(-90 70 70)"/>
            <text x="70" y="65" text-anchor="middle"
              fill="var(--color-text-primary)" font-family="var(--font-serif)"
              font-size="32" font-weight="600">${remaining}</text>
            <text x="70" y="84" text-anchor="middle"
              fill="var(--color-text-secondary)" font-family="var(--font-sans)" font-size="10">secondes</text>
          </svg>
        </div>

        <div class="sport-exercise-info">
          <p class="sport-exercise-name">${exerciseInfo}</p>
          <p class="sport-exercise-sub">${subInfo}</p>
          ${p.type === 'exercice' && p.exercise.consigne ? `<p class="sport-consigne">${p.exercise.consigne}</p>` : ''}
        </div>

        <!-- Progress bar total -->
        <div class="sport-progress-total">
          <div class="sport-progress-fill" style="width:${progTotal}%"></div>
        </div>

        <!-- Next up -->
        ${phases[phaseIdx + 1] ? `
          <p class="sport-next">Ensuite : ${phases[phaseIdx + 1].type === 'repos' ? 'Repos' : phases[phaseIdx + 1].exercise?.nom}</p>
        ` : ''}

        <div class="sport-timer-btns">
          <button class="sport-pause-btn" id="timer-pause">${paused ? '▶ Reprendre' : '⏸ Pause'}</button>
          <button class="sport-skip-btn" id="timer-skip">⏭ Passer</button>
          <button class="sport-stop-btn" id="timer-stop">Arrêter</button>
        </div>
      </div>
    `;

    overlay.querySelector('#timer-pause')?.addEventListener('click', () => {
      paused = !paused;
    });
    overlay.querySelector('#timer-skip')?.addEventListener('click', () => {
      phaseIdx++;
      startPhase();
    });
    overlay.querySelector('#timer-stop')?.addEventListener('click', () => {
      endWorkout(true);
    });
  };

  sportTimerInterval = setInterval(() => {
    if (paused) return;
    phaseElapsed++;
    totalSeconds++;

    if (phaseElapsed >= phaseDuration) {
      phaseIdx++;
      startPhase();
    } else {
      renderTimer();
    }
  }, 1000);

  const endWorkout = (early = false) => {
    if (sportTimerInterval) { clearInterval(sportTimerInterval); sportTimerInterval = null; }
    const duree = Math.round(totalSeconds / 60);
    const calories = estimCaloriesSport(circuit.typeActivite || 'kb_complet', duree, profile?.poids || 120);

    overlay.innerHTML = `
      <div class="sport-finish-screen">
        <p class="finish-emoji">🏆</p>
        <p class="finish-title">${early ? 'Séance terminée' : 'Séance complète !'}</p>
        <div class="finish-stats">
          <div class="finish-stat"><span>${duree}</span><span>min</span></div>
          <div class="finish-stat"><span>~${calories}</span><span>kcal</span></div>
        </div>
        <button class="btn-primary" id="finish-save">Enregistrer</button>
        <button class="btn-ghost" id="finish-discard">Annuler</button>
      </div>
    `;

    overlay.querySelector('#finish-save')?.addEventListener('click', () => {
      saveLog('sport', { activite: circuit.typeActivite || 'kb_complet', nom: circuit.nom, duree, calories, tours: phaseIdx });
      saveLastWorkout();
      overlay.remove();
      showToast(`💪 ${duree} min enregistrées — ${calories} kcal`);
      onSave?.();
    });
    overlay.querySelector('#finish-discard')?.addEventListener('click', () => { overlay.remove(); });
  };

  startPhase();
};

const startMarcheTimer = (profile, navigate, onSave) => {
  let seconds = 0;
  let paused = false;

  const overlay = document.createElement('div');
  overlay.className = 'sport-timer-overlay';
  document.body.appendChild(overlay);

  const render = () => {
    overlay.innerHTML = `
      <div class="sport-timer-screen">
        <p class="sport-phase-label" style="color:var(--color-success)">🚶 MARCHE</p>
        <div class="sport-timer-center">
          <svg viewBox="0 0 140 140" class="sport-timer-svg">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-border)" stroke-width="6"/>
            <text x="70" y="68" text-anchor="middle" fill="var(--color-text-primary)" font-family="var(--font-serif)" font-size="28" font-weight="600">${formatSecs(seconds)}</text>
            <text x="70" y="86" text-anchor="middle" fill="var(--color-success)" font-family="var(--font-sans)" font-size="10">EN COURS</text>
          </svg>
        </div>
        <p class="sport-consigne" style="text-align:center">Marche à ton rythme — l'essentiel est d'être dehors.</p>
        <div class="sport-timer-btns">
          <button class="sport-pause-btn" id="timer-pause">${paused ? '▶ Reprendre' : '⏸ Pause'}</button>
          <button class="sport-stop-btn" id="timer-stop">Terminer</button>
        </div>
      </div>
    `;
    overlay.querySelector('#timer-pause')?.addEventListener('click', () => { paused = !paused; render(); });
    overlay.querySelector('#timer-stop')?.addEventListener('click', endMarche);
  };

  const endMarche = () => {
    clearInterval(sportTimerInterval);
    const duree = Math.round(seconds / 60);
    const calories = estimCaloriesSport('marche', duree, profile?.poids || 120);
    saveLog('sport', { activite: 'marche', nom: 'Marche', duree, calories });
    saveLastWorkout();
    overlay.remove();
    showToast(`🚶 ${duree} min de marche — ${calories} kcal`);
    onSave?.();
  };

  sportTimerInterval = setInterval(() => { if (!paused) { seconds++; render(); } }, 1000);
  render();
};

const formatSecs = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

// ─── Screen principale ────────────────────────────────────────────────────────

export const renderScreenA = (container, navigate, data = {}) => {
  if (data.toast) showToast(data.toast);

  const profile = getProfile();
  if (!profile) { container.innerHTML = '<div class="screen-inner"><p>Chargement…</p></div>'; return; }

  const { budget, macros } = calcAll(profile);
  const score = calcScoreEquilibre();
  const zone = getZoneScore(score);
  const streak = getStreak();
  const jours = calcJoursSansTabac(profile.dateArret);
  const palier = getPalierActuel(jours);
  const weeks = Math.floor((new Date() - new Date(localStorage.getItem('first_launch_date') || new Date())) / (7 * 24 * 60 * 60 * 1000));

  // Totaux du jour
  const dayLogs = getLogsForDay();
  const repasLogs = dayLogs.filter(l => l.type === 'repas');
  const hydro = dayLogs.filter(l => l.type === 'hydratation');
  const verres = hydro.length ? hydro[hydro.length - 1].verres || 0 : 0;

  const totals = repasLogs.reduce((acc, r) => ({
    kcal: acc.kcal + (r.kcal || 0),
    prot: acc.prot + (r.prot || 0),
    lip: acc.lip + (r.lip || 0),
    gluc: acc.gluc + (r.gluc || 0),
  }), { kcal: 0, prot: 0, lip: 0, gluc: 0 });

  const modeLibre = getSetting('modeAlimentation', 'repas') === 'repas';
  const isJourneeLibre = dayLogs.some(l => l.type === 'journee_libre');
  const modeVacances = getSetting('modeVacances', false);

  // Post-workout notification (within 30 min)
  const lastWorkout = getLastWorkout();
  const showPostWorkout = lastWorkout && (new Date() - lastWorkout) < 30 * 60 * 1000;

  // Suggestion de mesure tous les 18 jours
  const mesures = getMesures();
  const lastMesure = mesures.length ? mesures[mesures.length - 1] : null;
  const daysSinceMesure = lastMesure ? Math.floor((new Date() - new Date(lastMesure.created_at)) / (24 * 60 * 60 * 1000)) : 999;
  const showMesureSuggestion = daysSinceMesure >= 18;

  // Hydratation gouttes SVG
  const dropSVG = (filled) => `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" style="color:${filled ? 'var(--color-water)' : 'var(--color-border)'}"><path d="M14 2 C14 2 2 16 2 23 C2 30 7.4 34 14 34 C20.6 34 26 30 26 23 C26 16 14 2 14 2Z" fill="currentColor"/></svg>`;
  const dropsHtml = Array.from({ length: 5 }, (_, i) => dropSVG(i < verres)).join('');
  const overflowHtml = verres > 5 ? `<span class="hydra-overflow">+${verres - 5}</span>` : '';

  container.innerHTML = `
    <div class="screen-inner">
      ${modeVacances ? '<div class="mode-badge">🏖 Mode Vacances actif</div>' : ''}

      <!-- Score + Palier -->
      <section class="score-section">
        <div class="score-main">
          <span class="score-number" style="color:${zone.color}">${score}</span>
          <div class="score-details">
            <span class="score-zone" style="color:${zone.color}">${zone.zone}</span>
            <span class="score-streak">${streak > 0 ? `🔥 ${streak} jour${streak > 1 ? 's' : ''}` : ''}</span>
            <span class="score-tabac" style="color:var(--color-text-secondary)">Jour ${jours} sans tabac</span>
          </div>
        </div>
        ${palier ? `<p class="score-palier animate-in" style="color:var(--color-success)">✓ ${palier.titre} — "${palier.message}"</p>` : ''}
        <p class="score-msg" style="color:var(--color-text-secondary)">${zone.message}</p>
      </section>

      ${showPostWorkout ? `
        <div class="post-workout-banner animate-in">
          <span>⚡ Fenêtre idéale : mange 30g de protéines maintenant.</span>
          <span class="post-workout-sub">Œufs, fromage blanc, jambon, thon</span>
        </div>
      ` : ''}

      <!-- Jauge calorique -->
      ${isJourneeLibre ? `
        <section class="card journee-libre-card">
          <p class="journee-libre-label">✨ Journée libre — Profitez. Revenez demain.</p>
        </section>
      ` : `
        <section class="card gauge-section">
          <div class="gauge-wrapper">
            ${buildGauge(Math.round(totals.kcal), budget)}
          </div>
        </section>

        <!-- Macros -->
        <section class="card macros-section">
          ${buildMacroBar('Protéines', Math.round(totals.prot), macros.proteines, 'var(--color-success)',
            weeks >= 3 ? getMacroLabel('proteines', weeks) : null)}
          ${buildMacroBar('Lipides', Math.round(totals.lip), macros.lipides, 'var(--color-water)',
            weeks >= 3 ? getMacroLabel('lipides', weeks) : null)}
          ${buildMacroBar('Glucides', Math.round(totals.gluc), macros.glucides, 'var(--color-alert)',
            weeks >= 3 ? getMacroLabel('glucides', weeks) : null)}
        </section>
      `}

      <!-- Hydratation -->
      <section class="card hydra-section">
        <div class="hydra-row">
          <div class="hydra-drops">${dropsHtml}${overflowHtml}</div>
          <span class="hydra-count" style="color:var(--color-water)">${verres}</span>
          <button class="hydra-reset" id="btn-hydra-reset" aria-label="Réinitialiser">↺</button>
        </div>
      </section>

      <!-- SOS Pulsion -->
      <button class="sos-btn" id="btn-sos">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--color-alert)" stroke-width="1.5"/><path d="M10 5v6M10 13.5v.5" stroke="var(--color-alert)" stroke-width="2" stroke-linecap="round"/></svg>
        SOS Pulsion
      </button>

      <!-- Actions -->
      <div class="action-grid">
        <button class="action-btn" id="btn-repas">
          <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Repas</span>
        </button>
        <button class="action-btn" id="btn-zepp">
          <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 1 1 1.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 13V9h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Synchro</span>
        </button>
        <button class="action-btn action-btn-wide" id="btn-mesure">
          <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="7" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M6 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Faire un point${showMesureSuggestion ? ' ·' : ''}</span>
          ${showMesureSuggestion ? `<span class="mesure-dot"></span>` : ''}
        </button>
        <button class="action-btn action-btn-wide" id="btn-sport">
          <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 9l1.5 6M13 9l-1.5 6M5 9h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Séance sport</span>
        </button>
        ${!isJourneeLibre && getSetting('modeAlimentation') === 'journee' ? `
          <button class="action-btn action-btn-wide" id="btn-journee-libre">
            <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
            <span>Journée libre</span>
          </button>
        ` : ''}
      </div>

      ${showMesureSuggestion ? `
        <p class="mesure-suggestion">Ça fait ${daysSinceMesure} jours — si tu veux faire un point c'est le bon moment.</p>
      ` : ''}
    </div>
  `;

  const rerender = () => renderScreenA(container, navigate, {});

  // Hydratation — toujours +1 sans limite, jamais -1
  // Lit le stockage à chaque tap pour éviter la valeur figée de la closure
  const updateHydro = (delta) => {
    const todayLogs = getLogsForDay();
    const existingHydro = todayLogs.find(l => l.type === 'hydratation');
    const current = existingHydro?.verres || 0;
    const next = delta === 0 ? 0 : current + 1;
    if (existingHydro) {
      const all = getLogs();
      const i = all.findIndex(l => l.id === existingHydro.id);
      if (i >= 0) { all[i].verres = next; localStorage.setItem('logs', JSON.stringify(all)); }
    } else {
      saveLog('hydratation', { verres: next });
    }
  };

  container.querySelector('.hydra-section')?.addEventListener('click', (e) => {
    if (e.target.closest('#btn-hydra-reset')) return;
    updateHydro(1);
    rerender();
  });

  container.querySelector('#btn-hydra-reset')?.addEventListener('click', () => {
    updateHydro(0);
    rerender();
  });

  // SOS
  container.querySelector('#btn-sos')?.addEventListener('click', () => navigate('D', { type: 'tabac' }));

  // Repas
  container.querySelector('#btn-repas')?.addEventListener('click', () => showRepasModal(totals, budget, modeLibre, rerender));

  // Zepp
  container.querySelector('#btn-zepp')?.addEventListener('click', async () => {
    const btn = container.querySelector('#btn-zepp');
    if (btn) btn.textContent = '⏳';
    const { syncZepp } = await import('../services/zepp.js');
    await syncZepp();
    if (btn) { btn.innerHTML = '<svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 1 1 1.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 13V9h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Synchro</span>'; }
    showToast('⌚ Données Amazfit synchronisées');
  });

  // Mesure
  container.querySelector('#btn-mesure')?.addEventListener('click', () => showMesureModal(rerender));

  // Sport
  container.querySelector('#btn-sport')?.addEventListener('click', () => showSportModal(profile, rerender, navigate));

  // Journée libre
  container.querySelector('#btn-journee-libre')?.addEventListener('click', () => {
    saveLog('journee_libre', {});
    showToast('✨ Journée libre déclarée');
    rerender();
  });
};
