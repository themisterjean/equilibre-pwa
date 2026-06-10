// screenD.js — Respirateur SOS Pulsion

import { saveLog } from '../services/storage.js';

let wakeLock = null;
let timerInterval = null;
let breatheAnimFrame = null;

const requestWakeLock = async () => {
  if ('wakeLock' in navigator) {
    try { wakeLock = await navigator.wakeLock.request('screen'); }
    catch (_) { /* silencieux */ }
  }
};

const releaseWakeLock = async () => {
  if (wakeLock) { await wakeLock.release(); wakeLock = null; }
};

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && timerInterval) requestWakeLock();
});

const cleanup = () => {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (breatheAnimFrame) { cancelAnimationFrame(breatheAnimFrame); breatheAnimFrame = null; }
  releaseWakeLock();
};

const playTone = (freq, vol = 0.2, dur = 0.5) => {
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
  } catch (_) { /* silencieux */ }
};

export const renderScreenD = (container, navigate, data = {}) => {
  cleanup();

  const type = data.type || 'tabac'; // 'tabac' | 'alimentaire'
  const dureeTotal = type === 'tabac' ? 180 : 120;

  let secondsLeft = dureeTotal;
  let phase = 'inspire'; // 'inspire' | 'expire'
  let phaseSeconds = 0;
  const PHASE_DUR = 5; // 5s par phase

  const typeInfo = type === 'tabac'
    ? { emoji: '🫁', titre: 'Résister à la pulsion', couleur: 'var(--color-alert)', instruction: 'Buvez un grand verre d\'eau glacée' }
    : { emoji: '🍫', titre: 'Pulsion alimentaire', couleur: 'var(--color-water)', instruction: 'Tu as faim, ou tu t\'ennuies ?' };

  container.innerHTML = `
    <div class="sos-screen" id="sos-screen">
      <div class="sos-header">
        <button class="sos-back-btn" id="sos-back" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="var(--color-text-secondary)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <span class="sos-type">${typeInfo.emoji} ${typeInfo.titre}</span>
        <div style="width:40px"></div>
      </div>

      <div class="sos-body">
        <div class="sos-timer-ring">
          <svg viewBox="0 0 220 220" class="sos-svg">
            <!-- Cercle respiratoire animé -->
            <circle class="breathe-outer" cx="110" cy="110" r="95"
              fill="none" stroke="${typeInfo.couleur}" stroke-width="1" opacity="0.15"/>
            <circle class="breathe-ring" cx="110" cy="110" r="78"
              fill="none" stroke="${typeInfo.couleur}" stroke-width="3" opacity="0.3"/>
            <!-- Arc de progression timer -->
            <circle class="timer-track" cx="110" cy="110" r="95"
              fill="none" stroke="var(--color-border)" stroke-width="4"/>
            <circle class="timer-arc" id="timer-arc" cx="110" cy="110" r="95"
              fill="none" stroke="${typeInfo.couleur}" stroke-width="4"
              stroke-dasharray="${2 * Math.PI * 95}"
              stroke-dashoffset="${2 * Math.PI * 95}"
              stroke-linecap="round"
              transform="rotate(-90 110 110)"/>
            <!-- Cercle central -->
            <circle cx="110" cy="110" r="60" fill="var(--color-surface)"/>
            <!-- Texte timer -->
            <text id="timer-text" x="110" y="105" text-anchor="middle"
              fill="var(--color-text-primary)" font-family="Cormorant Garamond, serif"
              font-size="36" font-weight="600">${formatTime(dureeTotal)}</text>
            <text id="phase-text" x="110" y="130" text-anchor="middle"
              fill="${typeInfo.couleur}" font-family="Inter, sans-serif"
              font-size="11" letter-spacing="2">INSPIRE</text>
          </svg>
        </div>

        <p class="sos-instruction" id="sos-instruction">${typeInfo.instruction}</p>

        <div class="sos-pause-row">
          <button class="sos-pause-btn" id="sos-pause">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" id="pause-icon">
              <rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
              <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
            </svg>
            Pause
          </button>
        </div>

        ${type === 'alimentaire' ? `
          <div class="sos-hunger-choice" id="hunger-choice" style="display:none;">
            <p class="sos-hunger-q">Tu as faim ou tu t'ennuies ?</p>
            <div class="sos-choice-row">
              <button class="sos-choice-btn" id="btn-faim">🍽 J'ai vraiment faim</button>
              <button class="sos-choice-btn" id="btn-ennui">💭 Je m'ennuie</button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Modal résultat -->
      <div class="sos-result-overlay" id="sos-result" style="display:none;">
        <div class="sos-result-sheet">
          <div class="sos-result-icon" id="result-icon">💪</div>
          <p class="sos-result-title" id="result-title">Tu as résisté</p>
          <p class="sos-result-msg" id="result-msg">C'est une victoire. Chaque pulsion résistée renforce ta résolution.</p>
          <div class="sos-result-btns">
            <button class="btn-primary" id="btn-resiste">✓ Oui, j'ai résisté</button>
            <button class="btn-ghost" id="btn-craque">J'ai craqué</button>
          </div>
        </div>
      </div>
    </div>
  `;

  requestWakeLock();

  const circumference = 2 * Math.PI * 95;
  const timerArc = container.querySelector('#timer-arc');
  const timerText = container.querySelector('#timer-text');
  const phaseTextEl = container.querySelector('#phase-text');

  // Breathing animation via rAF
  let breatheStartTime = null;
  const animateBreathe = (ts) => {
    if (!breatheStartTime) breatheStartTime = ts;
    const elapsed = (ts - breatheStartTime) / 1000;
    const cycle = PHASE_DUR * 2;
    const t = (elapsed % cycle) / cycle;
    const scale = 0.75 + 0.25 * Math.sin(t * Math.PI * 2 - Math.PI / 2) * 0.5 + 0.25;
    const outer = container.querySelector('.breathe-outer');
    const ring = container.querySelector('.breathe-ring');
    if (outer) outer.style.transform = `scale(${scale}) translate(${110 * (1 - scale) / scale}px, ${110 * (1 - scale) / scale}px)`;
    if (ring) ring.style.transform = `scale(${0.85 + 0.15 * Math.sin(t * Math.PI * 2)})`;
    breatheAnimFrame = requestAnimationFrame(animateBreathe);
  };

  // Use CSS animation instead for simplicity and compliance with "opacity + transform only"
  const breatheRing = container.querySelector('.breathe-ring');
  const breatheOuter = container.querySelector('.breathe-outer');
  if (breatheRing) breatheRing.style.animation = 'pulse-ring 10s ease-in-out infinite';
  if (breatheOuter) breatheOuter.style.animation = 'pulse-ring 10s ease-in-out infinite 2s';

  let paused = false;

  timerInterval = setInterval(() => {
    if (paused) return;
    secondsLeft--;
    phaseSeconds++;

    // Phase switch every 5s
    if (phaseSeconds >= PHASE_DUR) {
      phaseSeconds = 0;
      if (phase === 'inspire') {
        phase = 'expire';
        phaseTextEl.textContent = 'EXPIRE';
        playTone(330);
      } else {
        phase = 'inspire';
        phaseTextEl.textContent = 'INSPIRE';
        playTone(440);
      }
    }

    // Update display
    timerText.textContent = formatTime(secondsLeft);
    const progress = (dureeTotal - secondsLeft) / dureeTotal;
    timerArc.style.strokeDashoffset = circumference * (1 - progress);

    // Timer end
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      showResult();
    }
  }, 1000);

  const showResult = () => {
    playTone(523, 0.3, 1.0);
    const overlay = container.querySelector('#sos-result');
    if (overlay) overlay.style.display = 'flex';

    if (type === 'alimentaire') {
      container.querySelector('#result-title').textContent = '3 minutes écoulées';
      container.querySelector('#result-msg').textContent = 'La pulsion s\'est-elle calmée ?';
      container.querySelector('#btn-resiste').textContent = '✓ Oui, ça va mieux';
      container.querySelector('#btn-craque').textContent = 'J\'ai tout de même cédé';
    }
  };

  // Pause button
  const pauseBtn = container.querySelector('#sos-pause');
  const pauseIcon = container.querySelector('#pause-icon');
  pauseBtn?.addEventListener('click', () => {
    paused = !paused;
    if (paused) {
      pauseIcon.innerHTML = `<polygon points="6,4 16,10 16,10 6,16" fill="currentColor"/>`;
      pauseBtn.innerHTML = pauseIcon.outerHTML + ' Reprendre';
    } else {
      pauseBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
        <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
      </svg> Pause`;
    }
  });

  // Back button
  container.querySelector('#sos-back')?.addEventListener('click', () => {
    cleanup();
    navigate('A');
  });

  // Result buttons
  container.querySelector('#btn-resiste')?.addEventListener('click', () => {
    saveLog('pulsion', { sousType: type, resiste: true, duree: dureeTotal });
    cleanup();
    navigate('A', { toast: type === 'tabac' ? '💪 Pulsion résistée — +10 pts' : '✓ Bien joué !' });
  });

  container.querySelector('#btn-craque')?.addEventListener('click', () => {
    showCraqueForm(container, navigate, type);
  });

  // Hunger choice (alimentaire only)
  container.querySelector('#btn-faim')?.addEventListener('click', () => {
    container.querySelector('#hunger-choice').style.display = 'none';
    container.querySelector('#sos-instruction').textContent = 'Mange une collation protéinée — œufs, fromage blanc, jambon';
    cleanup();
    setTimeout(() => navigate('A'), 3000);
  });

  container.querySelector('#btn-ennui')?.addEventListener('click', () => {
    container.querySelector('#hunger-choice').style.display = 'none';
    container.querySelector('#sos-instruction').textContent = 'Prends 5 min de marche — ou prolonge la respiration';
  });
};

