(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const T=(e,t)=>{const r=V();r.unshift({type:e,...t,id:crypto.randomUUID(),created_at:new Date().toISOString()}),localStorage.setItem("logs",JSON.stringify(r))},V=()=>JSON.parse(localStorage.getItem("logs")||"[]"),I=e=>{const t=new Date;return t.setDate(t.getDate()-e),V().filter(r=>new Date(r.created_at)>=t)},fe=(e=new Date)=>{const t=e.toISOString().slice(0,10);return V().filter(r=>r.created_at.slice(0,10)===t)},De=e=>localStorage.setItem("profile",JSON.stringify(e)),ce=()=>JSON.parse(localStorage.getItem("profile")||"null"),ze=e=>{const t=X();t.push({...e,id:crypto.randomUUID(),created_at:new Date().toISOString()}),localStorage.setItem("mesures",JSON.stringify(t))},X=()=>JSON.parse(localStorage.getItem("mesures")||"[]"),Ie=()=>{const e=X();return e.length?e[e.length-1]:null},Oe=e=>{const t=JSON.parse(localStorage.getItem("aliments_freq")||"{}");t[e]=(t[e]||0)+1,localStorage.setItem("aliments_freq",JSON.stringify(t))},Be=(e=10)=>{const t=JSON.parse(localStorage.getItem("aliments_freq")||"{}");return Object.entries(t).sort((r,s)=>s[1]-r[1]).slice(0,e).map(r=>r[0])},we=()=>{let e=localStorage.getItem("first_launch_date");return e||(e=new Date().toISOString(),localStorage.setItem("first_launch_date",e)),new Date(e)},Fe=()=>{const e=we();return Math.floor((new Date-e)/(7*24*60*60*1e3))},qe=()=>localStorage.setItem("last_workout_end",new Date().toISOString()),Re=()=>{const e=localStorage.getItem("last_workout_end");return e?new Date(e):null},He=()=>{const e=V();if(!e.length)return 0;let t=0;const r=new Date;r.setHours(0,0,0,0);for(let s=0;;s++){const o=new Date(r);o.setDate(r.getDate()-s);const a=o.toISOString().slice(0,10),i=e.some(n=>n.created_at.slice(0,10)===a),c=e.some(n=>n.type==="journee_libre"&&n.created_at.slice(0,10)===a);if(i||c)t++;else break}return t},Ve=()=>{const e=new Date;if(e.getDay()!==1)return!1;const r=localStorage.getItem("last_weekly_report"),s=e.toISOString().slice(0,10);return r===s?!1:I(14).filter(i=>{const c=new Date(i.created_at),n=Math.floor((e-c)/(24*60*60*1e3));return n>=7&&n<14}).length>0},ye=()=>{const e=new Date;localStorage.setItem("last_weekly_report",e.toISOString().slice(0,10))},Y=(e,t=null)=>{const r=JSON.parse(localStorage.getItem("settings")||"{}");return e in r?r[e]:t},Ne=(e,t)=>{const r=JSON.parse(localStorage.getItem("settings")||"{}");r[e]=t,localStorage.setItem("settings",JSON.stringify(r))},Ge=()=>{const e=new Date;return e.setDate(e.getDate()-e.getDay()),e.setHours(0,0,0,0),V().filter(t=>t.type==="repas_libre"&&new Date(t.created_at)>=e).length},Je=e=>{const{poids:t,taille:r,age:s}=e,o=Math.round(1.083*Math.pow(t,.48)*Math.pow(r/100,.5)*Math.pow(s,-.13)*239);return console.log("DEBUG BMR (1.083 * W^0.48 * H^0.50 * A^-0.13 * 239):",o,"| profil:",{poids:t,taille:r,age:s}),o},We=e=>Math.round(e*1.375),Ue=e=>e-500,Ke=(e,t)=>{const r=Math.round(e.poids*1.5),s=Math.round(e.poidsObjectif*1),o=t-r*4-s*9,a=Math.round(Math.max(o,0)/4);return{proteines:r,lipides:s,glucides:a}},le=e=>{const t=Je(e),r=We(t),s=Ue(r),o=Ke(e,s);return{mb:t,det:r,budget:s,macros:o}},Ye={proteines:{nom:"Protéines",semaine1:"Ton carburant muscle",semaine3:"Rassasient durablement — réduisent les pulsions",semaine8:"Protéines : viandes, œufs, légumineuses, fromage blanc"},lipides:{nom:"Lipides",semaine1:"Les bonnes graisses",semaine3:"Essentielles pour les hormones et l'énergie",semaine8:"Lipides : huile d'olive, avocats, noix, poissons gras"},glucides:{nom:"Glucides",semaine1:"Ton énergie quotidienne",semaine3:"Préfère les glucides lents : riz, patate douce, légumes",semaine8:"Glucides lents = énergie stable. Glucides rapides = pic puis chute"}},Q=(e,t)=>{const r=Ye[e];return r?t>=8?r.semaine8:t>=3?r.semaine3:r.semaine1:""},_e=(e,t,r=120)=>{const o={marche:3.5,kb_complet:6,kb_allege:4.5,corde_complete:10,corde_allegee:8,vacances_a:5.5,vacances_b:7,vacances_c:3.5}[e]||4;return Math.round(o*r*3.5/200*t)},Ze="modulepreload",Xe=function(e){return"/"+e},ke={},Qe=function(t,r,s){let o=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(r.map(n=>{if(n=Xe(n),n in ke)return;ke[n]=!0;const l=n.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${u}`))return;const v=document.createElement("link");if(v.rel=l?"stylesheet":Ze,l||(v.as="script"),v.crossOrigin="",v.href=n,c&&v.setAttribute("nonce",c),document.head.appendChild(v),l)return new Promise((b,y)=>{v.addEventListener("load",b),v.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${n}`)))})}))}function a(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return o.then(i=>{for(const c of i||[])c.status==="rejected"&&a(c.reason);return t().catch(a)})},et={marche:15,kb_complet:25,kb_allege:15,corde_complete:20,corde_allegee:12,vacances_a:22,vacances_a_allege:14,vacances_b:18,vacances_c:12},tt=()=>{const e=I(7).filter(r=>r.type==="sport");let t=0;return e.forEach(r=>{t+=et[r.activite]||0}),Math.min(t,100)},st=()=>{var o;const e=I(7).filter(a=>["repas","journee_libre","repas_libre","ecart_petit","ecart_gros"].includes(a.type)),t={};e.forEach(a=>{const i=a.created_at.slice(0,10);t[i]||(t[i]=[]),t[i].push(a)});let r=0,s=0;for(let a=0;a<7;a++){const i=new Date;i.setDate(i.getDate()-a);const c=i.toISOString().slice(0,10),n=t[c]||[];if(!n.length)continue;s++;let l=0;if(n.some(b=>b.type==="journee_libre"))l=15;else{const b=n.filter(m=>m.type==="repas"),y=n.filter(m=>m.type==="repas_libre"),x=n.filter(m=>m.type==="ecart_petit"),d=n.filter(m=>m.type==="ecart_gros"),g=b.reduce((m,p)=>m+(p.kcal||0),0),k=((o=n.find(m=>m.budget))==null?void 0:o.budget)||2320;b.length&&g<=k&&(l+=15),y.forEach(()=>{l+=12}),x.forEach(()=>{l+=8}),d.forEach(()=>{l+=3})}const v=n.find(b=>b.type==="hydratation");if(v){const b=v.verres||0;b<3?l-=5:b>=6?l+=8:b>=5&&(l+=5)}r+=Math.max(l,0)}return s?Math.min(Math.round(r/s),100):0},rt=()=>{const e=I(7).filter(r=>r.type==="pulsion");let t=0;return e.forEach(r=>{r.resiste?t+=10:t+=3}),e.length?Math.min(t,100):50},ot=()=>{const e=tt(),t=st(),r=rt();return Math.round(e*.4+t*.4+r*.2)},at=e=>e>=90?{zone:"Excellent",color:"var(--color-success)",message:"Tu es dans ta zone optimale"}:e>=70?{zone:"Bon rythme",color:"var(--color-success)",message:"Continue, tu es sur la bonne voie"}:e>=50?{zone:"À relancer",color:"var(--color-alert)",message:"Une séance aujourd'hui te remet dans le vert"}:{zone:"Attention",color:"var(--color-alert)",message:"Pas de jugement — une marche suffit pour repartir"},it=()=>{const t=I(14).filter(n=>{const l=new Date,u=new Date(n.created_at),v=Math.floor((l-u)/(24*60*60*1e3));return v>=7&&v<14}),r=t.filter(n=>n.type==="sport"),s=t.filter(n=>n.type==="pulsion"),o=s.filter(n=>n.resiste).length,a=s.filter(n=>!n.resiste).length,i=["Chaque jour déclaré est une victoire — continue comme ça.","La régularité prime sur la performance. Tu es sur la bonne voie.","Ton corps enregistre chaque effort, même les petits.","Une semaine de plus dans la bonne direction. Bravo.","Le chemin compte autant que la destination."],c=i[Math.floor(Math.random()*i.length)];return{seances:r.length,resistees:o,craquages:a,feedback:c}},J=[{id:"oeuf",nom:"Œuf entier",kcal:155,prot:13,lip:11,gluc:1,label:"Excellent pour les protéines — peu de sucres",categorie:"proteines"},{id:"poulet_blanc",nom:"Blanc de poulet",kcal:110,prot:23,lip:2,gluc:0,label:"La meilleure source de protéines maigres",categorie:"proteines"},{id:"cuisse_poulet",nom:"Cuisse de poulet",kcal:150,prot:18,lip:8,gluc:0,label:"Protéines + graisses utiles — rassasiant",categorie:"proteines"},{id:"boeuf_maigre",nom:"Bœuf maigre (5% MG)",kcal:135,prot:22,lip:5,gluc:0,label:"Protéines de qualité + fer — idéal après la séance",categorie:"proteines"},{id:"steak_hache",nom:"Steak haché 15% MG",kcal:200,prot:18,lip:14,gluc:0,label:"Pratique — préférer la version 5% si disponible",categorie:"proteines"},{id:"dinde",nom:"Filet de dinde",kcal:107,prot:24,lip:1,gluc:0,label:"Encore plus maigre que le poulet — idéal au quotidien",categorie:"proteines"},{id:"jambon_blanc",nom:"Jambon blanc",kcal:110,prot:19,lip:3,gluc:1,label:"Protéine rapide pratique — surveiller le sel",categorie:"proteines"},{id:"thon_boite",nom:"Thon en boîte (eau)",kcal:130,prot:28,lip:2,gluc:0,label:"Roi des protéines pratiques — toujours en stock",categorie:"proteines"},{id:"saumon_frais",nom:"Saumon frais",kcal:208,prot:20,lip:13,gluc:0,label:"Oméga-3 + protéines — excellent 2x/semaine",categorie:"proteines"},{id:"saumon_fume",nom:"Saumon fumé",kcal:175,prot:21,lip:9,gluc:0,label:"Protéines nobles — surveiller le sel",categorie:"proteines"},{id:"sardines",nom:"Sardines en boîte",kcal:190,prot:21,lip:11,gluc:0,label:"Oméga-3 + calcium — l'un des meilleurs aliments",categorie:"proteines"},{id:"crevettes",nom:"Crevettes cuites",kcal:90,prot:19,lip:1,gluc:0,label:"Très maigres et rassasiantes — parfaites en entrée",categorie:"proteines"},{id:"cabillaud",nom:"Cabillaud",kcal:80,prot:18,lip:1,gluc:0,label:"Poisson blanc ultra-maigre — peu de calories",categorie:"proteines"},{id:"maquereau",nom:"Maquereau",kcal:200,prot:19,lip:13,gluc:0,label:"Riche en oméga-3 — excellent pour le cœur",categorie:"proteines"},{id:"veau",nom:"Escalope de veau",kcal:125,prot:24,lip:3,gluc:0,label:"Protéines tendres et maigres — riche en zinc",categorie:"proteines"},{id:"roti_porc",nom:"Rôti de porc maigre",kcal:165,prot:28,lip:6,gluc:0,label:"Viande maigre polyvalente — rica en vitamines B",categorie:"proteines"},{id:"coquilles_sjj",nom:"Coquilles Saint-Jacques",kcal:86,prot:15,lip:1,gluc:3,label:"Très faibles en graisses + protéines de qualité",categorie:"proteines"},{id:"moules",nom:"Moules cuites",kcal:86,prot:12,lip:2,gluc:4,label:"Protéines + fer + zinc — peu caloriques",categorie:"proteines"},{id:"bar",nom:"Bar (loup)",kcal:99,prot:18,lip:3,gluc:0,label:"Poisson noble et maigre — idéal au dîner",categorie:"proteines"},{id:"truite_fumee",nom:"Truite fumée",kcal:193,prot:21,lip:12,gluc:0,label:"Alternative gourmande au saumon fumé",categorie:"proteines"},{id:"lentilles",nom:"Lentilles cuites",kcal:116,prot:9,lip:0,gluc:20,label:"Protéines végétales + fibres — très rassasiant",categorie:"proteines"},{id:"pois_chiches",nom:"Pois chiches cuits",kcal:164,prot:9,lip:3,gluc:27,label:"Légumineuse reine — hummus, salades, curry",categorie:"proteines"},{id:"haricots_rouges",nom:"Haricots rouges cuits",kcal:127,prot:9,lip:0,gluc:23,label:"Fibres + protéines — énergie longue durée",categorie:"proteines"},{id:"tofu",nom:"Tofu nature",kcal:76,prot:8,lip:4,gluc:2,label:"Protéine végétale complète — absorbe toutes les saveurs",categorie:"proteines"},{id:"edamame",nom:"Edamame",kcal:122,prot:11,lip:5,gluc:10,label:"Soja frais — snack protéiné parfait",categorie:"proteines"},{id:"pvt",nom:"Protéines végétales texturées",kcal:340,prot:50,lip:4,gluc:30,label:"Substitut viande économique — haute protéine",categorie:"proteines"},{id:"haricots_blancs",nom:"Haricots blancs cuits",kcal:132,prot:9,lip:0,gluc:24,label:"Fibres solubles — réduisent l'absorption du sucre",categorie:"proteines"},{id:"fromage_blanc_0",nom:"Fromage blanc 0%",kcal:45,prot:8,lip:0,gluc:4,label:"Protéines rapides post-séance — idéal le soir",categorie:"produits_laitiers"},{id:"yaourt_0",nom:"Yaourt nature 0%",kcal:48,prot:5,lip:0,gluc:7,label:"Probiotiques + protéines — base du petit-déjeuner",categorie:"produits_laitiers"},{id:"yaourt_grec",nom:"Yaourt grec 0%",kcal:57,prot:10,lip:0,gluc:4,label:"Le plus protéiné des yaourts — texture épaisse",categorie:"produits_laitiers"},{id:"skyr",nom:"Skyr nature",kcal:60,prot:11,lip:0,gluc:4,label:"Encore plus protéiné que le grec — goût neutre",categorie:"produits_laitiers"},{id:"cottage",nom:"Cottage cheese",kcal:98,prot:11,lip:4,gluc:3,label:"Protéines + calcium — excellent en collation",categorie:"produits_laitiers"},{id:"lait_ecreme",nom:"Lait écrémé",kcal:34,prot:3,lip:0,gluc:5,label:"Base pour smoothie protéiné — peu calorique",categorie:"produits_laitiers"},{id:"lait_demi",nom:"Lait demi-écrémé",kcal:46,prot:3,lip:2,gluc:5,label:"Équilibré — bonne source de calcium",categorie:"produits_laitiers"},{id:"emmental",nom:"Emmental",kcal:382,prot:29,lip:30,gluc:0,label:"Calcium + protéines — consommer en petite quantité",categorie:"produits_laitiers"},{id:"mozzarella",nom:"Mozzarella",kcal:242,prot:18,lip:19,gluc:0,label:"Protéines + lipides modérés — idéale en salade",categorie:"produits_laitiers"},{id:"parmesan",nom:"Parmesan",kcal:431,prot:38,lip:29,gluc:4,label:"Très riche en protéines — une cuillère suffit",categorie:"produits_laitiers"},{id:"ricotta",nom:"Ricotta",kcal:174,prot:7,lip:13,gluc:3,label:"Fromage frais polyvalent — sucré ou salé",categorie:"produits_laitiers"},{id:"feta",nom:"Feta",kcal:264,prot:14,lip:21,gluc:4,label:"Caractère + calcium — 30g apportent du goût sans excès",categorie:"produits_laitiers"},{id:"kefir",nom:"Kéfir de lait",kcal:52,prot:4,lip:2,gluc:5,label:"Probiotiques naturels — excellent pour la digestion",categorie:"produits_laitiers"},{id:"petit_suisse",nom:"Petit suisse 0%",kcal:60,prot:8,lip:0,gluc:5,label:"Snack protéiné pratique — format individuel",categorie:"produits_laitiers"},{id:"riz_blanc",nom:"Riz blanc cuit",kcal:130,prot:3,lip:0,gluc:28,label:"Glucide lent — énergie stable sur 3-4h",categorie:"feculents"},{id:"riz_complet",nom:"Riz complet cuit",kcal:123,prot:3,lip:1,gluc:26,label:"Plus de fibres que le blanc — satiété augmentée",categorie:"feculents"},{id:"pates",nom:"Pâtes cuites",kcal:131,prot:5,lip:1,gluc:27,label:"Glucide populaire — préférer complètes si possible",categorie:"feculents"},{id:"pates_completes",nom:"Pâtes complètes cuites",kcal:124,prot:5,lip:1,gluc:25,label:"Index glycémique plus bas — meilleure satiété",categorie:"feculents"},{id:"pomme_terre",nom:"Pomme de terre cuite",kcal:86,prot:2,lip:0,gluc:20,label:"Rassasiante et peu calorique — éviter la friture",categorie:"feculents"},{id:"patate_douce",nom:"Patate douce cuite",kcal:90,prot:2,lip:0,gluc:21,label:"Glucide noble — vitamines + fibres + saveur naturelle",categorie:"feculents"},{id:"quinoa",nom:"Quinoa cuit",kcal:120,prot:4,lip:2,gluc:22,label:"Pseudo-céréale complète — protéines végétales bonus",categorie:"feculents"},{id:"flocons_avoine",nom:"Flocons d'avoine",kcal:370,prot:13,lip:7,gluc:63,label:"Petit-déjeuner champion — énergie jusqu'à midi",categorie:"feculents"},{id:"pain_complet",nom:"Pain complet",kcal:247,prot:9,lip:3,gluc:44,label:"Fibres + minéraux — meilleur que le pain blanc",categorie:"feculents"},{id:"pain_seigle",nom:"Pain de seigle",kcal:259,prot:9,lip:2,gluc:49,label:"Dense et rassasiant — index glycémique bas",categorie:"feculents"},{id:"pain_blanc",nom:"Pain blanc",kcal:265,prot:9,lip:3,gluc:52,label:"Rapide à digérer — à limiter au profit du complet",categorie:"feculents"},{id:"couscous",nom:"Couscous cuit",kcal:112,prot:4,lip:0,gluc:23,label:"Rapide à préparer — bon glucide de base",categorie:"feculents"},{id:"boulgour",nom:"Boulgour cuit",kcal:83,prot:3,lip:0,gluc:19,label:"Plus nutritif que le riz blanc — riche en fibres",categorie:"feculents"},{id:"son_avoine",nom:"Son d'avoine",kcal:246,prot:17,lip:7,gluc:66,label:"Fibres maximales — réduit l'absorption glucidique",categorie:"feculents"},{id:"galette_riz",nom:"Galette de riz",kcal:383,prot:8,lip:3,gluc:82,label:"Pratique mais peu rassasiant — compléter avec protéines",categorie:"feculents"},{id:"epinards",nom:"Épinards crus",kcal:23,prot:3,lip:0,gluc:4,label:"Fer + vitamines — calories quasi nulles",categorie:"legumes"},{id:"brocoli",nom:"Brocoli cuit",kcal:35,prot:3,lip:0,gluc:6,label:"Légume santé par excellence — antioxydants",categorie:"legumes"},{id:"tomate",nom:"Tomate",kcal:18,prot:1,lip:0,gluc:4,label:"Lycopène + eau — quasi sans calories",categorie:"legumes"},{id:"carotte",nom:"Carotte",kcal:41,prot:1,lip:0,gluc:10,label:"Bêta-carotène — snack croquant peu calorique",categorie:"legumes"},{id:"courgette",nom:"Courgette",kcal:17,prot:1,lip:0,gluc:3,label:"Volume pour peu de calories — rassasiante",categorie:"legumes"},{id:"aubergine",nom:"Aubergine",kcal:25,prot:1,lip:0,gluc:6,label:"Texture fondante — peu calorique mais gourmande",categorie:"legumes"},{id:"poivron_rouge",nom:"Poivron rouge",kcal:31,prot:1,lip:0,gluc:7,label:"Vitamine C × 3 fois le citron — rouge = plus sucré",categorie:"legumes"},{id:"champignons",nom:"Champignons",kcal:22,prot:3,lip:0,gluc:3,label:"Umami naturel + protéines végétales légères",categorie:"legumes"},{id:"concombre",nom:"Concombre",kcal:12,prot:1,lip:0,gluc:2,label:"Hydratation + croquant — quasi zéro calories",categorie:"legumes"},{id:"laitue",nom:"Laitue / salade verte",kcal:15,prot:1,lip:0,gluc:2,label:"Base de salade — volume pour zéro calories",categorie:"legumes"},{id:"chou_fleur",nom:"Chou-fleur",kcal:25,prot:2,lip:0,gluc:5,label:"Substitut riz ou gratins — très peu calorique",categorie:"legumes"},{id:"haricots_verts",nom:"Haricots verts",kcal:31,prot:2,lip:0,gluc:7,label:"Fibres + vitamines — s'accommodent avec tout",categorie:"legumes"},{id:"asperges",nom:"Asperges",kcal:20,prot:2,lip:0,gluc:4,label:"Diurétiques naturelles + fibres — noble et léger",categorie:"legumes"},{id:"oignon",nom:"Oignon",kcal:40,prot:1,lip:0,gluc:9,label:"Prébiotique — nourrit la flore intestinale",categorie:"legumes"},{id:"poireau",nom:"Poireau",kcal:31,prot:2,lip:0,gluc:6,label:"Doux et fondant — riche en fibres solubles",categorie:"legumes"},{id:"avocat",nom:"Avocat",kcal:160,prot:2,lip:15,gluc:9,label:"Gras monoinsaturés bénéfiques — satiété exceptionnelle",categorie:"legumes"},{id:"petit_pois",nom:"Petit pois",kcal:81,prot:5,lip:0,gluc:14,label:"Protéines végétales + fibres — sucré naturellement",categorie:"legumes"},{id:"endive",nom:"Endive",kcal:17,prot:1,lip:0,gluc:4,label:"Amer = drainage — fibres + quasi zéro calories",categorie:"legumes"},{id:"roquette",nom:"Roquette",categorie:"legumes",kcal:25,prot:2,lip:0,gluc:4,label:"Peppery et nutritive — idéale en base de salade"},{id:"courge_butternut",nom:"Courge butternut",kcal:45,prot:1,lip:0,gluc:12,label:"Douce et crémeuse — riche en bêta-carotène",categorie:"legumes"},{id:"celeri",nom:"Céleri branche",kcal:16,prot:1,lip:0,gluc:3,label:"Thermogénique — brûle presque autant qu'il apporte",categorie:"legumes"},{id:"chou_rouge",nom:"Chou rouge",kcal:31,prot:2,lip:0,gluc:7,label:"Anthocyanes protectrices — couleur = nutrition",categorie:"legumes"},{id:"maïs",nom:"Maïs cuit",kcal:96,prot:3,lip:1,gluc:21,label:"Glucide festif — en quantité modérée",categorie:"legumes"},{id:"fenouil",nom:"Fenouil",kcal:31,prot:1,lip:0,gluc:7,label:"Anisé et digeste — excellent pour l'intestin",categorie:"legumes"},{id:"pomme",nom:"Pomme",kcal:52,prot:0,lip:0,gluc:14,label:"Fibres solubles — pectine régule la glycémie",categorie:"fruits"},{id:"banane",nom:"Banane",kcal:89,prot:1,lip:0,gluc:23,label:"Potassium + énergie rapide — idéale avant la séance",categorie:"fruits"},{id:"orange",nom:"Orange",kcal:47,prot:1,lip:0,gluc:12,label:"Vitamine C + fibres — hydratante et fraîche",categorie:"fruits"},{id:"fraises",nom:"Fraises",kcal:32,prot:1,lip:0,gluc:8,label:"Très faibles en sucre — riches en vitamine C",categorie:"fruits"},{id:"myrtilles",nom:"Myrtilles",kcal:57,prot:1,lip:0,gluc:14,label:"Antioxydants maximum — superfruit accessible",categorie:"fruits"},{id:"kiwi",nom:"Kiwi",kcal:61,prot:1,lip:1,gluc:15,label:"Vitamine C × 2 fois l'orange + digestion",categorie:"fruits"},{id:"poire",nom:"Poire",kcal:57,prot:0,lip:0,gluc:15,label:"Fibres solubles + eau — satiété et hydratation",categorie:"fruits"},{id:"peche",nom:"Pêche",kcal:39,prot:1,lip:0,gluc:10,label:"Peu calorique et juteuse — vitamines A et C",categorie:"fruits"},{id:"framboises",nom:"Framboises",kcal:52,prot:1,lip:1,gluc:12,label:"Fibres maximales parmi les fruits — peu de sucre",categorie:"fruits"},{id:"abricot",nom:"Abricot",kcal:48,prot:1,lip:0,gluc:11,label:"Bêta-carotène + fibres — été plaisir",categorie:"fruits"},{id:"melon",nom:"Melon",kcal:34,prot:1,lip:0,gluc:8,label:"Hydratant + doux — peu de calories, beaucoup de plaisir",categorie:"fruits"},{id:"pasteque",nom:"Pastèque",kcal:30,prot:1,lip:0,gluc:8,label:"92% d'eau — hydratation parfaite par forte chaleur",categorie:"fruits"},{id:"citron",nom:"Citron / jus de citron",kcal:29,prot:1,lip:0,gluc:9,label:"Vitamine C + arôme — relève tous les plats sans calorie",categorie:"fruits"},{id:"grenade",nom:"Grenade",kcal:83,prot:2,lip:1,gluc:19,label:"Antioxydants rares — anti-inflammatoire naturel",categorie:"fruits"},{id:"huile_olive",nom:"Huile d'olive",kcal:900,prot:0,lip:100,gluc:0,label:"Lipide de qualité — 1 cuillère à soupe suffit",categorie:"lipides"},{id:"amandes",nom:"Amandes",kcal:579,prot:21,lip:50,gluc:22,label:"Snack complet — fibres + protéines + bons gras",categorie:"lipides"},{id:"noix",nom:"Noix",kcal:654,prot:15,lip:65,gluc:14,label:"Oméga-3 végétaux — meilleur fruit sec pour le cœur",categorie:"lipides"},{id:"noisettes",nom:"Noisettes",kcal:628,prot:15,lip:61,gluc:17,label:"Vitamine E + acide folique — délicieuses nature",categorie:"lipides"},{id:"noix_cajou",nom:"Noix de cajou",kcal:553,prot:18,lip:44,gluc:30,label:"Magnésium + zinc — à savourer en petite quantité",categorie:"lipides"},{id:"graines_chia",nom:"Graines de chia",kcal:486,prot:17,lip:31,gluc:42,label:"Oméga-3 + fibres + gel — gonfle dans le ventre",categorie:"lipides"},{id:"graines_lin",nom:"Graines de lin moulues",kcal:534,prot:18,lip:42,gluc:29,label:"Oméga-3 + lignanes — à moudre pour absorber",categorie:"lipides"},{id:"beurre_cacah",nom:"Beurre de cacahuète",kcal:588,prot:25,lip:50,gluc:20,label:"Gras + protéines — 1 cuillère sur tartine complet",categorie:"lipides"},{id:"olives",nom:"Olives noires",kcal:115,prot:1,lip:12,gluc:1,label:"Gras monoinsaturés + polyphénols — à l'apéro sans culpabilité",categorie:"lipides"},{id:"beurre",nom:"Beurre",kcal:717,prot:1,lip:81,gluc:1,label:"Bon gras saturé en petite quantité — saveur incomparable",categorie:"lipides"},{id:"tahini",nom:"Tahini (pâte de sésame)",kcal:595,prot:17,lip:54,gluc:21,label:"Calcium + bons gras — base du houmous",categorie:"lipides"},{id:"pistaches",nom:"Pistaches",kcal:562,prot:20,lip:45,gluc:28,label:"Protéines + fibres — parmi les meilleurs fruits secs",categorie:"lipides"},{id:"graines_courge",nom:"Graines de courge",kcal:559,prot:30,lip:49,gluc:11,label:"Zinc + magnésium + protéines — super-graine",categorie:"lipides"},{id:"sauce_tomate",nom:"Sauce tomate maison",kcal:35,prot:2,lip:0,gluc:8,label:"Base de plat légère — lycopène cuit = mieux absorbé",categorie:"autres"},{id:"moutarde",nom:"Moutarde de Dijon",kcal:66,prot:5,lip:4,gluc:4,label:"Relève les plats sans calories — capsaïcine thermogène",categorie:"autres"},{id:"sauce_soja",nom:"Sauce soja (tamari)",kcal:53,prot:8,lip:0,gluc:5,label:"Umami + sel — attention au sodium en excès",categorie:"autres"},{id:"houmous",nom:"Houmous",kcal:177,prot:8,lip:11,gluc:16,label:"Pois chiches + tahini — trempette protéinée",categorie:"autres"},{id:"vinaigre_cidre",nom:"Vinaigre de cidre",kcal:22,prot:0,lip:0,gluc:1,label:"Régule la glycémie — 1 cuillère avant les repas",categorie:"autres"},{id:"miel",nom:"Miel",kcal:304,prot:0,lip:0,gluc:82,label:"Sucre naturel — en petite quantité dans le thé",categorie:"autres"},{id:"chocolat_noir",nom:"Chocolat noir 85%",kcal:598,prot:10,lip:51,gluc:33,label:"Magnésium + dopamine — 2 carrés suffisent",categorie:"autres"},{id:"cafe",nom:"Café noir",kcal:1,prot:0,lip:0,gluc:0,label:"Zéro calorie — thermogène léger sans sucre",categorie:"autres"},{id:"the_vert",nom:"Thé vert",kcal:1,prot:0,lip:0,gluc:0,label:"Antioxydants + légère thermogénèse — idéal en matinée",categorie:"autres"},{id:"lait_amande",nom:"Lait d'amande non sucré",kcal:28,prot:1,lip:2,gluc:2,label:"Alternatif végétal léger — penser à l'enrichi en calcium",categorie:"autres"},{id:"lait_soja",nom:"Lait de soja",kcal:44,prot:4,lip:2,gluc:2,label:"Protéines végétales + calcium — le plus complet",categorie:"autres"},{id:"whey",nom:"Whey protéine nature",kcal:380,prot:80,lip:4,gluc:7,label:"Protéine concentrée — post-séance en 10 minutes",categorie:"proteines"},{id:"spiruline",nom:"Spiruline",kcal:290,prot:57,lip:8,gluc:24,label:"Superfood — 1 cuillère dans smoothie + fer",categorie:"proteines"}],ee=(e,t=[])=>{if(!e||e.trim()===""){if(t.length){const s=t.map(a=>J.find(i=>i.id===a)).filter(Boolean),o=J.filter(a=>!t.includes(a.id)).slice(0,10);return[...s,...o].slice(0,20)}return J.slice(0,20)}const r=e.toLowerCase().trim();return J.filter(s=>s.nom.toLowerCase().includes(r)||s.categorie.toLowerCase().includes(r)||s.label.toLowerCase().includes(r)).slice(0,20)},nt=e=>J.find(t=>t.id===e),te=(e,t)=>({kcal:Math.round(e.kcal*t/100),prot:Math.round(e.prot*t/100*10)/10,lip:Math.round(e.lip*t/100*10)/10,gluc:Math.round(e.gluc*t/100*10)/10}),se={circuit1:{id:"circuit1",nom:"Circuit Fondation",periode:"Semaines 1-4",objectif:"Apprendre les mouvements, ne pas se blesser",ressenti:"Essoufflé mais capable de parler",tours:3,dureeEstimee:18,typeActivite:"kb_complet",repos:90,exercices:[{id:"deadlift",nom:"Deadlift",kb:"18 kg",reps:10,consigne:"Tiré du sol, dos droit — poussez dans les talons"},{id:"goblet_squat",nom:"Goblet Squat",kb:"12 kg",reps:8,consigne:"KB tenu devant la poitrine, descente profonde"},{id:"swing",nom:"Swing",kb:"12 kg",reps:10,consigne:"Balancé hanches, pas les bras — explosif"}]},circuit2:{id:"circuit2",nom:"Circuit Construction",periode:"Semaines 5-8",objectif:"Construire la force et l'endurance",ressenti:"Essoufflé, mais récupère vite",tours:4,dureeEstimee:24,typeActivite:"kb_complet",repos:75,exercices:[{id:"swing",nom:"Swing",kb:"18 kg",reps:12,consigne:"Hanches explosives — serrer les fessiers en haut"},{id:"goblet",nom:"Goblet Squat",kb:"18 kg",reps:10,consigne:"Coudes contre les genoux en descente"},{id:"rdl",nom:"Romanian Deadlift",kb:"18 kg",reps:10,consigne:"Hanches en arrière, dos plat — chercher l'étirement"},{id:"halo",nom:"Halo",kb:"12 kg",reps:8,consigne:"Cercle autour de la tête — contrôle total"}]},circuit3:{id:"circuit3",nom:"Circuit Intensité",periode:"Mois 3+",objectif:"Performance et brûlure graisseuse",ressenti:"Intensité élevée — tu mérites le repos",tours:4,dureeEstimee:28,typeActivite:"kb_complet",repos:60,exercices:[{id:"swing",nom:"Swing",kb:"18 kg",reps:15,consigne:"Explosion maximale — tête neutre"},{id:"clean_press",nom:"Clean & Press",kb:"12 kg",reps:"8/côté",consigne:"Coude à l'épaule en catch — presse strict"},{id:"goblet_heavy",nom:"Goblet Squat lourd",kb:"18 kg",reps:12,consigne:"Pause 2s en bas — talon dans le sol"},{id:"renegade_row",nom:"Renegade Row",kb:"12 kg",reps:"6/côté",consigne:"Corps gaîné — éviter la rotation"}]}},lt=e=>({...e,nom:e.nom+" (allégé)",tours:Math.max(e.tours-1,2),repos:e.repos+30,typeActivite:"kb_allege",dureeEstimee:Math.round(e.dureeEstimee*.75)}),ct=e=>({...e,nom:e.nom+" (2 tours)",tours:2,repos:e.repos+45,typeActivite:"kb_allege",dureeEstimee:Math.round(e.dureeEstimee*.55),messageMotivation:"2 tours comptent. Zéro ne compte pas."}),re={debutant:{id:"debutant",nom:"Débutant",periode:"Semaines 1-4",rounds:10,travail:30,repos:30,dureeEstimee:10,typeActivite:"corde_complete",toursEstimes:"150-200"},intermediaire:{id:"intermediaire",nom:"Intermédiaire",periode:"Semaines 5-8",rounds:12,travail:45,repos:30,dureeEstimee:18,typeActivite:"corde_complete",toursEstimes:"400-500"},avance:{id:"avance",nom:"Avancé",periode:"Mois 3+",rounds:15,travail:60,repos:20,dureeEstimee:20,typeActivite:"corde_complete",toursEstimes:"700-900"}},ut=e=>e>=12?re.avance:e>=5?re.intermediaire:re.debutant,oe=e=>e>=12?se.circuit3:e>=5?se.circuit2:se.circuit1,ae={circuitA:{id:"vacances_a",nom:"Force — Sans matériel",dureeEstimee:20,tours:3,repos:90,typeActivite:"vacances_a",pointsScore:22,exercices:["chaise_murale","bulgarian_split","planche_dead_stop","pike_push_up","superman_hold","pompe_mi_course","mountain_climbers"],messageMotivation:"Équivalent circuit KB — ton score est identique."},circuitC:{id:"vacances_c",nom:"Récupération active",dureeEstimee:10,typeActivite:"vacances_c",pointsScore:12,exercices:["superman_hold","hip_flexor","calf_raises"],messageMotivation:"10 minutes comptent. Zéro ne compte pas."}},dt=e=>e==="fatigue"?ae.circuitC:e==="moyen"?{...ae.circuitA,tours:2,typeActivite:"vacances_a_allege",pointsScore:14,nom:"Force allégé (2 tours)"}:ae.circuitA,Me=[{jours:1,titre:"24 heures",message:"Ta première journée. Le taux de monoxyde de carbone dans ton sang a déjà chuté.",couleur:"success"},{jours:3,titre:"3 jours",message:"La nicotine a quitté ton corps. Ce que tu ressens maintenant, c'est la guérison.",couleur:"success"},{jours:7,titre:"1 semaine",message:"Ton corps commence à récupérer le goût et l'odorat. Continue.",couleur:"success"},{jours:14,titre:"2 semaines",message:"Ta circulation sanguine s'améliore. Tes poumons travaillent mieux.",couleur:"success"},{jours:21,titre:"3 semaines",message:"Les pulsions s'espacent. Le pire est derrière toi.",couleur:"success"},{jours:30,titre:"1 mois",message:"Un mois. Tes poumons ont déjà commencé à se régénérer. C'est une victoire majeure.",couleur:"success"},{jours:60,titre:"2 mois",message:"Deux mois sans tabac. Ton souffle s'améliore semaine après semaine.",couleur:"success"},{jours:90,titre:"3 mois",message:"Trois mois. Le risque cardiovasculaire a déjà chuté de 50%. Tu t'es offert des années.",couleur:"success"},{jours:180,titre:"6 mois",message:"Six mois. Ton corps a réparé la plupart des dommages causés à tes cils bronchiques.",couleur:"success"},{jours:365,titre:"1 an",message:"Un an sans tabac. Le risque d'infarctus a diminué de moitié. Tu as changé ta vie.",couleur:"success"}],Le=e=>{const t=Me.filter(r=>r.jours<=e);return t.length?t[t.length-1]:null},pt=e=>Me.find(t=>t.jours>e)||null,Ee=e=>{if(!e)return 0;const t=new Date(e),r=new Date;return t.setHours(0,0,0,0),r.setHours(0,0,0,0),Math.max(0,Math.floor((r-t)/(24*60*60*1e3)))},mt=(e,t)=>{const a=2*Math.PI*72,i=Math.min(e/t,1.1),c=a*(1-Math.min(i,1)),n=e>t,l=n?"var(--color-alert)":"var(--color-success)",u=Math.round(e/t*100);return`
    <svg viewBox="0 0 192 192" class="caloric-gauge" aria-label="${e} sur ${t} kcal consommées">
      <circle cx="96" cy="96" r="72" fill="none" stroke="var(--color-border)" stroke-width="10"/>
      <circle cx="96" cy="96" r="72" fill="none"
        stroke="${l}" stroke-width="10"
        stroke-dasharray="${a.toFixed(2)}"
        stroke-dashoffset="${c.toFixed(2)}"
        stroke-linecap="round"
        transform="rotate(-90 96 96)"/>
      <text x="96" y="84" text-anchor="middle"
        fill="var(--color-text-primary)" font-family="var(--font-serif)"
        font-size="28" font-weight="600">${e}</text>
      <text x="96" y="106" text-anchor="middle"
        fill="var(--color-text-secondary)" font-family="var(--font-sans)" font-size="11">/ ${t} kcal</text>
      <text x="96" y="123" text-anchor="middle"
        fill="${n?"var(--color-alert)":"var(--color-text-secondary)"}"
        font-family="var(--font-sans)" font-size="10">${n?"Budget dépassé":`${u}% du budget`}</text>
    </svg>
  `},ie=(e,t,r,s,o)=>{const a=Math.min(t/r*100,100),i=t>r;return`
    <div class="macro-row">
      <div class="macro-header">
        <span class="macro-nom">${e}</span>
        <span class="macro-val" style="color:${i?"var(--color-alert)":s}">${t}<span class="macro-target">/${r}g</span></span>
      </div>
      <div class="macro-track">
        <div class="macro-fill" style="width:${a}%;background:${i?"var(--color-alert)":s}"></div>
      </div>
      ${o?`<p class="macro-label">${o}</p>`:""}
    </div>
  `},P=(e,t=3e3)=>{const r=document.querySelector(".toast");r&&r.remove();const s=document.createElement("div");s.className="toast animate-in",s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.style.opacity="0",setTimeout(()=>s.remove(),300)},t)},ue=(e,t)=>{var o;const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`<div class="modal-sheet">${e}</div>`,document.body.appendChild(r),requestAnimationFrame(()=>r.classList.add("visible"));const s=()=>{r.classList.remove("visible"),setTimeout(()=>{r.remove(),t==null||t()},300)};return r.addEventListener("click",a=>{a.target===r&&s()}),(o=r.querySelector("[data-close]"))==null||o.addEventListener("click",s),{overlay:r,close:s}},gt=e=>{var c;const t=Ie(),r=(t==null?void 0:t.poids)||120,s=(t==null?void 0:t.tourTaille)||115,o=Array.from({length:181},(n,l)=>(60+l*.5).toFixed(1)).map(n=>`<option value="${n}" ${parseFloat(n)===r?"selected":""}>${n} kg</option>`).join(""),a=Array.from({length:181},(n,l)=>(60+l*.5).toFixed(1)).map(n=>`<option value="${n}" ${parseFloat(n)===s?"selected":""}>${n} cm</option>`).join(""),{close:i}=ue(`
    <div class="modal-close-row">
      <h2 class="modal-title">Faire un point</h2>
      <button class="modal-close-btn" data-close>✕</button>
    </div>
    <p class="modal-sub">Optionnel — remplis ce que tu veux</p>
    <div class="form-group">
      <label class="form-label">Poids</label>
      <select id="mesure-poids">${o}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Tour de taille</label>
      <select id="mesure-taille">${a}</select>
    </div>
    <button class="btn-primary" id="save-mesure">Enregistrer</button>
  `,e);(c=document.querySelector("#save-mesure"))==null||c.addEventListener("click",()=>{const n=parseFloat(document.querySelector("#mesure-poids").value),l=parseFloat(document.querySelector("#mesure-taille").value);ze({poids:n,tourTaille:l}),i(),P("📏 Mesure enregistrée"),e==null||e()})},vt=(e,t,r,s)=>{var g,k;const o=Be(10);let a=null,i=100,c=!1;const n=Ge(),l=()=>`
      <div class="modal-close-row">
        <h2 class="modal-title">Ajouter un repas</h2>
        <button class="modal-close-btn" data-close>✕</button>
      </div>
      <div class="repas-mode-tabs">
        <button class="repas-tab ${c?"":"active"}" id="tab-search">Recherche</button>
        <button class="repas-tab ${c?"active":""}" id="tab-composer">Avec mes placards</button>
      </div>

      ${c?`
        <p class="modal-sub">Liste tes ingrédients disponibles</p>
        <textarea id="placards-input" placeholder="Œufs, lentilles, tomates, riz..." rows="3" style="width:100%;background:var(--color-surface-raised);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:var(--space-sm);color:var(--color-text-primary);font-size:var(--font-size-md);resize:none;"></textarea>
        <button class="btn-primary" id="composer-calc" style="margin-top:var(--space-sm)">Calculer les macros</button>
        <div id="composer-result" style="display:none;"></div>
      `:`
        <input type="search" id="aliment-search" placeholder="Poulet, riz, yaourt..." autocomplete="off"/>
        <div class="aliment-results" id="aliment-results">
          ${xe(ee("",o))}
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
        ${r?`<button class="btn-ghost" id="btn-repas-libre" style="margin-top:var(--space-md)">
          Ce repas est libre ${n<2?`(${2-n} restant${2-n>1?"s":""} cette sem.)`:"(limite atteinte)"}
        </button>`:""}
      `}
    `,{overlay:u,close:v}=ue(l(),s),b=()=>{var $,L,S;const m=u.querySelector("#aliment-search"),p=u.querySelector("#aliment-results"),h=u.querySelector("#aliment-selected");m==null||m.addEventListener("input",()=>{const M=ee(m.value,o);p&&(p.innerHTML=xe(M)),q()});const f=M=>{a=M,h.style.display="block",u.querySelector("#aliment-results").style.display="none",u.querySelector("#aliment-search").style.display="none",y()},q=()=>{u.querySelectorAll(".aliment-item").forEach(M=>{M.addEventListener("click",()=>{const A=nt(M.dataset.id);A&&f(A)})})};q(),($=u.querySelector("#quantite-input"))==null||$.addEventListener("input",M=>{i=parseInt(M.target.value)||100,y()}),(L=u.querySelector("#add-repas"))==null||L.addEventListener("click",()=>{if(!a)return;const M=te(a,i);T("repas",{nom:a.nom,grammes:i,...M,alimentId:a.id}),Oe(a.id),v(),P(`✓ ${a.nom} ajouté`),s==null||s()}),(S=u.querySelector("#btn-repas-libre"))==null||S.addEventListener("click",()=>{if(n>=2){P("Limite de 2 repas libres atteinte cette semaine");return}T("repas_libre",{note:"repas libre déclaré"}),v(),P("Repas libre déclaré"),s==null||s()})},y=()=>{if(!a)return;const m=te(a,i),p=u.querySelector("#nutrival-preview"),h=u.querySelector("#selected-info");h&&(h.innerHTML=`
      <strong>${a.nom}</strong>
      <p class="aliment-label">${a.label}</p>
    `),p&&(p.innerHTML=`
      <div class="nutrival-row">
        <span>${m.kcal} kcal</span>
        <span>${m.prot}g prot</span>
        <span>${m.lip}g lip</span>
        <span>${m.gluc}g gluc</span>
      </div>
      <p style="font-size:var(--font-size-xs);color:var(--color-text-secondary);margin-top:4px">
        Budget restant : ${Math.max(t-e.kcal-m.kcal,0)} kcal après
      </p>
    `)},x=()=>{var m;(m=u.querySelector("#composer-calc"))==null||m.addEventListener("click",()=>{var j,B,N;const f=(((j=u.querySelector("#placards-input"))==null?void 0:j.value)||"").split(/[,\n]+/).map(_=>_.trim().toLowerCase()).filter(Boolean).map(_=>ee(_).slice(0,1)[0]).filter(Boolean);if(!f.length){P("Aucun aliment reconnu — essaie des noms simples");return}Math.max(0,(((B=e.macros)==null?void 0:B.protTarget)||180)-(e.prot||0));const q=f.some(_=>_.categorie==="legumes");f.reduce((_,E)=>_+E.kcal,0);const $=Math.round(Math.min(400/f.length,200)),S=f.map(_=>{const E=te(_,$);return{..._,grammes:$,...E}}).reduce((_,E)=>({kcal:_.kcal+E.kcal,prot:_.prot+E.prot,lip:_.lip+E.lip,gluc:_.gluc+E.gluc}),{kcal:0,prot:0,lip:0,gluc:0}),M=[];q||M.push("Ajouter des épinards ou brocolis maximise ta satiété"),S.prot<25&&M.push("Ce repas est pauvre en protéines — ajouter des œufs ou du thon");const A=`
        <div class="composer-result-card">
          <p><strong>Avec ces ingrédients (${$}g chacun) :</strong></p>
          <div class="nutrival-row" style="margin-top:var(--space-sm)">
            <span>${Math.round(S.kcal)} kcal</span>
            <span>${Math.round(S.prot)}g prot</span>
            <span>${Math.round(S.lip)}g lip</span>
            <span>${Math.round(S.gluc)}g gluc</span>
          </div>
          ${M.map(_=>`<p class="composer-tip">💡 ${_}</p>`).join("")}
          <button class="btn-primary" id="save-composed" style="margin-top:var(--space-md)">Enregistrer ce repas</button>
        </div>
      `,O=u.querySelector("#composer-result");O&&(O.style.display="block",O.innerHTML=A),(N=u.querySelector("#save-composed"))==null||N.addEventListener("click",()=>{const _=f.map(E=>E.nom).join(", ");T("repas",{nom:`Compo: ${_}`,kcal:Math.round(S.kcal),prot:Math.round(S.prot),lip:Math.round(S.lip),gluc:Math.round(S.gluc)}),v(),P("✓ Repas composé enregistré"),s==null||s()})})};(g=u.querySelector("#tab-search"))==null||g.addEventListener("click",()=>{c=!1,u.querySelector(".modal-sheet").innerHTML=l(),b(),x(),d()}),(k=u.querySelector("#tab-composer"))==null||k.addEventListener("click",()=>{c=!0,u.querySelector(".modal-sheet").innerHTML=l(),b(),x(),d()});const d=()=>{var m,p,h;(m=u.querySelector("[data-close]"))==null||m.addEventListener("click",v),u.addEventListener("click",f=>{f.target===u&&v()}),(p=u.querySelector("#tab-search"))==null||p.addEventListener("click",()=>{c=!1,u.querySelector(".modal-sheet").innerHTML=l(),b(),x(),d()}),(h=u.querySelector("#tab-composer"))==null||h.addEventListener("click",()=>{c=!0,u.querySelector(".modal-sheet").innerHTML=l(),b(),x(),d()})};b(),x()},xe=e=>e.map(t=>`
  <div class="aliment-item" data-id="${t.id}" role="button">
    <div>
      <span class="aliment-nom">${t.nom}</span>
      <span class="aliment-kcal">${t.kcal} kcal/100g</span>
    </div>
    <p class="aliment-label">${t.label}</p>
  </div>
`).join(""),bt=(e,t,r)=>{const s=Fe?Math.floor((new Date-new Date(localStorage.getItem("first_launch_date")||new Date))/6048e5):0,o=Y("modeVacances",!1),a=`
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
  `,{overlay:i,close:c}=ue(a,t),n=l=>{var y,x,d,g;const u=o?dt(l):l==="enforme"?oe(s):l==="moyen"?lt(oe(s)):ct(oe(s)),v=ut(s),b=l==="fatigue"?'<p class="forme-msg">"2 tours comptent. Zéro ne compte pas."</p>':"";i.querySelector(".modal-sheet").innerHTML=`
      <div class="modal-close-row">
        <h2 class="modal-title">Quelle activité ?</h2>
        <button class="modal-close-btn" data-close>✕</button>
      </div>
      ${b}
      <div class="activite-choices">
        <button class="activite-btn" id="btn-kb">
          <span class="activite-icon">🏋️</span>
          <div>
            <strong>${u.nom}</strong>
            <p class="activite-sub">~${u.dureeEstimee} min · ${u.tours||3} tours</p>
          </div>
        </button>
        ${o?"":`
        <button class="activite-btn" id="btn-corde">
          <span class="activite-icon">🪢</span>
          <div>
            <strong>Corde à sauter — ${v.nom}</strong>
            <p class="activite-sub">~${v.dureeEstimee} min · ${v.rounds} rounds</p>
          </div>
        </button>
        `}
        <button class="activite-btn" id="btn-marche">
          <span class="activite-icon">🚶</span>
          <div>
            <strong>Marche libre</strong>
            <p class="activite-sub">Durée libre — compte toujours</p>
          </div>
        </button>
      </div>
      <button data-close class="btn-ghost">Annuler</button>
    `,(y=i.querySelector("[data-close]"))==null||y.addEventListener("click",c),(x=i.querySelector("#btn-kb"))==null||x.addEventListener("click",()=>{c(),$e(u,e,r,t)}),(d=i.querySelector("#btn-corde"))==null||d.addEventListener("click",()=>{c(),$e(v,e,r,t)}),(g=i.querySelector("#btn-marche"))==null||g.addEventListener("click",()=>{c(),ft(e,r,t)})};i.querySelectorAll(".forme-btn").forEach(l=>{l.addEventListener("click",()=>n(l.dataset.forme))})};let R=null;const ht=(e,t=.25,r=.4)=>{try{const s=new(window.AudioContext||window.webkitAudioContext),o=s.createOscillator(),a=s.createGain();o.connect(a),a.connect(s.destination),o.type="sine",o.frequency.value=e,a.gain.setValueAtTime(t,s.currentTime),a.gain.exponentialRampToValueAtTime(.001,s.currentTime+r),o.start(s.currentTime),o.stop(s.currentTime+r)}catch{}},$e=(e,t,r,s)=>{const o=e.exercices||[],a=e.repos||75,i=e.tours||3;let c=0,n=!1;o.length;const l=[];for(let p=1;p<=i;p++)o.forEach(h=>{l.push({type:"exercice",tour:p,exercise:h})}),p<i&&l.push({type:"repos",tour:p,duree:a});let u=0,v=0,b=0;const y=()=>l[u]||null,x=p=>p.type==="repos"?p.duree:p.exercise.duree||45,d=document.createElement("div");d.className="sport-timer-overlay",document.body.appendChild(d);const g=()=>{const p=y();if(!p){m();return}v=x(p),b=0,ht(p.type==="repos"?330:660),k()},k=()=>{var A,O,j,B;const p=y();if(!p)return;const h=v-b;let f,q,$;p.type==="repos"?(f="REPOS",q="Récupération",$=`Tour ${p.tour} terminé`):(f=`TOUR ${p.tour} / ${i}`,q=p.exercise.nom,$=`${p.exercise.reps||`${p.exercise.duree}s`} · ${p.exercise.kb||""}`);const L=u/l.length*100,S=b/v*100,M=2*Math.PI*60;d.innerHTML=`
      <div class="sport-timer-screen">
        <div class="sport-timer-top">
          <span class="sport-phase-label" style="color:${p.type==="repos"?"var(--color-water)":"var(--color-success)"}">${f}</span>
          <span class="sport-total-time">${je(c)}</span>
        </div>

        <div class="sport-timer-center">
          <svg viewBox="0 0 140 140" class="sport-timer-svg">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-border)" stroke-width="6"/>
            <circle cx="70" cy="70" r="60" fill="none"
              stroke="${p.type==="repos"?"var(--color-water)":"var(--color-success)"}"
              stroke-width="6"
              stroke-dasharray="${M.toFixed(1)}"
              stroke-dashoffset="${(M*(1-S/100)).toFixed(1)}"
              stroke-linecap="round"
              transform="rotate(-90 70 70)"/>
            <text x="70" y="65" text-anchor="middle"
              fill="var(--color-text-primary)" font-family="var(--font-serif)"
              font-size="32" font-weight="600">${h}</text>
            <text x="70" y="84" text-anchor="middle"
              fill="var(--color-text-secondary)" font-family="var(--font-sans)" font-size="10">secondes</text>
          </svg>
        </div>

        <div class="sport-exercise-info">
          <p class="sport-exercise-name">${q}</p>
          <p class="sport-exercise-sub">${$}</p>
          ${p.type==="exercice"&&p.exercise.consigne?`<p class="sport-consigne">${p.exercise.consigne}</p>`:""}
        </div>

        <!-- Progress bar total -->
        <div class="sport-progress-total">
          <div class="sport-progress-fill" style="width:${L}%"></div>
        </div>

        <!-- Next up -->
        ${l[u+1]?`
          <p class="sport-next">Ensuite : ${l[u+1].type==="repos"?"Repos":(A=l[u+1].exercise)==null?void 0:A.nom}</p>
        `:""}

        <div class="sport-timer-btns">
          <button class="sport-pause-btn" id="timer-pause">${n?"▶ Reprendre":"⏸ Pause"}</button>
          <button class="sport-skip-btn" id="timer-skip">⏭ Passer</button>
          <button class="sport-stop-btn" id="timer-stop">Arrêter</button>
        </div>
      </div>
    `,(O=d.querySelector("#timer-pause"))==null||O.addEventListener("click",()=>{n=!n}),(j=d.querySelector("#timer-skip"))==null||j.addEventListener("click",()=>{u++,g()}),(B=d.querySelector("#timer-stop"))==null||B.addEventListener("click",()=>{m(!0)})};R=setInterval(()=>{n||(b++,c++,b>=v?(u++,g()):k())},1e3);const m=(p=!1)=>{var q,$;R&&(clearInterval(R),R=null);const h=Math.round(c/60),f=_e(e.typeActivite||"kb_complet",h,(t==null?void 0:t.poids)||120);d.innerHTML=`
      <div class="sport-finish-screen">
        <p class="finish-emoji">🏆</p>
        <p class="finish-title">${p?"Séance terminée":"Séance complète !"}</p>
        <div class="finish-stats">
          <div class="finish-stat"><span>${h}</span><span>min</span></div>
          <div class="finish-stat"><span>~${f}</span><span>kcal</span></div>
        </div>
        <button class="btn-primary" id="finish-save">Enregistrer</button>
        <button class="btn-ghost" id="finish-discard">Annuler</button>
      </div>
    `,(q=d.querySelector("#finish-save"))==null||q.addEventListener("click",()=>{T("sport",{activite:e.typeActivite||"kb_complet",nom:e.nom,duree:h,calories:f,tours:u}),qe(),d.remove(),P(`💪 ${h} min enregistrées — ${f} kcal`),s==null||s()}),($=d.querySelector("#finish-discard"))==null||$.addEventListener("click",()=>{d.remove()})};g()},ft=(e,t,r)=>{let s=0,o=!1;const a=document.createElement("div");a.className="sport-timer-overlay",document.body.appendChild(a);const i=()=>{var n,l;a.innerHTML=`
      <div class="sport-timer-screen">
        <p class="sport-phase-label" style="color:var(--color-success)">🚶 MARCHE</p>
        <div class="sport-timer-center">
          <svg viewBox="0 0 140 140" class="sport-timer-svg">
            <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-border)" stroke-width="6"/>
            <text x="70" y="68" text-anchor="middle" fill="var(--color-text-primary)" font-family="var(--font-serif)" font-size="28" font-weight="600">${je(s)}</text>
            <text x="70" y="86" text-anchor="middle" fill="var(--color-success)" font-family="var(--font-sans)" font-size="10">EN COURS</text>
          </svg>
        </div>
        <p class="sport-consigne" style="text-align:center">Marche à ton rythme — l'essentiel est d'être dehors.</p>
        <div class="sport-timer-btns">
          <button class="sport-pause-btn" id="timer-pause">${o?"▶ Reprendre":"⏸ Pause"}</button>
          <button class="sport-stop-btn" id="timer-stop">Terminer</button>
        </div>
      </div>
    `,(n=a.querySelector("#timer-pause"))==null||n.addEventListener("click",()=>{o=!o,i()}),(l=a.querySelector("#timer-stop"))==null||l.addEventListener("click",c)},c=()=>{clearInterval(R);const n=Math.round(s/60),l=_e("marche",n,(e==null?void 0:e.poids)||120);T("sport",{activite:"marche",nom:"Marche",duree:n,calories:l}),qe(),a.remove(),P(`🚶 ${n} min de marche — ${l} kcal`),r==null||r()};R=setInterval(()=>{o||(s++,i())},1e3),i()},je=e=>{const t=Math.floor(e/60),r=e%60;return`${t}:${r.toString().padStart(2,"0")}`},Ce=(e,t,r={})=>{var N,_,E,pe,me,ge,ve,be;r.toast&&P(r.toast);const s=ce();if(!s){e.innerHTML='<div class="screen-inner"><p>Chargement…</p></div>';return}const{budget:o,macros:a}=le(s),i=ot(),c=at(i),n=He(),l=Ee(s.dateArret),u=Le(l),v=Math.floor((new Date-new Date(localStorage.getItem("first_launch_date")||new Date))/(7*24*60*60*1e3)),b=fe(),y=b.filter(w=>w.type==="repas"),x=b.filter(w=>w.type==="hydratation"),d=x.length&&x[x.length-1].verres||0,g=y.reduce((w,D)=>({kcal:w.kcal+(D.kcal||0),prot:w.prot+(D.prot||0),lip:w.lip+(D.lip||0),gluc:w.gluc+(D.gluc||0)}),{kcal:0,prot:0,lip:0,gluc:0}),k=Y("modeAlimentation","repas")==="repas",m=b.some(w=>w.type==="journee_libre"),p=Y("modeVacances",!1),h=Re(),f=h&&new Date-h<30*60*1e3,q=X(),$=q.length?q[q.length-1]:null,L=$?Math.floor((new Date-new Date($.created_at))/(24*60*60*1e3)):999,S=L>=18,M=w=>`<svg width="28" height="36" viewBox="0 0 28 36" fill="none" style="color:${w?"var(--color-water)":"var(--color-border)"}"><path d="M14 2 C14 2 2 16 2 23 C2 30 7.4 34 14 34 C20.6 34 26 30 26 23 C26 16 14 2 14 2Z" fill="currentColor"/></svg>`,A=Array.from({length:5},(w,D)=>M(D<d)).join(""),O=d>5?`<span class="hydra-overflow">+${d-5}</span>`:"";e.innerHTML=`
    <div class="screen-inner">
      ${p?'<div class="mode-badge">🏖 Mode Vacances actif</div>':""}

      <!-- Score + Palier -->
      <section class="score-section">
        <div class="score-main">
          <span class="score-number" style="color:${c.color}">${i}</span>
          <div class="score-details">
            <span class="score-zone" style="color:${c.color}">${c.zone}</span>
            <span class="score-streak">${n>0?`🔥 ${n} jour${n>1?"s":""}`:""}</span>
            <span class="score-tabac" style="color:var(--color-text-secondary)">Jour ${l} sans tabac</span>
          </div>
        </div>
        ${u?`<p class="score-palier animate-in" style="color:var(--color-success)">✓ ${u.titre} — "${u.message}"</p>`:""}
        <p class="score-msg" style="color:var(--color-text-secondary)">${c.message}</p>
      </section>

      ${f?`
        <div class="post-workout-banner animate-in">
          <span>⚡ Fenêtre idéale : mange 30g de protéines maintenant.</span>
          <span class="post-workout-sub">Œufs, fromage blanc, jambon, thon</span>
        </div>
      `:""}

      <!-- Jauge calorique -->
      ${m?`
        <section class="card journee-libre-card">
          <p class="journee-libre-label">✨ Journée libre — Profitez. Revenez demain.</p>
        </section>
      `:`
        <section class="card gauge-section">
          <div class="gauge-wrapper">
            ${mt(Math.round(g.kcal),o)}
          </div>
        </section>

        <!-- Macros -->
        <section class="card macros-section">
          ${ie("Protéines",Math.round(g.prot),a.proteines,"var(--color-success)",v>=3?Q("proteines",v):null)}
          ${ie("Lipides",Math.round(g.lip),a.lipides,"var(--color-water)",v>=3?Q("lipides",v):null)}
          ${ie("Glucides",Math.round(g.gluc),a.glucides,"var(--color-alert)",v>=3?Q("glucides",v):null)}
        </section>
      `}

      <!-- Hydratation -->
      <section class="card hydra-section">
        <div class="hydra-row">
          <div class="hydra-drops">${A}${O}</div>
          <span class="hydra-count" style="color:var(--color-water)">${d}</span>
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
          <span>Faire un point${S?" ·":""}</span>
          ${S?'<span class="mesure-dot"></span>':""}
        </button>
        <button class="action-btn action-btn-wide" id="btn-sport">
          <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 9l1.5 6M13 9l-1.5 6M5 9h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Séance sport</span>
        </button>
        ${!m&&Y("modeAlimentation")==="journee"?`
          <button class="action-btn action-btn-wide" id="btn-journee-libre">
            <svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
            <span>Journée libre</span>
          </button>
        `:""}
      </div>

      ${S?`
        <p class="mesure-suggestion">Ça fait ${L} jours — si tu veux faire un point c'est le bon moment.</p>
      `:""}
    </div>
  `;const j=()=>Ce(e,t,{}),B=w=>{const U=fe().find(G=>G.type==="hydratation");if(U){const G=V(),he=G.findIndex(Ae=>Ae.id===U.id);he>=0&&(G[he].verres=w,localStorage.setItem("logs",JSON.stringify(G)))}else T("hydratation",{verres:w})};(N=e.querySelector(".hydra-section"))==null||N.addEventListener("click",w=>{w.target.closest("#btn-hydra-reset")||(B(d+1),j())}),(_=e.querySelector("#btn-hydra-reset"))==null||_.addEventListener("click",()=>{B(0),j()}),(E=e.querySelector("#btn-sos"))==null||E.addEventListener("click",()=>t("D",{type:"tabac"})),(pe=e.querySelector("#btn-repas"))==null||pe.addEventListener("click",()=>vt(g,o,k,j)),(me=e.querySelector("#btn-zepp"))==null||me.addEventListener("click",async()=>{const w=e.querySelector("#btn-zepp");w&&(w.textContent="⏳");const{syncZepp:D}=await Qe(async()=>{const{syncZepp:U}=await import("./zepp-DeSmgAwf.js");return{syncZepp:U}},[]);await D(),w&&(w.innerHTML='<svg class="action-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9a6 6 0 1 1 1.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 13V9h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Synchro</span>'),P("⌚ Données Amazfit synchronisées")}),(ge=e.querySelector("#btn-mesure"))==null||ge.addEventListener("click",()=>gt(j)),(ve=e.querySelector("#btn-sport"))==null||ve.addEventListener("click",()=>bt(s,j,t)),(be=e.querySelector("#btn-journee-libre"))==null||be.addEventListener("click",()=>{T("journee_libre",{}),P("✨ Journée libre déclarée"),j()})},yt={repas:{emoji:"🍽",label:"Repas",color:"var(--color-success)"},repas_libre:{emoji:"✨",label:"Repas libre",color:"var(--color-water)"},journee_libre:{emoji:"✨",label:"Journée libre",color:"var(--color-water)"},ecart_petit:{emoji:"🍪",label:"Petit écart",color:"var(--color-text-secondary)"},ecart_gros:{emoji:"🍕",label:"Écart déclaré",color:"var(--color-text-secondary)"},sport:{emoji:"🏋️",label:"Séance sport",color:"var(--color-success)"},pulsion:{emoji:"🫁",label:"Pulsion",color:"var(--color-alert)"},hydratation:{emoji:"💧",label:"Hydratation",color:"var(--color-water)"},mesure:{emoji:"📏",label:"Mesure corporelle",color:"var(--color-text-secondary)"},zepp_sync:{emoji:"⌚",label:"Synchro Amazfit",color:"var(--color-text-secondary)"}},kt=e=>new Date(e).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),xt=e=>{const t=new Date(e),r=new Date,s=new Date(r);s.setDate(r.getDate()-1);const o=t.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});return t.toDateString()===r.toDateString()?"Aujourd'hui":t.toDateString()===s.toDateString()?"Hier":o.charAt(0).toUpperCase()+o.slice(1)},$t=e=>{const t=yt[e.type]||{emoji:"•",label:e.type,color:"var(--color-text-secondary)"};let r="";if(e.type==="repas"){const s=[];e.kcal&&s.push(`${e.kcal} kcal`),e.prot&&s.push(`${e.prot}g prot`),e.nom&&(r=`<span class="log-name">${e.nom}</span>`),s.length&&(r+=`<span class="log-macros">${s.join(" · ")}</span>`)}else if(e.type==="sport"){const s=[];e.activite&&s.push(e.activite.replace(/_/g," ")),e.duree&&s.push(`${e.duree} min`),e.calories&&s.push(`~${e.calories} kcal`),r=`<span class="log-macros">${s.join(" · ")}</span>`}else if(e.type==="pulsion"){const s=e.resiste?"✓ Résistée":"✗ Craquage";r=`<span class="log-macros" style="color:${e.resiste?"var(--color-success)":"var(--color-alert)"}">${s}</span>`,e.sousType==="alimentaire"&&(t.emoji="🍫")}else if(e.type==="hydratation")r=`<span class="log-macros">${e.verres||0} verres · ${(e.verres||0)*50} cl</span>`;else if(e.type==="mesure"){const s=[];e.poids&&s.push(`${e.poids} kg`),e.tourTaille&&s.push(`Tour de taille : ${e.tourTaille} cm`),r=`<span class="log-macros">${s.join(" · ")}</span>`}else(e.type==="journee_libre"||e.type==="repas_libre")&&(r='<span class="log-macros" style="color:var(--color-water)">Déclaré — score non impacté</span>');return`
    <div class="log-entry animate-in" data-id="${e.id}">
      <span class="log-emoji">${t.emoji}</span>
      <div class="log-content">
        <span class="log-label" style="color:${t.color}">${t.label}</span>
        ${r}
      </div>
      <span class="log-time">${kt(e.created_at)}</span>
    </div>
  `},St=e=>{const t={};return e.forEach(r=>{const s=r.created_at.slice(0,10);t[s]||(t[s]=[]),t[s].push(r)}),t},wt=(e,t)=>{var o;const r=it(),s=document.createElement("div");s.className="modal-overlay visible",s.innerHTML=`
    <div class="modal-sheet">
      <h2 class="modal-title">Rapport de la semaine</h2>
      <div class="report-grid">
        <div class="report-stat">
          <span class="report-num">${r.seances}</span>
          <span class="report-label">séances</span>
        </div>
        <div class="report-stat">
          <span class="report-num" style="color:var(--color-success)">${r.resistees}</span>
          <span class="report-label">pulsions résistées</span>
        </div>
        ${r.craquages>0?`
        <div class="report-stat">
          <span class="report-num" style="color:var(--color-alert)">${r.craquages}</span>
          <span class="report-label">déclarés honnêtement</span>
        </div>`:""}
      </div>
      <p class="report-feedback">"${r.feedback}"</p>
      <button class="btn-primary" id="close-report">Continuer</button>
    </div>
  `,e.appendChild(s),(o=s.querySelector("#close-report"))==null||o.addEventListener("click",()=>{ye(),s.remove()}),s.addEventListener("click",a=>{a.target===s&&(ye(),s.remove())})},qt=(e,t,r={})=>{let s="today";const o=()=>{const a=I(s==="today"?1:s==="week"?7:30),i=St(a),c=Object.keys(i).sort((l,u)=>u.localeCompare(l)),n=c.length===0;e.innerHTML=`
      <div class="screen-inner">
        <header class="screen-header">
          <h1 class="screen-title">Journal de bord</h1>
        </header>

        <div class="filter-tabs">
          <button class="filter-tab ${s==="today"?"active":""}" data-filter="today">Aujourd'hui</button>
          <button class="filter-tab ${s==="week"?"active":""}" data-filter="week">Cette semaine</button>
          <button class="filter-tab ${s==="month"?"active":""}" data-filter="month">Ce mois</button>
        </div>

        ${n?`
          <div class="empty-state">
            <p class="empty-icon">📋</p>
            <p class="empty-msg">Aucune entrée pour cette période.</p>
            <p class="empty-sub">Déclare un repas ou une séance depuis le dashboard.</p>
          </div>
        `:c.map(l=>`
          <div class="log-day-group">
            <div class="log-day-header">${xt(l+"T12:00:00")}</div>
            <div class="log-day-entries">
              ${i[l].map($t).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `,e.querySelectorAll(".filter-tab").forEach(l=>{l.addEventListener("click",()=>{s=l.dataset.filter,o()})})};o(),Ve()&&wt(e)},_t=e=>{if(e.length<2)return"";let t=`M ${e[0].x.toFixed(1)} ${e[0].y.toFixed(1)}`;for(let r=1;r<e.length;r++){const s=e[r-1],o=e[r],a=(o.x-s.x)/2.5,i=s.x+a,c=s.y,n=o.x-a,l=o.y;t+=` C ${i.toFixed(1)} ${c.toFixed(1)}, ${n.toFixed(1)} ${l.toFixed(1)}, ${o.x.toFixed(1)} ${o.y.toFixed(1)}`}return t},K=(e,t={})=>{const{width:r=320,height:s=160,paddingX:o=24,paddingY:a=20}=t,i=r-o*2,c=s-a*2;if(!e.length||!e[0].points.length)return`<svg viewBox="0 0 ${r} ${s}" class="chart-svg">
      <text x="${r/2}" y="${s/2}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12">Données insuffisantes</text>
    </svg>`;const n=e.flatMap(h=>h.points.map(f=>f.y)),l=Math.min(...n),u=Math.max(...n),v=u-l||1,b=e.flatMap(h=>h.points.map(f=>f.x)),y=Math.min(...b),d=Math.max(...b)-y||1,g=(h,f)=>({x:o+(h-y)/d*i,y:a+c-(f-l)/v*c});let k="",m="";e.forEach(h=>{const f=h.points.map($=>g($.x,$.y)),q=_t(f);k+=`<path d="${q}" fill="none" stroke="${h.color}" stroke-width="2" stroke-linecap="round"/>`,f.forEach(($,L)=>{m+=`<circle cx="${$.x.toFixed(1)}" cy="${$.y.toFixed(1)}" r="3" fill="${h.color}" opacity="0.8">
        <title>${h.points[L].label||""}</title>
      </circle>`})});const p=[l,l+v/2,u].map(h=>{const{y:f}=g(y,h);return`<text x="${o-4}" y="${f.toFixed(1)}" text-anchor="end" fill="var(--color-text-secondary)" font-size="9" dominant-baseline="middle">${Math.round(h)}</text>`}).join("");return`
    <svg viewBox="0 0 ${r} ${s}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      <!-- Grid -->
      <line x1="${o}" y1="${a}" x2="${o}" y2="${a+c}" stroke="var(--color-border)" stroke-width="1"/>
      <line x1="${o}" y1="${a+c}" x2="${o+i}" y2="${a+c}" stroke="var(--color-border)" stroke-width="1"/>
      ${p}
      ${k}
      ${m}
    </svg>
  `},Mt=(e,t={})=>{const{width:r=320,height:s=120,paddingX:o=8,paddingY:a=16}=t,i=r-o*2,c=s-a*2,n=e.length;if(!n)return`<svg viewBox="0 0 ${r} ${s}" class="chart-svg"><text x="${r/2}" y="${s/2}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12">Aucune donnée</text></svg>`;const l=Math.max(...e.map(y=>y.value),1),u=i/n,v=e.map((y,x)=>{const d=Math.max(y.value/l*c,2),g=o+x*u+u*.15,k=a+c-d,m=u*.7;return`<rect x="${g.toFixed(1)}" y="${k.toFixed(1)}" width="${m.toFixed(1)}" height="${d.toFixed(1)}" rx="2"
      fill="${y.color||"var(--color-alert)"}" opacity="${y.value>0?.85:.2}">
      <title>${y.label}: ${y.value}</title>
    </rect>`}).join(""),b=e.map((y,x)=>y.label?`<text x="${(o+x*u+u/2).toFixed(1)}" y="${(a+c+12).toFixed(1)}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="8">${y.label}</text>`:"").filter((y,x)=>x%Math.ceil(n/8)===0).join("");return`<svg viewBox="0 0 ${r} ${s+14}" class="chart-svg">${v}${b}</svg>`},Lt=(e,t,r={})=>{const s=ce();if(!s){e.innerHTML=`<div class="screen-inner"><p class="empty-msg">Configure ton profil d'abord.</p></div>`;return}const o=Ee(s.dateArret),a=Le(o),i=pt(o),c=X().sort((d,g)=>new Date(d.created_at)-new Date(g.created_at)),n=I(30),l=n.filter(d=>d.type==="pulsion"),u=[];for(let d=29;d>=0;d--){const g=new Date;g.setDate(g.getDate()-d);const m=n.filter(p=>p.created_at.slice(0,10)===g.toISOString().slice(0,10)).length>0;u.push({x:30-d,y:m?Math.random()*30+55:null,label:g.toLocaleDateString("fr-FR",{day:"numeric",month:"short"})})}const v=Array.from({length:24},(d,g)=>({label:g%3===0?`${g}h`:"",value:l.filter(k=>new Date(k.created_at).getHours()===g).length,color:"var(--color-alert)"})),b=c.filter(d=>d.poids).map((d,g)=>({x:g,y:d.poids,label:`${d.poids} kg — ${new Date(d.created_at).toLocaleDateString("fr-FR")}`})),y=c.filter(d=>d.tourTaille).map((d,g)=>({x:g,y:d.tourTaille,label:`${d.tourTaille} cm`})),x=u.filter(d=>d.y!==null).map(d=>({x:d.x,y:d.y,label:`Score: ${Math.round(d.y)} — ${d.label}`}));e.innerHTML=`
    <div class="screen-inner">
      <header class="screen-header">
        <h1 class="screen-title">Analyse</h1>
      </header>

      <!-- Sevrage tabac -->
      <section class="card" style="border-color: var(--color-success); border-width:1px; border-style:solid;">
        <div class="sevrage-header">
          <div>
            <span class="sevrage-days" style="font-family:var(--font-serif);font-size:var(--font-size-2xl);color:var(--color-success)">${o}</span>
            <span class="sevrage-label" style="color:var(--color-text-secondary)"> jours sans tabac</span>
          </div>
          ${a?`<p class="sevrage-palier" style="color:var(--color-success);font-size:var(--font-size-sm)">${a.titre} ✓</p>`:""}
        </div>
        ${a?`<p class="sevrage-msg" style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin-top:var(--space-sm)">"${a.message}"</p>`:""}
        ${i?`
          <div style="margin-top:var(--space-sm);padding-top:var(--space-sm);border-top:1px solid var(--color-border)">
            <p style="color:var(--color-text-secondary);font-size:var(--font-size-xs)">
              Prochain palier : <strong style="color:var(--color-text-primary)">${i.titre}</strong> dans ${i.jours-o} jour${i.jours-o>1?"s":""}
            </p>
          </div>
        `:""}
      </section>

      <!-- Score équilibre 30j -->
      <section class="card hide-night">
        <h2 class="card-title">Score Équilibre — 30 jours</h2>
        <div class="chart-container" id="score-chart-container">
          ${x.length>=3?K([{points:x,color:"var(--color-success)"}],{height:130}):`<p class="chart-empty">Données insuffisantes — continue à utiliser l'app</p>`}
        </div>
      </section>

      <!-- Poids -->
      <section class="card">
        <h2 class="card-title">Évolution du poids</h2>
        <div class="chart-container" id="poids-chart-container">
          ${b.length>=2?K([{points:b,color:"var(--color-success)"}],{height:130}):`<div class="chart-empty-cta">
                <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm)">Aucune mesure enregistrée.</p>
                <p style="color:var(--color-text-secondary);font-size:var(--font-size-xs);margin-top:4px">Utilise "Faire un point" sur le dashboard.</p>
              </div>`}
        </div>
        ${c.length&&c[c.length-1].poids?`
          <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);margin-top:var(--space-sm)">
            Dernier relevé : <strong style="color:var(--color-text-primary)">${c[c.length-1].poids} kg</strong>
            ${s.poidsObjectif?`· Objectif : ${s.poidsObjectif} kg · Écart : ${(c[c.length-1].poids-s.poidsObjectif).toFixed(1)} kg`:""}
          </p>
        `:""}
      </section>

      <!-- Tour de taille -->
      <section class="card">
        <h2 class="card-title">Tour de taille</h2>
        <div class="chart-container">
          ${y.length>=2?K([{points:y,color:"var(--color-water)"}],{height:120}):'<p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);padding:var(--space-md) 0">Enregistre tes mesures depuis le dashboard.</p>'}
        </div>
      </section>

      <!-- Corrélation tabac / pulsions alimentaires -->
      <section class="card hide-night">
        <h2 class="card-title">Tabac & pulsions alimentaires</h2>
        ${o>=7?`
          <div class="chart-container">
            ${(()=>{const d=[],g=[];for(let k=0;k<=Math.min(Math.floor(o/7),8);k++){const m=new Date;m.setDate(m.getDate()-(8-k)*7);const p=Math.max(0,o-(8-k)*7),h=l.filter(f=>{const q=new Date(f.created_at);return Math.floor((new Date-q)/(7*24*60*60*1e3))===8-k&&f.sousType==="alimentaire"}).length;d.push({x:k,y:p,label:`S${k}: ${p}j sans tabac`}),g.push({x:k,y:h,label:`S${k}: ${h} pulsions alim.`})}return K([{points:d,color:"var(--color-success)"},{points:g,color:"var(--color-alert)"}],{height:130})})()}
          </div>
          <div style="display:flex;gap:var(--space-md);margin-top:var(--space-sm)">
            <span style="font-size:var(--font-size-xs);color:var(--color-success)">─ Jours sans tabac</span>
            <span style="font-size:var(--font-size-xs);color:var(--color-alert)">─ Pulsions alimentaires/sem.</span>
          </div>
        `:`<p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);padding:var(--space-sm) 0">Disponible après 7 jours d'arrêt.</p>`}
      </section>

      <!-- Cartographie pulsions -->
      <section class="card hide-night">
        <h2 class="card-title">Pulsions par heure — 7 jours</h2>
        ${l.length?`
          <div class="chart-container">
            ${Mt(v,{height:100})}
          </div>
          <p style="color:var(--color-text-secondary);font-size:var(--font-size-xs);margin-top:var(--space-xs)">Identifie tes heures critiques pour les anticiper.</p>
        `:'<p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);padding:var(--space-sm) 0">Déclare tes pulsions pour voir les tendances.</p>'}
      </section>
    </div>
  `,requestAnimationFrame(()=>{["score-chart-container","poids-chart-container"].forEach(d=>{const g=e.querySelector(`#${d}`);if(!g||!g.querySelector("svg"))return;g.getBoundingClientRect().width>0&&g.querySelector("svg").setAttribute("width","100%")})})};let Z=null,F=null;const Pe=async()=>{if("wakeLock"in navigator)try{Z=await navigator.wakeLock.request("screen")}catch{}},Et=async()=>{Z&&(await Z.release(),Z=null)};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&F&&Pe()});const z=()=>{F&&(clearInterval(F),F=null),Et()},ne=(e,t=.2,r=.5)=>{try{const s=new(window.AudioContext||window.webkitAudioContext),o=s.createOscillator(),a=s.createGain();o.connect(a),a.connect(s.destination),o.type="sine",o.frequency.value=e,a.gain.setValueAtTime(t,s.currentTime),a.gain.exponentialRampToValueAtTime(.001,s.currentTime+r),o.start(s.currentTime),o.stop(s.currentTime+r)}catch{}},jt=(e,t,r={})=>{var h,f,q,$,L;z();const s=r.type||"tabac",o=s==="tabac"?180:120;let a=o,i="inspire",c=0;const n=5,l=s==="tabac"?{emoji:"🫁",titre:"Résister à la pulsion",couleur:"var(--color-alert)",instruction:"Buvez un grand verre d'eau glacée"}:{emoji:"🍫",titre:"Pulsion alimentaire",couleur:"var(--color-water)",instruction:"Tu as faim, ou tu t'ennuies ?"};e.innerHTML=`
    <div class="sos-screen" id="sos-screen">
      <div class="sos-header">
        <button class="sos-back-btn" id="sos-back" aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="var(--color-text-secondary)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <span class="sos-type">${l.emoji} ${l.titre}</span>
        <div style="width:40px"></div>
      </div>

      <div class="sos-body">
        <div class="sos-timer-ring">
          <svg viewBox="0 0 220 220" class="sos-svg">
            <!-- Cercle respiratoire animé -->
            <circle class="breathe-outer" cx="110" cy="110" r="95"
              fill="none" stroke="${l.couleur}" stroke-width="1" opacity="0.15"/>
            <circle class="breathe-ring" cx="110" cy="110" r="78"
              fill="none" stroke="${l.couleur}" stroke-width="3" opacity="0.3"/>
            <!-- Arc de progression timer -->
            <circle class="timer-track" cx="110" cy="110" r="95"
              fill="none" stroke="var(--color-border)" stroke-width="4"/>
            <circle class="timer-arc" id="timer-arc" cx="110" cy="110" r="95"
              fill="none" stroke="${l.couleur}" stroke-width="4"
              stroke-dasharray="${2*Math.PI*95}"
              stroke-dashoffset="${2*Math.PI*95}"
              stroke-linecap="round"
              transform="rotate(-90 110 110)"/>
            <!-- Cercle central -->
            <circle cx="110" cy="110" r="60" fill="var(--color-surface)"/>
            <!-- Texte timer -->
            <text id="timer-text" x="110" y="105" text-anchor="middle"
              fill="var(--color-text-primary)" font-family="Cormorant Garamond, serif"
              font-size="36" font-weight="600">${Se(o)}</text>
            <text id="phase-text" x="110" y="130" text-anchor="middle"
              fill="${l.couleur}" font-family="Inter, sans-serif"
              font-size="11" letter-spacing="2">INSPIRE</text>
          </svg>
        </div>

        <p class="sos-instruction" id="sos-instruction">${l.instruction}</p>

        <div class="sos-pause-row">
          <button class="sos-pause-btn" id="sos-pause">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" id="pause-icon">
              <rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
              <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
            </svg>
            Pause
          </button>
        </div>

        ${s==="alimentaire"?`
          <div class="sos-hunger-choice" id="hunger-choice" style="display:none;">
            <p class="sos-hunger-q">Tu as faim ou tu t'ennuies ?</p>
            <div class="sos-choice-row">
              <button class="sos-choice-btn" id="btn-faim">🍽 J'ai vraiment faim</button>
              <button class="sos-choice-btn" id="btn-ennui">💭 Je m'ennuie</button>
            </div>
          </div>
        `:""}
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
  `,Pe();const u=2*Math.PI*95,v=e.querySelector("#timer-arc"),b=e.querySelector("#timer-text"),y=e.querySelector("#phase-text"),x=e.querySelector(".breathe-ring"),d=e.querySelector(".breathe-outer");x&&(x.style.animation="pulse-ring 10s ease-in-out infinite"),d&&(d.style.animation="pulse-ring 10s ease-in-out infinite 2s");let g=!1;F=setInterval(()=>{if(g)return;a--,c++,c>=n&&(c=0,i==="inspire"?(i="expire",y.textContent="EXPIRE",ne(330)):(i="inspire",y.textContent="INSPIRE",ne(440))),b.textContent=Se(a);const S=(o-a)/o;v.style.strokeDashoffset=u*(1-S),a<=0&&(clearInterval(F),F=null,k())},1e3);const k=()=>{ne(523,.3,1);const S=e.querySelector("#sos-result");S&&(S.style.display="flex"),s==="alimentaire"&&(e.querySelector("#result-title").textContent="3 minutes écoulées",e.querySelector("#result-msg").textContent="La pulsion s'est-elle calmée ?",e.querySelector("#btn-resiste").textContent="✓ Oui, ça va mieux",e.querySelector("#btn-craque").textContent="J'ai tout de même cédé")},m=e.querySelector("#sos-pause"),p=e.querySelector("#pause-icon");m==null||m.addEventListener("click",()=>{g=!g,g?(p.innerHTML='<polygon points="6,4 16,10 16,10 6,16" fill="currentColor"/>',m.innerHTML=p.outerHTML+" Reprendre"):m.innerHTML=`<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
        <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/>
      </svg> Pause`}),(h=e.querySelector("#sos-back"))==null||h.addEventListener("click",()=>{z(),t("A")}),(f=e.querySelector("#btn-resiste"))==null||f.addEventListener("click",()=>{T("pulsion",{sousType:s,resiste:!0,duree:o}),z(),t("A",{toast:s==="tabac"?"💪 Pulsion résistée — +10 pts":"✓ Bien joué !"})}),(q=e.querySelector("#btn-craque"))==null||q.addEventListener("click",()=>{Ct(e,t,s)}),($=e.querySelector("#btn-faim"))==null||$.addEventListener("click",()=>{e.querySelector("#hunger-choice").style.display="none",e.querySelector("#sos-instruction").textContent="Mange une collation protéinée — œufs, fromage blanc, jambon",z(),setTimeout(()=>t("A"),3e3)}),(L=e.querySelector("#btn-ennui"))==null||L.addEventListener("click",()=>{e.querySelector("#hunger-choice").style.display="none",e.querySelector("#sos-instruction").textContent="Prends 5 min de marche — ou prolonge la respiration"})},Ct=(e,t,r)=>{var a,i,c,n,l;const s=e.querySelector("#sos-result");if(!s)return;s.querySelector(".sos-result-sheet").innerHTML=`
    <p class="sos-result-title" style="color:var(--color-text-secondary)">Pas de jugement.</p>
    <p class="sos-result-msg">Déclarer honnêtement, c'est déjà une victoire — ça compte dans ton score.</p>
    <div style="display:flex;flex-direction:column;gap:var(--space-sm);width:100%;margin-top:var(--space-md);">
      ${r==="tabac"?`
        <button class="btn-ghost" id="craque-cig">🚬 Une cigarette</button>
        <button class="btn-ghost" id="craque-autre">Autre</button>
      `:`
        <button class="btn-ghost" id="craque-petit">Petit écart — ça reste raisonnable</button>
        <button class="btn-ghost" id="craque-gros">Gros craquage — j'assume</button>
      `}
      <button class="btn-ghost" style="color:var(--color-text-secondary);font-size:var(--font-size-sm)" id="craque-annuler">Annuler</button>
    </div>
  `;const o=u=>{T("pulsion",{sousType:r,resiste:!1,detail:u}),z(),t("A",{toast:"✓ Déclaré honnêtement — +3 pts"})};(a=s.querySelector("#craque-cig"))==null||a.addEventListener("click",()=>o("cigarette")),(i=s.querySelector("#craque-autre"))==null||i.addEventListener("click",()=>o("autre")),(c=s.querySelector("#craque-petit"))==null||c.addEventListener("click",()=>{T("ecart_petit",{note:"pulsion alimentaire"}),z(),t("A",{toast:"✓ Déclaré — +8 pts honnêteté"})}),(n=s.querySelector("#craque-gros"))==null||n.addEventListener("click",()=>{T("ecart_gros",{note:"pulsion alimentaire"}),z(),t("A",{toast:"✓ Déclaré — +3 pts honnêteté"})}),(l=s.querySelector("#craque-annuler"))==null||l.addEventListener("click",()=>{z(),t("A")})},Se=e=>{const t=Math.floor(e/60),r=e%60;return`${t}:${r.toString().padStart(2,"0")}`},Pt=z,Te=()=>{const e=new Date().getHours();document.body.classList.toggle("night-mode",e>=22||e<7)};Te();setInterval(Te,60*60*1e3);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(()=>{})});let W="A";const C=document.getElementById("app"),H=(e,t={})=>{W==="D"&&Pt(),W=e,de(t)},Tt=[{id:"A",label:"Accueil",icon:zt},{id:"B",label:"Journal",icon:It},{id:"C",label:"Analyse",icon:Ot},{id:"D",label:"SOS",icon:Bt}];function At(){const e=document.createElement("nav");return e.className="nav-bar",e.setAttribute("role","navigation"),e.innerHTML=Tt.map(t=>`
    <button class="nav-item ${W===t.id?"active":""}" data-screen="${t.id}" aria-label="${t.label}">
      ${t.icon()}
      <span>${t.label}</span>
    </button>
  `).join(""),e.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.screen;r==="D"?H("D",{type:"tabac"}):H(r)})}),e}const de=(e={})=>{if(!ce()){Dt();return}if(we(),C.innerHTML="",W==="D"){const s=document.createElement("div");s.className="screen",C.appendChild(s),jt(s,H,e);return}const r=document.createElement("div");switch(r.className="screen animate-in",C.appendChild(r),C.appendChild(At()),W){case"A":Ce(r,H,e);break;case"B":qt(r,H,e);break;case"C":Lt(r,H,e);break}},Dt=()=>{let e=0;const t={},r=[{key:"dateArret",title:"Ta date d'arrêt du tabac",subtitle:"Si tu as arrêté aujourd'hui, utilise le bouton ci-dessous.",content:()=>`
        <input type="date" id="ob-date" max="${new Date().toISOString().slice(0,10)}" value="${new Date().toISOString().slice(0,10)}" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center"/>
        <button class="btn-ghost" id="btn-today" style="margin-top:var(--space-sm)">Aujourd'hui</button>
      `,getValue:()=>document.querySelector("#ob-date").value},{key:"poids",title:"Ton poids actuel",subtitle:"",content:()=>`
        <select id="ob-poids" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center">
          ${Array.from({length:181},(o,a)=>{const i=(60+a*.5).toFixed(1);return`<option value="${i}" ${i==="120.0"?"selected":""}>${i} kg</option>`}).join("")}
        </select>
      `,getValue:()=>parseFloat(document.querySelector("#ob-poids").value)},{key:"taille",title:"Ta taille",subtitle:"",content:()=>`
        <select id="ob-taille" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center">
          ${Array.from({length:61},(o,a)=>{const i=150+a;return`<option value="${i}" ${i===187?"selected":""}>${i} cm</option>`}).join("")}
        </select>
      `,getValue:()=>parseInt(document.querySelector("#ob-taille").value)},{key:"age",title:"Ton âge",subtitle:"",content:()=>`
        <select id="ob-age" style="font-size:var(--font-size-lg);padding:var(--space-md);text-align:center">
          ${Array.from({length:61},(o,a)=>{const i=20+a;return`<option value="${i}" ${i===45?"selected":""}>${i} ans</option>`}).join("")}
        </select>
      `,getValue:()=>parseInt(document.querySelector("#ob-age").value)},{key:"modeAlimentation",title:"Ta liberté alimentaire",subtitle:"Comment veux-tu gérer tes repas libres ?",content:()=>`
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
      `,getValue:()=>{const o=document.querySelector(".mode-choice.active");return o?o.dataset.mode:"repas"}}],s=()=>{var c,n;const o=r[e],a=e===r.length-1,i=(e+1)/r.length*100;C.innerHTML=`
      <div class="onboarding-screen">
        <div class="ob-progress">
          <div class="ob-progress-fill" style="width:${i}%"></div>
        </div>
        <div class="ob-content">
          <p class="ob-step">Étape ${e+1} / ${r.length}</p>
          <h1 class="ob-title">${o.title}</h1>
          ${o.subtitle?`<p class="ob-sub">${o.subtitle}</p>`:""}
          <div class="ob-input-area">
            ${o.content()}
          </div>
          <button class="btn-primary ob-next" id="ob-next">${a?"Commencer":"Suivant →"}</button>
        </div>
      </div>
    `,(c=C.querySelector("#btn-today"))==null||c.addEventListener("click",()=>{const l=C.querySelector("#ob-date");l&&(l.value=new Date().toISOString().slice(0,10))}),C.querySelectorAll(".mode-choice").forEach(l=>{l.addEventListener("click",()=>{C.querySelectorAll(".mode-choice").forEach(u=>u.classList.remove("active")),l.classList.add("active")})}),(n=C.querySelector("#ob-next"))==null||n.addEventListener("click",()=>{var u;const l=o.getValue();if(t[o.key]=l,e===r.length-1){t.sexe="homme",t.poidsObjectif=100,t.poids=parseFloat(t.poids)||120,t.taille=parseFloat(t.taille)||187,t.age=parseInt(t.age)||45,console.log("DEBUG profil:",JSON.stringify({poids:t.poids,taille:t.taille,age:t.age,poidsObjectif:t.poidsObjectif,typeofPoids:typeof t.poids}));const v=le(t);console.log("DEBUG calcAll:",JSON.stringify(v));{const{budget:b}=le(t);De(t),Ne("modeAlimentation",t.modeAlimentation||"repas"),C.innerHTML=`
            <div class="onboarding-screen">
              <div class="ob-content" style="text-align:center">
                <p style="font-size:3rem;margin-bottom:var(--space-lg)">✓</p>
                <h1 class="ob-title">Tout est prêt.</h1>
                <p class="ob-sub" style="color:var(--color-text-secondary)">Tu peux manger jusqu'à</p>
                <p style="font-family:var(--font-serif);font-size:var(--font-size-2xl);color:var(--color-success);margin:var(--space-md) 0">${b} kcal par jour</p>
                <p class="ob-sub" style="color:var(--color-text-secondary)">C'est parti. Un jour à la fois.</p>
                <button class="btn-primary" id="ob-start" style="margin-top:var(--space-xl)">Accéder au dashboard →</button>
              </div>
            </div>
          `,(u=C.querySelector("#ob-start"))==null||u.addEventListener("click",()=>de())}}else e++,s()})};s()};de();function zt(){return`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>`}function It(){return`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4h7a2 2 0 012 2v13H4V4z"/>
    <path d="M20 4h-7a2 2 0 00-2 2v13h9V4z"/>
  </svg>`}function Ot(){return`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 20h18M7 20V10m5 10V4m5 16v-7"/>
  </svg>`}function Bt(){return`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v6M12 16.5v.5"/>
  </svg>`}
