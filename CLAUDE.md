# CLAUDE.md

## Projet

PWA personnelle : nutrition + sevrage tabagique + sport.

Usage exclusif d'un seul utilisateur. V1 100% localStorage.

## Stack

- Vanilla JS ES6+ + Vite
- Zéro framework, zéro dépendance NPM sauf Vite
- PWA : manifest.json + Service Worker Cache-First
- Graphiques : SVG natif, zéro librairie externe

## Commandes

- `npm run dev` → serveur local
- `npm run build` → build production
- `npm run preview` → prévisualisation build

## Architecture

- /src/services/ → storage.js, zepp.js, score.js, metabolism.js
- /src/screens/ → screenA.js (Dashboard) · screenB.js (Journal) · screenC.js (Analyse) · screenD.js (SOS)
- /src/data/ → aliments.js (200 aliments FR), circuits.js, paliers-tabac.js
- /src/styles/ → tokens.css, global.css, components.css

## État actuel

- [x] V1 générée — tous les fichiers présents

## Règles de style

- Tokens CSS uniquement — aucune couleur hardcodée
- Touch targets 48px minimum
- Safe area iOS respectée
- Mode nuit automatique 22h-7h

## Notes importantes

- Les icônes PNG (icon-192.png, icon-512.png) dans /public/icons/ doivent être générées manuellement
  depuis icon.svg (ex: avec Inkscape, ImageMagick, ou un service en ligne)
- Le manifest.json pointe vers /icons/icon-192.png et /icons/icon-512.png
- Zepp OAuth 2.0 : chercher `// TODO: Remplacer par Supabase` et `// TODO: Implémenter OAuth 2.0`
