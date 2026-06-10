// circuits.js — Circuits KB, corde à sauter, et mode vacances

// ─── Circuits Kettlebell ───────────────────────────────────────────────────

export const circuitsKB = {
  circuit1: {
    id: 'circuit1',
    nom: 'Circuit Fondation',
    periode: 'Semaines 1-4',
    objectif: 'Apprendre les mouvements, ne pas se blesser',
    ressenti: 'Essoufflé mais capable de parler',
    tours: 3,
    dureeEstimee: 18,
    typeActivite: 'kb_complet',
    repos: 90,
    exercices: [
      { id: 'deadlift',    nom: 'Deadlift',      kb: '18 kg', reps: 10, consigne: 'Tiré du sol, dos droit — poussez dans les talons' },
      { id: 'goblet_squat', nom: 'Goblet Squat', kb: '12 kg', reps: 8,  consigne: 'KB tenu devant la poitrine, descente profonde' },
      { id: 'swing',       nom: 'Swing',         kb: '12 kg', reps: 10, consigne: 'Balancé hanches, pas les bras — explosif' },
    ],
  },
  circuit2: {
    id: 'circuit2',
    nom: 'Circuit Construction',
    periode: 'Semaines 5-8',
    objectif: 'Construire la force et l\'endurance',
    ressenti: 'Essoufflé, mais récupère vite',
    tours: 4,
    dureeEstimee: 24,
    typeActivite: 'kb_complet',
    repos: 75,
    exercices: [
      { id: 'swing',      nom: 'Swing',              kb: '18 kg', reps: 12, consigne: 'Hanches explosives — serrer les fessiers en haut' },
      { id: 'goblet',     nom: 'Goblet Squat',        kb: '18 kg', reps: 10, consigne: 'Coudes contre les genoux en descente' },
      { id: 'rdl',        nom: 'Romanian Deadlift',   kb: '18 kg', reps: 10, consigne: 'Hanches en arrière, dos plat — chercher l\'étirement' },
      { id: 'halo',       nom: 'Halo',                kb: '12 kg', reps: 8,  consigne: 'Cercle autour de la tête — contrôle total' },
    ],
  },
  circuit3: {
    id: 'circuit3',
    nom: 'Circuit Intensité',
    periode: 'Mois 3+',
    objectif: 'Performance et brûlure graisseuse',
    ressenti: 'Intensité élevée — tu mérites le repos',
    tours: 4,
    dureeEstimee: 28,
    typeActivite: 'kb_complet',
    repos: 60,
    exercices: [
      { id: 'swing',          nom: 'Swing',               kb: '18 kg', reps: 15,     consigne: 'Explosion maximale — tête neutre' },
      { id: 'clean_press',    nom: 'Clean & Press',        kb: '12 kg', reps: '8/côté', consigne: 'Coude à l\'épaule en catch — presse strict' },
      { id: 'goblet_heavy',   nom: 'Goblet Squat lourd',   kb: '18 kg', reps: 12,     consigne: 'Pause 2s en bas — talon dans le sol' },
      { id: 'renegade_row',   nom: 'Renegade Row',          kb: '12 kg', reps: '6/côté', consigne: 'Corps gaîné — éviter la rotation' },
    ],
  },
};

// ─── Version allégée (forme moyenne) ─────────────────────────────────────

export const circuitAllegue = (base) => ({
  ...base,
  nom: base.nom + ' (allégé)',
  tours: Math.max(base.tours - 1, 2),
  repos: base.repos + 30,
  typeActivite: 'kb_allege',
  dureeEstimee: Math.round(base.dureeEstimee * 0.75),
});

export const circuitMinimal = (base) => ({
  ...base,
  nom: base.nom + ' (2 tours)',
  tours: 2,
  repos: base.repos + 45,
  typeActivite: 'kb_allege',
  dureeEstimee: Math.round(base.dureeEstimee * 0.55),
  messageMotivation: '2 tours comptent. Zéro ne compte pas.',
});

// ─── Protocoles Corde à Sauter ────────────────────────────────────────────

export const protocolesCorde = {
  debutant: {
    id: 'debutant',
    nom: 'Débutant',
    periode: 'Semaines 1-4',
    rounds: 10,
    travail: 30,
    repos: 30,
    dureeEstimee: 10,
    typeActivite: 'corde_complete',
    toursEstimes: '150-200',
  },
  intermediaire: {
    id: 'intermediaire',
    nom: 'Intermédiaire',
    periode: 'Semaines 5-8',
    rounds: 12,
    travail: 45,
    repos: 30,
    dureeEstimee: 18,
    typeActivite: 'corde_complete',
    toursEstimes: '400-500',
  },
  avance: {
    id: 'avance',
    nom: 'Avancé',
    periode: 'Mois 3+',
    rounds: 15,
    travail: 60,
    repos: 20,
    dureeEstimee: 20,
    typeActivite: 'corde_complete',
    toursEstimes: '700-900',
  },
};

export const getProtocoleCorde = (weeks) => {
  if (weeks >= 12) return protocolesCorde.avance;
  if (weeks >= 5) return protocolesCorde.intermediaire;
  return protocolesCorde.debutant;
};

export const getCircuitKB = (weeks) => {
  if (weeks >= 12) return circuitsKB.circuit3;
  if (weeks >= 5) return circuitsKB.circuit2;
  return circuitsKB.circuit1;
};

