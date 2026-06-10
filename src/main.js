// main.js — Point d'entrée de la PWA Équilibre

import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';

import { getProfile, saveProfile, getFirstLaunchDate, setSetting } from './services/storage.js';
import { calcAll } from './services/metabolism.js';
import { renderScreenA } from './screens/screenA.js';
import { renderScreenB } from './screens/screenB.js';
import { renderScreenC } from './screens/screenC.js';
import { renderScreenD, cleanupScreenD } from './screens/screenD.js';

// ─── Night Mode ───────────────────────────────────────────────────────────────

const checkNightMode = () => {
  const h = new Date().getHours();
  document.body.classList.toggle('night-mode', h >= 22 || h < 7);
};

checkNightMode();
setInterval(checkNightMode, 60 * 60 * 1000); // Vérifie toutes les heures

// ─── Service Worker ───────────────────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ─── État de navigation ───────────────────────────────────────────────────────

let currentScreen = 'A';
const app = document.getElementById('app');

const navigate = (screen, data = {}) => {
  if (currentScreen === 'D') cleanupScreenD();
  currentScreen = screen;
  render(data);
};

// ─── Navigation Bar ───────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'A', label: 'Accueil', icon: iconHome },
  { id: 'B', label: 'Journal', icon: iconBook },
  { id: 'C', label: 'Analyse', icon: iconChart },
  { id: 'D', label: 'SOS', icon: iconSOS },
];

function renderNavBar() {
  const nav = document.createElement('nav');
  nav.className = 'nav-bar';
  nav.setAttribute('role', 'navigation');
  nav.innerHTML = NAV_ITEMS.map(item => `
    <button class="nav-item ${currentScreen === item.id ? 'active' : ''}" data-screen="${item.id}" aria-label="${item.label}">
      ${item.icon()}
      <span>${item.label}</span>
    </button>
  `).join('');

  nav.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      if (screen === 'D') {
        navigate('D', { type: 'tabac' });
      } else {
        navigate(screen);
      }
    });
  });
  return nav;
}

// ─── Render ───────────────────────────────────────────────────────────────────

const render = (data = {}) => {
  const profile = getProfile();

  // First launch onboarding
  if (!profile) {
    renderOnboarding();
    return;
  }

  // Initialize first launch date
  getFirstLaunchDate();

  app.innerHTML = '';

  if (currentScreen === 'D') {
    // Full-screen SOS overlay — no nav bar
    const screenEl = document.createElement('div');
    screenEl.className = 'screen';
    app.appendChild(screenEl);
    renderScreenD(screenEl, navigate, data);
    return;
  }

  const screenEl = document.createElement('div');
  screenEl.className = 'screen animate-in';
  app.appendChild(screenEl);
  app.appendChild(renderNavBar());

  switch (currentScreen) {
    case 'A': renderScreenA(screenEl, navigate, data); break;
    case 'B': renderScreenB(screenEl, navigate, data); break;
    case 'C': renderScreenC(screenEl, navigate, data); break;
  }
};

// ─── Onboarding ───────────────────────────────────────────────────────────────