const showCraqueForm = (container, navigate, type) => {
  const overlay = container.querySelector('#sos-result');
  if (!overlay) return;

  overlay.querySelector('.sos-result-sheet').innerHTML = `
    <p class="sos-result-title" style="color:var(--color-text-secondary)">Pas de jugement.</p>
    <p class="sos-result-msg">Déclarer honnêtement, c'est déjà une victoire — ça compte dans ton score.</p>
    <div style="display:flex;flex-direction:column;gap:var(--space-sm);width:100%;margin-top:var(--space-md);">
      ${type === 'tabac' ? `
        <button class="btn-ghost" id="craque-cig">🚬 Une cigarette</button>
        <button class="btn-ghost" id="craque-autre">Autre</button>
      ` : `
        <button class="btn-ghost" id="craque-petit">Petit écart — ça reste raisonnable</button>
        <button class="btn-ghost" id="craque-gros">Gros craquage — j'assume</button>
      `}
      <button class="btn-ghost" style="color:var(--color-text-secondary);font-size:var(--font-size-sm)" id="craque-annuler">Annuler</button>
    </div>
  `;

  const logAndLeave = (label) => {
    saveLog('pulsion', { sousType: type, resiste: false, detail: label });
    cleanup();
    navigate('A', { toast: '✓ Déclaré honnêtement — +3 pts' });
  };

  overlay.querySelector('#craque-cig')?.addEventListener('click', () => logAndLeave('cigarette'));
  overlay.querySelector('#craque-autre')?.addEventListener('click', () => logAndLeave('autre'));
  overlay.querySelector('#craque-petit')?.addEventListener('click', () => {
    saveLog('ecart_petit', { note: 'pulsion alimentaire' });
    cleanup();
    navigate('A', { toast: '✓ Déclaré — +8 pts honnêteté' });
  });
  overlay.querySelector('#craque-gros')?.addEventListener('click', () => {
    saveLog('ecart_gros', { note: 'pulsion alimentaire' });
    cleanup();
    navigate('A', { toast: '✓ Déclaré — +3 pts honnêteté' });
  });
  overlay.querySelector('#craque-annuler')?.addEventListener('click', () => {
    cleanup();
    navigate('A');
  });
};

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export const cleanupScreenD = cleanup;
