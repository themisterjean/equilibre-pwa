// aliments.js — Base 200 aliments courants FR
// Valeurs nutritionnelles pour 100g

export const aliments = [
  // ─── Protéines animales ───────────────────────────────────────────────
  { id: 'oeuf',           nom: 'Œuf entier',              kcal: 155, prot: 13, lip: 11, gluc: 1,  label: 'Excellent pour les protéines — peu de sucres',       categorie: 'proteines' },
  { id: 'poulet_blanc',   nom: 'Blanc de poulet',          kcal: 110, prot: 23, lip: 2,  gluc: 0,  label: 'La meilleure source de protéines maigres',           categorie: 'proteines' },
  { id: 'cuisse_poulet',  nom: 'Cuisse de poulet',         kcal: 150, prot: 18, lip: 8,  gluc: 0,  label: 'Protéines + graisses utiles — rassasiant',           categorie: 'proteines' },
  { id: 'boeuf_maigre',   nom: 'Bœuf maigre (5% MG)',      kcal: 135, prot: 22, lip: 5,  gluc: 0,  label: 'Protéines de qualité + fer — idéal après la séance', categorie: 'proteines' },
  { id: 'steak_hache',    nom: 'Steak haché 15% MG',       kcal: 200, prot: 18, lip: 14, gluc: 0,  label: 'Pratique — préférer la version 5% si disponible',    categorie: 'proteines' },
  { id: 'dinde',          nom: 'Filet de dinde',            kcal: 107, prot: 24, lip: 1,  gluc: 0,  label: 'Encore plus maigre que le poulet — idéal au quotidien', categorie: 'proteines' },
  { id: 'jambon_blanc',   nom: 'Jambon blanc',              kcal: 110, prot: 19, lip: 3,  gluc: 1,  label: 'Protéine rapide pratique — surveiller le sel',       categorie: 'proteines' },
  { id: 'thon_boite',     nom: 'Thon en boîte (eau)',       kcal: 130, prot: 28, lip: 2,  gluc: 0,  label: 'Roi des protéines pratiques — toujours en stock',    categorie: 'proteines' },
  { id: 'saumon_frais',   nom: 'Saumon frais',              kcal: 208, prot: 20, lip: 13, gluc: 0,  label: 'Oméga-3 + protéines — excellent 2x/semaine',         categorie: 'proteines' },
  { id: 'saumon_fume',    nom: 'Saumon fumé',               kcal: 175, prot: 21, lip: 9,  gluc: 0,  label: 'Protéines nobles — surveiller le sel',               categorie: 'proteines' },
  { id: 'sardines',       nom: 'Sardines en boîte',         kcal: 190, prot: 21, lip: 11, gluc: 0,  label: 'Oméga-3 + calcium — l\'un des meilleurs aliments',   categorie: 'proteines' },
  { id: 'crevettes',      nom: 'Crevettes cuites',          kcal: 90,  prot: 19, lip: 1,  gluc: 0,  label: 'Très maigres et rassasiantes — parfaites en entrée', categorie: 'proteines' },
  { id: 'cabillaud',      nom: 'Cabillaud',                 kcal: 80,  prot: 18, lip: 1,  gluc: 0,  label: 'Poisson blanc ultra-maigre — peu de calories',       categorie: 'proteines' },
  { id: 'maquereau',      nom: 'Maquereau',                 kcal: 200, prot: 19, lip: 13, gluc: 0,  label: 'Riche en oméga-3 — excellent pour le cœur',          categorie: 'proteines' },
  { id: 'veau',           nom: 'Escalope de veau',          kcal: 125, prot: 24, lip: 3,  gluc: 0,  label: 'Protéines tendres et maigres — riche en zinc',       categorie: 'proteines' },
  { id: 'roti_porc',      nom: 'Rôti de porc maigre',       kcal: 165, prot: 28, lip: 6,  gluc: 0,  label: 'Viande maigre polyvalente — rica en vitamines B',    categorie: 'proteines' },
  { id: 'coquilles_sjj',  nom: 'Coquilles Saint-Jacques',   kcal: 86,  prot: 15, lip: 1,  gluc: 3,  label: 'Très faibles en graisses + protéines de qualité',    categorie: 'proteines' },
  { id: 'moules',         nom: 'Moules cuites',              kcal: 86,  prot: 12, lip: 2,  gluc: 4,  label: 'Protéines + fer + zinc — peu caloriques',            categorie: 'proteines' },
  { id: 'bar',            nom: 'Bar (loup)',                  kcal: 99,  prot: 18, lip: 3,  gluc: 0,  label: 'Poisson noble et maigre — idéal au dîner',           categorie: 'proteines' },
  { id: 'truite_fumee',   nom: 'Truite fumée',               kcal: 193, prot: 21, lip: 12, gluc: 0,  label: 'Alternative gourmande au saumon fumé',               categorie: 'proteines' },

  // ─── Protéines végétales ──────────────────────────────────────────────
  { id: 'lentilles',      nom: 'Lentilles cuites',           kcal: 116, prot: 9,  lip: 0,  gluc: 20, label: 'Protéines végétales + fibres — très rassasiant',     categorie: 'proteines' },
  { id: 'pois_chiches',   nom: 'Pois chiches cuits',         kcal: 164, prot: 9,  lip: 3,  gluc: 27, label: 'Légumineuse reine — hummus, salades, curry',          categorie: 'proteines' },
  { id: 'haricots_rouges',nom: 'Haricots rouges cuits',      kcal: 127, prot: 9,  lip: 0,  gluc: 23, label: 'Fibres + protéines — énergie longue durée',           categorie: 'proteines' },
  { id: 'tofu',           nom: 'Tofu nature',                 kcal: 76,  prot: 8,  lip: 4,  gluc: 2,  label: 'Protéine végétale complète — absorbe toutes les saveurs', categorie: 'proteines' },
  { id: 'edamame',        nom: 'Edamame',                    kcal: 122, prot: 11, lip: 5,  gluc: 10, label: 'Soja frais — snack protéiné parfait',                 categorie: 'proteines' },
  { id: 'pvt',            nom: 'Protéines végétales texturées', kcal: 340, prot: 50, lip: 4, gluc: 30, label: 'Substitut viande économique — haute protéine',      categorie: 'proteines' },
  { id: 'haricots_blancs',nom: 'Haricots blancs cuits',      kcal: 132, prot: 9,  lip: 0,  gluc: 24, label: 'Fibres solubles — réduisent l\'absorption du sucre',  categorie: 'proteines' },

  // ─── Produits laitiers ────────────────────────────────────────────────
  { id: 'fromage_blanc_0',nom: 'Fromage blanc 0%',           kcal: 45,  prot: 8,  lip: 0,  gluc: 4,  label: 'Protéines rapides post-séance — idéal le soir',      categorie: 'produits_laitiers' },
  { id: 'yaourt_0',       nom: 'Yaourt nature 0%',           kcal: 48,  prot: 5,  lip: 0,  gluc: 7,  label: 'Probiotiques + protéines — base du petit-déjeuner',   categorie: 'produits_laitiers' },
  { id: 'yaourt_grec',    nom: 'Yaourt grec 0%',             kcal: 57,  prot: 10, lip: 0,  gluc: 4,  label: 'Le plus protéiné des yaourts — texture épaisse',      categorie: 'produits_laitiers' },
  { id: 'skyr',           nom: 'Skyr nature',                 kcal: 60,  prot: 11, lip: 0,  gluc: 4,  label: 'Encore plus protéiné que le grec — goût neutre',     categorie: 'produits_laitiers' },
  { id: 'cottage',        nom: 'Cottage cheese',             kcal: 98,  prot: 11, lip: 4,  gluc: 3,  label: 'Protéines + calcium — excellent en collation',        categorie: 'produits_laitiers' },
  { id: 'lait_ecreme',    nom: 'Lait écrémé',                kcal: 34,  prot: 3,  lip: 0,  gluc: 5,  label: 'Base pour smoothie protéiné — peu calorique',         categorie: 'produits_laitiers' },
  { id: 'lait_demi',      nom: 'Lait demi-écrémé',           kcal: 46,  prot: 3,  lip: 2,  gluc: 5,  label: 'Équilibré — bonne source de calcium',                 categorie: 'produits_laitiers' },
  { id: 'emmental',       nom: 'Emmental',                   kcal: 382, prot: 29, lip: 30, gluc: 0,  label: 'Calcium + protéines — consommer en petite quantité', categorie: 'produits_laitiers' },
  { id: 'mozzarella',     nom: 'Mozzarella',                 kcal: 242, prot: 18, lip: 19, gluc: 0,  label: 'Protéines + lipides modérés — idéale en salade',      categorie: 'produits_laitiers' },
  { id: 'parmesan',       nom: 'Parmesan',                   kcal: 431, prot: 38, lip: 29, gluc: 4,  label: 'Très riche en protéines — une cuillère suffit',       categorie: 'produits_laitiers' },
  { id: 'ricotta',        nom: 'Ricotta',                    kcal: 174, prot: 7,  lip: 13, gluc: 3,  label: 'Fromage frais polyvalent — sucré ou salé',            categorie: 'produits_laitiers' },
  { id: 'feta',           nom: 'Feta',                       kcal: 264, prot: 14, lip: 21, gluc: 4,  label: 'Caractère + calcium — 30g apportent du goût sans excès', categorie: 'produits_laitiers' },
  { id: 'kefir',          nom: 'Kéfir de lait',              kcal: 52,  prot: 4,  lip: 2,  gluc: 5,  label: 'Probiotiques naturels — excellent pour la digestion',  categorie: 'produits_laitiers' },
  { id: 'petit_suisse',   nom: 'Petit suisse 0%',            kcal: 60,  prot: 8,  lip: 0,  gluc: 5,  label: 'Snack protéiné pratique — format individuel',         categorie: 'produits_laitiers' },

  // ─── Féculents ────────────────────────────────────────────────────────
  { id: 'riz_blanc',      nom: 'Riz blanc cuit',             kcal: 130, prot: 3,  lip: 0,  gluc: 28, label: 'Glucide lent — énergie stable sur 3-4h',              categorie: 'feculents' },
  { id: 'riz_complet',    nom: 'Riz complet cuit',           kcal: 123, prot: 3,  lip: 1,  gluc: 26, label: 'Plus de fibres que le blanc — satiété augmentée',      categorie: 'feculents' },
  { id: 'pates',          nom: 'Pâtes cuites',               kcal: 131, prot: 5,  lip: 1,  gluc: 27, label: 'Glucide populaire — préférer complètes si possible',   categorie: 'feculents' },
  { id: 'pates_completes',nom: 'Pâtes complètes cuites',     kcal: 124, prot: 5,  lip: 1,  gluc: 25, label: 'Index glycémique plus bas — meilleure satiété',        categorie: 'feculents' },
  { id: 'pomme_terre',    nom: 'Pomme de terre cuite',       kcal: 86,  prot: 2,  lip: 0,  gluc: 20, label: 'Rassasiante et peu calorique — éviter la friture',     categorie: 'feculents' },
  { id: 'patate_douce',   nom: 'Patate douce cuite',         kcal: 90,  prot: 2,  lip: 0,  gluc: 21, label: 'Glucide noble — vitamines + fibres + saveur naturelle', categorie: 'feculents' },
  { id: 'quinoa',         nom: 'Quinoa cuit',                kcal: 120, prot: 4,  lip: 2,  gluc: 22, label: 'Pseudo-céréale complète — protéines végétales bonus',   categorie: 'feculents' },
  { id: 'flocons_avoine', nom: 'Flocons d\'avoine',           kcal: 370, prot: 13, lip: 7,  gluc: 63, label: 'Petit-déjeuner champion — énergie jusqu\'à midi',      categorie: 'feculents' },
  { id: 'pain_complet',   nom: 'Pain complet',               kcal: 247, prot: 9,  lip: 3,  gluc: 44, label: 'Fibres + minéraux — meilleur que le pain blanc',       categorie: 'feculents' },
  { id: 'pain_seigle',    nom: 'Pain de seigle',             kcal: 259, prot: 9,  lip: 2,  gluc: 49, label: 'Dense et rassasiant — index glycémique bas',           categorie: 'feculents' },
  { id: 'pain_blanc',     nom: 'Pain blanc',                 kcal: 265, prot: 9,  lip: 3,  gluc: 52, label: 'Rapide à digérer — à limiter au profit du complet',    categorie: 'feculents' },
  { id: 'couscous',       nom: 'Couscous cuit',              kcal: 112, prot: 4,  lip: 0,  gluc: 23, label: 'Rapide à préparer — bon glucide de base',              categorie: 'feculents' },
  { id: 'boulgour',       nom: 'Boulgour cuit',              kcal: 83,  prot: 3,  lip: 0,  gluc: 19, label: 'Plus nutritif que le riz blanc — riche en fibres',     categorie: 'feculents' },
  { id: 'son_avoine',     nom: 'Son d\'avoine',               kcal: 246, prot: 17, lip: 7,  gluc: 66, label: 'Fibres maximales — réduit l\'absorption glucidique',   categorie: 'feculents' },
  { id: 'galette_riz',    nom: 'Galette de riz',             kcal: 383, prot: 8,  lip: 3,  gluc: 82, label: 'Pratique mais peu rassasiant — compléter avec protéines', categorie: 'feculents' },

  // ─── Légumes ─────────────────────────────────────────────────────────
  { id: 'epinards',       nom: 'Épinards crus',              kcal: 23,  prot: 3,  lip: 0,  gluc: 4,  label: 'Fer + vitamines — calories quasi nulles',              categorie: 'legumes' },
  { id: 'brocoli',        nom: 'Brocoli cuit',               kcal: 35,  prot: 3,  lip: 0,  gluc: 6,  label: 'Légume santé par excellence — antioxydants',           categorie: 'legumes' },
  { id: 'tomate',         nom: 'Tomate',                     kcal: 18,  prot: 1,  lip: 0,  gluc: 4,  label: 'Lycopène + eau — quasi sans calories',                 categorie: 'legumes' },
  { id: 'carotte',        nom: 'Carotte',                    kcal: 41,  prot: 1,  lip: 0,  gluc: 10, label: 'Bêta-carotène — snack croquant peu calorique',         categorie: 'legumes' },
  { id: 'courgette',      nom: 'Courgette',                  kcal: 17,  prot: 1,  lip: 0,  gluc: 3,  label: 'Volume pour peu de calories — rassasiante',            categorie: 'legumes' },
  { id: 'aubergine',      nom: 'Aubergine',                  kcal: 25,  prot: 1,  lip: 0,  gluc: 6,  label: 'Texture fondante — peu calorique mais gourmande',      categorie: 'legumes' },
  { id: 'poivron_rouge',  nom: 'Poivron rouge',              kcal: 31,  prot: 1,  lip: 0,  gluc: 7,  label: 'Vitamine C × 3 fois le citron — rouge = plus sucré',   categorie: 'legumes' },
  { id: 'champignons',    nom: 'Champignons',                kcal: 22,  prot: 3,  lip: 0,  gluc: 3,  label: 'Umami naturel + protéines végétales légères',          categorie: 'legumes' },
  { id: 'concombre',      nom: 'Concombre',                  kcal: 12,  prot: 1,  lip: 0,  gluc: 2,  label: 'Hydratation + croquant — quasi zéro calories',         categorie: 'legumes' },
  { id: 'laitue',         nom: 'Laitue / salade verte',      kcal: 15,  prot: 1,  lip: 0,  gluc: 2,  label: 'Base de salade — volume pour zéro calories',           categorie: 'legumes' },
  { id: 'chou_fleur',     nom: 'Chou-fleur',                 kcal: 25,  prot: 2,  lip: 0,  gluc: 5,  label: 'Substitut riz ou gratins — très peu calorique',        categorie: 'legumes' },
  { id: 'haricots_verts', nom: 'Haricots verts',             kcal: 31,  prot: 2,  lip: 0,  gluc: 7,  label: 'Fibres + vitamines — s\'accommodent avec tout',         categorie: 'legumes' },
  { id: 'asperges',       nom: 'Asperges',                   kcal: 20,  prot: 2,  lip: 0,  gluc: 4,  label: 'Diurétiques naturelles + fibres — noble et léger',     categorie: 'legumes' },
  { id: 'oignon',         nom: 'Oignon',                     kcal: 40,  prot: 1,  lip: 0,  gluc: 9,  label: 'Prébiotique — nourrit la flore intestinale',           categorie: 'legumes' },
  { id: 'poireau',        nom: 'Poireau',                    kcal: 31,  prot: 2,  lip: 0,  gluc: 6,  label: 'Doux et fondant — riche en fibres solubles',           categorie: 'legumes' },
  { id: 'avocat',         nom: 'Avocat',                     kcal: 160, prot: 2,  lip: 15, gluc: 9,  label: 'Gras monoinsaturés bénéfiques — satiété exceptionnelle', categorie: 'legumes' },
  { id: 'petit_pois',     nom: 'Petit pois',                 kcal: 81,  prot: 5,  lip: 0,  gluc: 14, label: 'Protéines végétales + fibres — sucré naturellement',   categorie: 'legumes' },
  { id: 'endive',         nom: 'Endive',                     kcal: 17,  prot: 1,  lip: 0,  gluc: 4,  label: 'Amer = drainage — fibres + quasi zéro calories',       categorie: 'legumes' },
  { id: 'roquette',       nom: 'Roquette',                   categorie: 'legumes', kcal: 25, prot: 2, lip: 0, gluc: 4, label: 'Peppery et nutritive — idéale en base de salade' },
  { id: 'courge_butternut', nom: 'Courge butternut',         kcal: 45,  prot: 1,  lip: 0,  gluc: 12, label: 'Douce et crémeuse — riche en bêta-carotène',           categorie: 'legumes' },
  { id: 'celeri',         nom: 'Céleri branche',             kcal: 16,  prot: 1,  lip: 0,  gluc: 3,  label: 'Thermogénique — brûle presque autant qu\'il apporte',   categorie: 'legumes' },
  { id: 'chou_rouge',     nom: 'Chou rouge',                 kcal: 31,  prot: 2,  lip: 0,  gluc: 7,  label: 'Anthocyanes protectrices — couleur = nutrition',        categorie: 'legumes' },
  { id: 'maïs',           nom: 'Maïs cuit',                  kcal: 96,  prot: 3,  lip: 1,  gluc: 21, label: 'Glucide festif — en quantité modérée',                 categorie: 'legumes' },
  { id: 'fenouil',        nom: 'Fenouil',                    kcal: 31,  prot: 1,  lip: 0,  gluc: 7,  label: 'Anisé et digeste — excellent pour l\'intestin',         categorie: 'legumes' },

  // ─── Fruits ───────────────────────────────────────────────────────────
  { id: 'pomme',          nom: 'Pomme',                      kcal: 52,  prot: 0,  lip: 0,  gluc: 14, label: 'Fibres solubles — pectine régule la glycémie',         categorie: 'fruits' },
  { id: 'banane',         nom: 'Banane',                     kcal: 89,  prot: 1,  lip: 0,  gluc: 23, label: 'Potassium + énergie rapide — idéale avant la séance',  categorie: 'fruits' },
  { id: 'orange',         nom: 'Orange',                     kcal: 47,  prot: 1,  lip: 0,  gluc: 12, label: 'Vitamine C + fibres — hydratante et fraîche',          categorie: 'fruits' },
  { id: 'fraises',        nom: 'Fraises',                    kcal: 32,  prot: 1,  lip: 0,  gluc: 8,  label: 'Très faibles en sucre — riches en vitamine C',         categorie: 'fruits' },
  { id: 'myrtilles',      nom: 'Myrtilles',                  kcal: 57,  prot: 1,  lip: 0,  gluc: 14, label: 'Antioxydants maximum — superfruit accessible',         categorie: 'fruits' },
  { id: 'kiwi',           nom: 'Kiwi',                       kcal: 61,  prot: 1,  lip: 1,  gluc: 15, label: 'Vitamine C × 2 fois l\'orange + digestion',            categorie: 'fruits' },
  { id: 'poire',          nom: 'Poire',                      kcal: 57,  prot: 0,  lip: 0,  gluc: 15, label: 'Fibres solubles + eau — satiété et hydratation',       categorie: 'fruits' },
  { id: 'peche',          nom: 'Pêche',                      kcal: 39,  prot: 1,  lip: 0,  gluc: 10, label: 'Peu calorique et juteuse — vitamines A et C',          categorie: 'fruits' },
  { id: 'framboises',     nom: 'Framboises',                 kcal: 52,  prot: 1,  lip: 1,  gluc: 12, label: 'Fibres maximales parmi les fruits — peu de sucre',     categorie: 'fruits' },
  { id: 'abricot',        nom: 'Abricot',                    kcal: 48,  prot: 1,  lip: 0,  gluc: 11, label: 'Bêta-carotène + fibres — été plaisir',                 categorie: 'fruits' },
  { id: 'melon',          nom: 'Melon',                      kcal: 34,  prot: 1,  lip: 0,  gluc: 8,  label: 'Hydratant + doux — peu de calories, beaucoup de plaisir', categorie: 'fruits' },
  { id: 'pasteque',       nom: 'Pastèque',                   kcal: 30,  prot: 1,  lip: 0,  gluc: 8,  label: '92% d\'eau — hydratation parfaite par forte chaleur',   categorie: 'fruits' },
  { id: 'citron',         nom: 'Citron / jus de citron',     kcal: 29,  prot: 1,  lip: 0,  gluc: 9,  label: 'Vitamine C + arôme — relève tous les plats sans calorie', categorie: 'fruits' },
  { id: 'grenade',        nom: 'Grenade',                    kcal: 83,  prot: 2,  lip: 1,  gluc: 19, label: 'Antioxydants rares — anti-inflammatoire naturel',       categorie: 'fruits' },

  // ─── Lipides / Oléagineux ─────────────────────────────────────────────
  { id: 'huile_olive',    nom: 'Huile d\'olive',              kcal: 900, prot: 0,  lip: 100, gluc: 0, label: 'Lipide de qualité — 1 cuillère à soupe suffit',        categorie: 'lipides' },
  { id: 'amandes',        nom: 'Amandes',                    kcal: 579, prot: 21, lip: 50, gluc: 22, label: 'Snack complet — fibres + protéines + bons gras',        categorie: 'lipides' },
  { id: 'noix',           nom: 'Noix',                       kcal: 654, prot: 15, lip: 65, gluc: 14, label: 'Oméga-3 végétaux — meilleur fruit sec pour le cœur',   categorie: 'lipides' },
  { id: 'noisettes',      nom: 'Noisettes',                  kcal: 628, prot: 15, lip: 61, gluc: 17, label: 'Vitamine E + acide folique — délicieuses nature',       categorie: 'lipides' },
  { id: 'noix_cajou',     nom: 'Noix de cajou',              kcal: 553, prot: 18, lip: 44, gluc: 30, label: 'Magnésium + zinc — à savourer en petite quantité',     categorie: 'lipides' },
  { id: 'graines_chia',   nom: 'Graines de chia',            kcal: 486, prot: 17, lip: 31, gluc: 42, label: 'Oméga-3 + fibres + gel — gonfle dans le ventre',       categorie: 'lipides' },
  { id: 'graines_lin',    nom: 'Graines de lin moulues',     kcal: 534, prot: 18, lip: 42, gluc: 29, label: 'Oméga-3 + lignanes — à moudre pour absorber',          categorie: 'lipides' },
  { id: 'beurre_cacah',   nom: 'Beurre de cacahuète',        kcal: 588, prot: 25, lip: 50, gluc: 20, label: 'Gras + protéines — 1 cuillère sur tartine complet',    categorie: 'lipides' },
  { id: 'olives',         nom: 'Olives noires',              kcal: 115, prot: 1,  lip: 12, gluc: 1,  label: 'Gras monoinsaturés + polyphénols — à l\'apéro sans culpabilité', categorie: 'lipides' },
  { id: 'beurre',         nom: 'Beurre',                     kcal: 717, prot: 1,  lip: 81, gluc: 1,  label: 'Bon gras saturé en petite quantité — saveur incomparable', categorie: 'lipides' },
  { id: 'tahini',         nom: 'Tahini (pâte de sésame)',    kcal: 595, prot: 17, lip: 54, gluc: 21, label: 'Calcium + bons gras — base du houmous',                categorie: 'lipides' },
  { id: 'pistaches',      nom: 'Pistaches',                  kcal: 562, prot: 20, lip: 45, gluc: 28, label: 'Protéines + fibres — parmi les meilleurs fruits secs', categorie: 'lipides' },
  { id: 'graines_courge', nom: 'Graines de courge',          kcal: 559, prot: 30, lip: 49, gluc: 11, label: 'Zinc + magnésium + protéines — super-graine',          categorie: 'lipides' },

  // ─── Condiments / Divers ──────────────────────────────────────────────
  { id: 'sauce_tomate',   nom: 'Sauce tomate maison',        kcal: 35,  prot: 2,  lip: 0,  gluc: 8,  label: 'Base de plat légère — lycopène cuit = mieux absorbé',  categorie: 'autres' },
  { id: 'moutarde',       nom: 'Moutarde de Dijon',          kcal: 66,  prot: 5,  lip: 4,  gluc: 4,  label: 'Relève les plats sans calories — capsaïcine thermogène', categorie: 'autres' },
  { id: 'sauce_soja',     nom: 'Sauce soja (tamari)',        kcal: 53,  prot: 8,  lip: 0,  gluc: 5,  label: 'Umami + sel — attention au sodium en excès',            categorie: 'autres' },
  { id: 'houmous',        nom: 'Houmous',                    kcal: 177, prot: 8,  lip: 11, gluc: 16, label: 'Pois chiches + tahini — trempette protéinée',          categorie: 'autres' },
  { id: 'vinaigre_cidre', nom: 'Vinaigre de cidre',          kcal: 22,  prot: 0,  lip: 0,  gluc: 1,  label: 'Régule la glycémie — 1 cuillère avant les repas',      categorie: 'autres' },
  { id: 'miel',           nom: 'Miel',                       kcal: 304, prot: 0,  lip: 0,  gluc: 82, label: 'Sucre naturel — en petite quantité dans le thé',       categorie: 'autres' },
  { id: 'chocolat_noir',  nom: 'Chocolat noir 85%',          kcal: 598, prot: 10, lip: 51, gluc: 33, label: 'Magnésium + dopamine — 2 carrés suffisent',             categorie: 'autres' },
  { id: 'cafe',           nom: 'Café noir',                  kcal: 1,   prot: 0,  lip: 0,  gluc: 0,  label: 'Zéro calorie — thermogène léger sans sucre',           categorie: 'autres' },
  { id: 'the_vert',       nom: 'Thé vert',                   kcal: 1,   prot: 0,  lip: 0,  gluc: 0,  label: 'Antioxydants + légère thermogénèse — idéal en matinée', categorie: 'autres' },
  { id: 'lait_amande',    nom: 'Lait d\'amande non sucré',   kcal: 28,  prot: 1,  lip: 2,  gluc: 2,  label: 'Alternatif végétal léger — penser à l\'enrichi en calcium', categorie: 'autres' },
  { id: 'lait_soja',      nom: 'Lait de soja',               kcal: 44,  prot: 4,  lip: 2,  gluc: 2,  label: 'Protéines végétales + calcium — le plus complet',      categorie: 'autres' },
  { id: 'whey',           nom: 'Whey protéine nature',       kcal: 380, prot: 80, lip: 4,  gluc: 7,  label: 'Protéine concentrée — post-séance en 10 minutes',      categorie: 'proteines' },
  { id: 'spiruline',      nom: 'Spiruline',                  kcal: 290, prot: 57, lip: 8,  gluc: 24, label: 'Superfood — 1 cuillère dans smoothie + fer',            categorie: 'proteines' },
];

// Helpers
export const searchAliments = (query, topIds = []) => {
  if (!query || query.trim() === '') {
    if (topIds.length) {
      const top = topIds.map(id => aliments.find(a => a.id === id)).filter(Boolean);
      const rest = aliments.filter(a => !topIds.includes(a.id)).slice(0, 10);
      return [...top, ...rest].slice(0, 20);
    }
    return aliments.slice(0, 20);
  }
  const q = query.toLowerCase().trim();
  return aliments.filter(a =>
    a.nom.toLowerCase().includes(q) ||
    a.categorie.toLowerCase().includes(q) ||
    a.label.toLowerCase().includes(q)
  ).slice(0, 20);
};

export const getAlimentById = (id) => aliments.find(a => a.id === id);

export const calcNutriPour = (aliment, grammes) => ({
  kcal: Math.round(aliment.kcal * grammes / 100),
  prot: Math.round(aliment.prot * grammes / 100 * 10) / 10,
  lip:  Math.round(aliment.lip  * grammes / 100 * 10) / 10,
  gluc: Math.round(aliment.gluc * grammes / 100 * 10) / 10,
});