const renderOnboarding = () => {
  let step = 0;
  const profile = {};

  const steps = [
    {
      key: 'dateArret',
      title: 'Ta date d\'arrêt du tabac',
      subtitle: 'Si tu as arrêté aujourd\'hui, utilise le bouton ci-dessous.',
      content: () => `
        <input type="date" id="ob-date" max="${new Date().toISOString().slice(0,10)}" value="${new Date().toISOString().slice(0,10)}" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center"/>
        <button class="btn-ghost" id="btn-today" style="margin-top:var(--space-sm)">Aujourd'hui</button>
      `,
      getValue: () => document.querySelector('#ob-date').value,
    },
    {
      key: 'poids',
      title: 'Ton poids actuel',
      subtitle: '',
      content: () => `
        <select id="ob-poids" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center">
          ${Array.from({length:181},(_,i)=>{const v=(60+i*0.5).toFixed(1);return `<option value="${v}" ${v==='120.0'?'selected':''}>${v} kg</option>`;}).join('')}
        </select>
      `,
      getValue: () => parseFloat(document.querySelector('#ob-poids').value),
    },
    {
      key: 'taille',
      title: 'Ta taille',
      subtitle: '',
      content: () => `
        <select id="ob-taille" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center">
          ${Array.from({length:61},(_,i)=>{const v=150+i;return `<option value="${v}" ${v===187?'selected':''}>${v} cm</option>`;}).join('')}
        </select>
      `,
      getValue: () => parseInt(document.querySelector('#ob-taille').value),
    },
    {
      key: 'age',
      title: 'Ton âge',
      subtitle: '',
      content: () => `
        <select id="ob-age" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center">
          ${Array.from({length:61},(_,i)=>{const v=20+i;return `<option value="${v}" ${v===45?'selected':''}>${v} ans</option>`;}).join('')}
        </select>
      `,
      getValue: () => parseInt(document.querySelector('#ob-age').value),
    },
    {
      key: 'modeAlimentation',
      title: 'Ta liberté alimentaire',
      subtitle: 'Comment veux-tu gérer tes repas libres ?',
      content: () => `
        <div class="mode-choices">
          <button class="mode-choice" data-mode="journee">
            <strong>Journée Libre</strong>
            <p>1 jour entier libre par semaine — calcul suspendu</p>
          </button>
          <button class="mode-choice active" data-mode="repas">
            <strong>Repas Libres ✓ Recommandé</strong>
            <p>2 repas libres par semaine — les autres restent suivis</p>
          </button>
        </div>
      `,
      getValue: () => {
        const active = document.querySelector('.mode-choice.active');
        return active ? active.dataset.mode : 'repas';
      },
    },
  ];

  const renderStep = () => {
    const s = steps[step];
    const isLast = step === steps.length - 1;
    const progressPct = ((step + 1) / steps.length) * 100;

    app.innerHTML = `
      <div class="onboarding-screen">
        <div class="ob-progress">
          <div class="ob-progress-fill" style="width:${progressPct}%"></div>
        </div>
        <div class="ob-content">
          <p class="ob-step">Étape ${step + 1} / ${steps.length}</p>
          <h1 class="ob-title">${s.title}</h1>
          ${s.subtitle ? `<p class="ob-sub">${s.subtitle}</p>` : ''}
          <div class="ob-input-area">
            ${s.content()}
          </div>
          <button class="btn-primary ob-next" id="ob-next">${isLast ? 'Commencer' : 'Suivant →'}</button>
        </div>
      </div>
    `;

    // "Aujourd'hui" shortcut for date
    app.querySelector('#btn-today')?.addEventListener('click', () => {
      const input = app.querySelector('#ob-date');
      if (input) input.value = new Date().toISOString().slice(0, 10);
    });

    // Mode choice selection
    app.querySelectorAll('.mode-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        app.querySelectorAll('.mode-choice').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    app.querySelector('#ob-next')?.addEventListener('click', () => {
      const value = s.getValue();
      profile[s.key] = value;

      if (step === steps.length - 1) {
        // Finalize profile
        profile.sexe = 'homme';
        profile.poidsObjectif = 100;
        profile.poids = parseFloat(profile.poids) || 120;
        profile.taille = parseFloat(profile.taille) || 187;
        profile.age = parseInt(profile.age) || 45;

        {
          const { budget } = calcAll(profile);
          saveProfile(profile);
          setSetting('modeAlimentation', profile.modeAlimentation || 'repas');

          // Show summary
          app.innerHTML = `
            <div class="onboarding-screen">
              <div class="ob-content" style="text-align:center">
                <p style="font-size:3rem;margin-bottom:var(--space-lg)">✓</p>
                <h1 class="ob-title">Tout est prêt.</h1>
                <p class="ob-sub" style="color:var(--color-text-secondary)">Ton budget quotidien :</p>
                <p style="font-family:var(--font-serif);font-size:var(--font-size-2xl);color:var(--color-success);margin:var(--space-md) 0">${budget} kcal</p>
                <p class="ob-sub" style="color:var(--color-text-secondary)">Jour ${Math.floor((new Date() - new Date(profile.dateArret)) / 86400000)} sans tabac. On commence.</p>
                <button class="btn-primary" id="ob-start" style="margin-top:var(--space-xl)">Accéder au dashboard →</button>
              </div>
            </div>
          `;
          app.querySelector('#ob-start')?.addEventListener('click', () => render());
        }
      } else {
        step++;
        renderStep();
      }
    });
  };

  renderStep();
};

// ─── Démarrage ────────────────────────────────────────────────────────────────

render();

// ─── Icônes SVG inline ────────────────────────────────────────────────────────

function iconHome() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>`;
}

function iconBook() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4h7a2 2 0 012 2v13H4V4z"/>
    <path d="M20 4h-7a2 2 0 00-2 2v13h9V4z"/>
  </svg>`;
}

function iconChart() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 20h18M7 20V10m5 10V4m5 16v-7"/>
  </svg>`;
}

function iconSOS() {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v6M12 16.5v.5"/>
  </svg>`;
}