// ─── Exercices Mode Vacances ──────────────────────────────────────────────

export const exercicesVacances = [
  {
    id: 'chaise_murale',
    nom: 'Chaise murale',
    type: 'isometrique',
    cible: 'Quadriceps, fessiers, ischio-jambiers',
    consigne: 'Dos à plat contre le mur, cuisses parallèles au sol. Poussez dans les talons.',
    objectif: { series: 3, duree: [20, 60], unite: 'secondes' },
  },
  {
    id: 'planche_dead_stop',
    nom: 'Planche dead stop',
    type: 'isometrique',
    cible: 'Abdos profonds, gainage global',
    consigne: 'Avant-bras au sol, coudes sous les épaules. Contractez les abdos et serrez les fessiers. Tirez les omoplates vers le bas.',
    variante: 'Avancé : décoller un pied de 5 cm',
    objectif: { series: 3, duree: [30, 60], unite: 'secondes' },
  },
  {
    id: 'superman_hold',
    nom: 'Superman hold',
    type: 'isometrique',
    cible: 'Lombaires, érecteurs du rachis, fessiers',
    consigne: 'Sur le ventre, bras tendus devant. Décoller bras, poitrine et cuisses. Chercher la tension, pas la hauteur.',
    objectif: { series: 3, duree: [20, 30], unite: 'secondes' },
  },
  {
    id: 'pompe_mi_course',
    nom: 'Pompe mi-course hold',
    type: 'isometrique',
    cible: 'Pectoraux, triceps, épaules',
    consigne: 'Descendre à mi-chemin, coudes à 90°, tenir sans élan. Position la plus difficile du mouvement.',
    objectif: { series: 4, duree: [15, 30], unite: 'secondes' },
  },
  {
    id: 'pike_push_up',
    nom: 'Pike push-up',
    type: 'dynamique',
    cible: 'Épaules, haut du dos, triceps',
    consigne: 'En V inversé, fesses en l\'air. Descendre la tête vers le sol en pliant les coudes.',
    objectif: { series: 3, reps: [8, 12], unite: 'reps' },
  },
  {
    id: 'bulgarian_split',
    nom: 'Bulgarian split squat',
    type: 'dynamique',
    cible: 'Quadriceps, fessiers, équilibre',
    consigne: 'Un pied posé derrière sur chaise ou lit, l\'autre devant. Descendre en fente lentement.',
    objectif: { series: 3, reps: [8, 8], unite: 'reps/jambe' },
  },
  {
    id: 'calf_raises',
    nom: 'Calf raises isométriques',
    type: 'dynamique',
    cible: 'Mollets',
    consigne: 'Monter sur la pointe des pieds, tenir 3 secondes, redescendre lentement. Sur une marche si possible.',
    objectif: { series: 3, reps: [15, 15], unite: 'reps' },
  },
  {
    id: 'mountain_climbers',
    nom: 'Mountain climbers lents',
    type: 'dynamique',
    cible: 'Gainage dynamique, cardio modéré',
    consigne: 'Position pompe. Ramener un genou vers la poitrine en 3 secondes, revenir, alterner. Contrôle, pas vitesse.',
    objectif: { series: 3, reps: [10, 10], unite: 'reps/côté' },
  },
  {
    id: 'hip_flexor',
    nom: 'Hip flexor stretch',
    type: 'mobilite',
    cible: 'Fléchisseurs de hanche, bas du dos',
    consigne: 'En fente basse, pousser le bassin vers l\'avant et tenir. Contrebalance la position assise en voyage.',
    objectif: { series: 2, duree: [30, 30], unite: 'secondes/côté' },
  },
];

// ─── Circuits Vacances ────────────────────────────────────────────────────

export const circuitsVacances = {
  circuitA: {
    id: 'vacances_a',
    nom: 'Force — Sans matériel',
    dureeEstimee: 20,
    tours: 3,
    repos: 90,
    typeActivite: 'vacances_a',
    pointsScore: 22,
    exercices: ['chaise_murale', 'bulgarian_split', 'planche_dead_stop', 'pike_push_up', 'superman_hold', 'pompe_mi_course', 'mountain_climbers'],
    messageMotivation: 'Équivalent circuit KB — ton score est identique.',
  },
  circuitB: {
    id: 'vacances_b',
    nom: 'Cardio + Gainage',
    dureeEstimee: 15,
    typeActivite: 'vacances_b',
    pointsScore: 18,
    description: 'Corde 30s/Repos 30s × 5 rounds — Planche 45s — Corde 30s/Repos 30s × 5 rounds — Planche 45s',
    messageMotivation: 'Cardio efficace, même en déplacement.',
  },
  circuitC: {
    id: 'vacances_c',
    nom: 'Récupération active',
    dureeEstimee: 10,
    typeActivite: 'vacances_c',
    pointsScore: 12,
    exercices: ['superman_hold', 'hip_flexor', 'calf_raises'],
    messageMotivation: '10 minutes comptent. Zéro ne compte pas.',
  },
};

export const getCircuitVacances = (forme) => {
  if (forme === 'fatigue') return circuitsVacances.circuitC;
  if (forme === 'moyen') return { ...circuitsVacances.circuitA, tours: 2, typeActivite: 'vacances_a_allege', pointsScore: 14, nom: 'Force allégé (2 tours)' };
  return circuitsVacances.circuitA;
};

export const getExerciceById = (id) => exercicesVacances.find(e => e.id === id);
