// metabolism.js — Moteur de calcul calorique

export const defaultProfile = {
  poids: 120,
  taille: 187,
  age: 45,
  sexe: 'homme',
  poidsObjectif: 100,
};

// Formule Black et al. (adaptée fortes masses)
export const calcMetabolismeBase = (profil) => {
  const { poids, taille, age } = profil;
  return Math.round(
    0.963 * Math.pow(poids, 0.48) * Math.pow(taille / 100, 0.50) * Math.pow(age, -0.13) * 1000
  );
  // Résultat attendu profil par défaut : ~2 050 kcal
};

// Dépense Énergétique Totale
// Sédentaire bureau + marche matinale = coefficient 1.375
export const calcDET = (mb) => Math.round(mb * 1.375);
// Résultat attendu : ~2 820 kcal

// Budget calorique cible (déficit 500 kcal)
export const calcBudget = (det) => det - 500;
// Résultat attendu : ~2 320 kcal

// Macros cibles
export const calcMacros = (profil, budget) => {
  const proteines = Math.round(profil.poids * 1.5);      // 180g → 720 kcal
  const lipides = Math.round(profil.poidsObjectif * 1);  // 100g → 900 kcal
  const kcalRestantes = budget - (proteines * 4) - (lipides * 9);
  const glucides = Math.round(Math.max(kcalRestantes, 0) / 4); // ~175g → 700 kcal
  return { proteines, lipides, glucides };
};

// Calcul complet depuis le profil
export const calcAll = (profil) => {
  const mb = calcMetabolismeBase(profil);
  const det = calcDET(mb);
  const budget = calcBudget(det);
  const macros = calcMacros(profil, budget);
  return { mb, det, budget, macros };
};

// Labels pédagogiques — s'affichent progressivement selon les semaines d'usage
export const macroPedagogie = {
  proteines: {
    nom: 'Protéines',
    semaine1: 'Ton carburant muscle',
    semaine3: 'Rassasient durablement — réduisent les pulsions',
    semaine8: 'Protéines : viandes, œufs, légumineuses, fromage blanc',
  },
  lipides: {
    nom: 'Lipides',
    semaine1: 'Les bonnes graisses',
    semaine3: 'Essentielles pour les hormones et l\'énergie',
    semaine8: 'Lipides : huile d\'olive, avocats, noix, poissons gras',
  },
  glucides: {
    nom: 'Glucides',
    semaine1: 'Ton énergie quotidienne',
    semaine3: 'Préfère les glucides lents : riz, patate douce, légumes',
    semaine8: 'Glucides lents = énergie stable. Glucides rapides = pic puis chute',
  },
};

export const getMacroLabel = (macro, weeks) => {
  const p = macroPedagogie[macro];
  if (!p) return '';
  if (weeks >= 8) return p.semaine8;
  if (weeks >= 3) return p.semaine3;
  return p.semaine1;
};

// Estimation calories séance sport
export const estimCaloriesSport = (type, dureeMin, poids = 120) => {
  const MET = { marche: 3.5, kb_complet: 6.0, kb_allege: 4.5, corde_complete: 10.0, corde_allegee: 8.0, vacances_a: 5.5, vacances_b: 7.0, vacances_c: 3.5 };
  const met = MET[type] || 4.0;
  return Math.round((met * poids * 3.5 / 200) * dureeMin);
};
