---
name: project-equilibre-pwa
description: Contexte du projet PWA Équilibre Personnel — nutrition, tabac, sport, score global
metadata:
  type: project
---

PWA mobile-first personnelle générée en V1 complète. Stack : Vanilla JS + Vite, 100% localStorage, SVG natif.

**Why:** Usage personnel exclusif — homme 45 ans, 120 kg, 1,87 m, sevrage tabac, sport débutant.

**How to apply:** Respecter l'architecture modulaire screens/services/data. Toujours pointer vers Supabase avec `// TODO` quand on touche au storage. Philosophie : aucun jugement, régularité prime performance, pédagogie progressive.

Fichiers clés :
- [screenA.js](src/screens/screenA.js) — Dashboard complet avec jauge SVG, macros, modals repas/sport/mesure
- [screenD.js](src/screens/screenD.js) — SOS Respirateur, Wake Lock, timer
- [score.js](src/services/score.js) — Score sur 100, 7 jours glissants, 3 dimensions
- [aliments.js](src/data/aliments.js) — 150+ aliments FR avec labels pédagogiques
