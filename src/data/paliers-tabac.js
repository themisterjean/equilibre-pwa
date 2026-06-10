// paliers-tabac.js — Messages de félicitation aux paliers du sevrage

export const paliersTabac = [
  {
    jours: 1,
    titre: '24 heures',
    message: 'Ta première journée. Le taux de monoxyde de carbone dans ton sang a déjà chuté.',
    couleur: 'success',
  },
  {
    jours: 3,
    titre: '3 jours',
    message: 'La nicotine a quitté ton corps. Ce que tu ressens maintenant, c\'est la guérison.',
    couleur: 'success',
  },
  {
    jours: 7,
    titre: '1 semaine',
    message: 'Ton corps commence à récupérer le goût et l\'odorat. Continue.',
    couleur: 'success',
  },
  {
    jours: 14,
    titre: '2 semaines',
    message: 'Ta circulation sanguine s\'améliore. Tes poumons travaillent mieux.',
    couleur: 'success',
  },
  {
    jours: 21,
    titre: '3 semaines',
    message: 'Les pulsions s\'espacent. Le pire est derrière toi.',
    couleur: 'success',
  },
  {
    jours: 30,
    titre: '1 mois',
    message: 'Un mois. Tes poumons ont déjà commencé à se régénérer. C\'est une victoire majeure.',
    couleur: 'success',
  },
  {
    jours: 60,
    titre: '2 mois',
    message: 'Deux mois sans tabac. Ton souffle s\'améliore semaine après semaine.',
    couleur: 'success',
  },
  {
    jours: 90,
    titre: '3 mois',
    message: 'Trois mois. Le risque cardiovasculaire a déjà chuté de 50%. Tu t\'es offert des années.',
    couleur: 'success',
  },
  {
    jours: 180,
    titre: '6 mois',
    message: 'Six mois. Ton corps a réparé la plupart des dommages causés à tes cils bronchiques.',
    couleur: 'success',
  },
  {
    jours: 365,
    titre: '1 an',
    message: 'Un an sans tabac. Le risque d\'infarctus a diminué de moitié. Tu as changé ta vie.',
    couleur: 'success',
  },
];

export const getPalierActuel = (joursArret) => {
  const paliersPasses = paliersTabac.filter(p => p.jours <= joursArret);
  return paliersPasses.length ? paliersPasses[paliersPasses.length - 1] : null;
};

export const getProchainPalier = (joursArret) => {
  return paliersTabac.find(p => p.jours > joursArret) || null;
};

export const calcJoursSansTabac = (dateArret) => {
  if (!dateArret) return 0;
  const arret = new Date(dateArret);
  const now = new Date();
  arret.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((now - arret) / (24 * 60 * 60 * 1000)));
};
