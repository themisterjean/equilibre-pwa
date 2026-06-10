// zepp.js — TODO: Remplacer par OAuth 2.0 Zepp Open Platform

let isSyncing = false; // Prévenir les requêtes en boucle

export const syncZepp = async () => {
  if (isSyncing) return null;
  isSyncing = true;

  try {
    // TODO: Implémenter OAuth 2.0 Zepp
    // Endpoint cible : https://open-api.zepp.com/...
    await new Promise(r => setTimeout(r, 800)); // Simulate latency

    const mockData = {
      pas: 6240,
      calories_passives: 387,
      sessions: [
        { type: 'marche', debut: '07:15', fin: '08:05', calories: 601, pas: 5820 }
      ]
    };

    // TODO: saveLog('zepp_sync', mockData);
    return mockData;
  } finally {
    isSyncing = false;
  }
};

export const isZeppAvailable = () => false; // TODO: return true after OAuth implemented
