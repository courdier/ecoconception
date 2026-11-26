// Entraîne le classifieur d'intentions du chatbot et produit assets/data/chatbot-eco.json
// Utilisation (depuis la racine du dépôt) : node chatbot/entrainer.mjs
// Aucune dépendance : seulement Node.js.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INTENTIONS, MODELES, FAITS } from './intentions.mjs';
import { TESTS, TESTS_FINAUX } from './tests.mjs';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const SORTIE = join(RACINE, 'assets', 'data', 'chatbot-eco.json');
// Phrases du site : fichier à part, téléchargé seulement si le modèle ne sait pas répondre
const SORTIE_TEXTES = join(RACINE, 'assets', 'data', 'chatbot-eco-textes.json');

// Même traitement du texte que dans le navigateur
const texte = createRequire(import.meta.url)('../assets/scripts/chatbot-eco.js');

const REGLAGES = {
    epoques: 60,
    epoquesReprise: 20,
    pas: 0.4,
    l2: 0.0005,
    graine: 42,
    plis: 5
};

/* DONNÉES */

function phrases(intention) {
    const liste = [...intention.exemples, ...intention.sujets];
    for (const modele of MODELES[intention.modele] || []) {
        for (const sujet of intention.sujets) liste.push(modele.replace('{s}', sujet));
    }
    return [...new Set(liste.map((p) => p.trim()).filter(Boolean))];
}

function verifier() {
    const ids = new Set();
    for (const i of INTENTIONS) {
        if (ids.has(i.id)) throw new Error(`Intention en double : ${i.id}`);
        ids.add(i.id);
    }
    for (const i of INTENTIONS) {
        for (const s of i.suite) if (!ids.has(s)) throw new Error(`${i.id} : suite inconnue ${s}`);
        if (i.modele && !MODELES[i.modele]) throw new Error(`${i.id} : modèle inconnu ${i.modele}`);
    }
    for (const [q, id] of [...TESTS, ...TESTS_FINAUX]) if (!ids.has(id) && id !== 'calcul') throw new Error(`Test « ${q} » : intention inconnue ${id}`);
}

/* MODÈLE : régression logistique multinomiale */

function aleatoire(graine) {
    let a = graine;
    return () => {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// depart : poids déjà appris et masque des poids gardés après élagage (ré-entraînement)
function entrainer(echantillons, classes, depart = null) {
    const vocabulaire = depart ? depart.vocabulaire : new Map();
    const donnees = echantillons.map(([phrase, k]) => {
        const indices = texte.caracteristiques(texte.racines(phrase)).map((c) => {
            if (!vocabulaire.has(c)) vocabulaire.set(c, vocabulaire.size);
            return vocabulaire.get(c);
        });
        return { indices, k };
    });
    const K = classes.length, F = vocabulaire.size;
    const W = depart ? Float64Array.from(depart.W) : new Float64Array(F * K);
    const b = depart ? Float64Array.from(depart.b) : new Float64Array(K);
    const s = new Float64Array(K);
    const masque = depart ? depart.masque : null;
    const epoques = depart ? REGLAGES.epoquesReprise : REGLAGES.epoques;
    const pasInitial = depart ? REGLAGES.pas / 4 : REGLAGES.pas;
    const hasard = aleatoire(REGLAGES.graine);
    const ordre = donnees.map((_, i) => i);

    for (let e = 0; e < epoques; e++) {
        for (let i = ordre.length - 1; i > 0; i--) {
            const j = Math.floor(hasard() * (i + 1));
            [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
        }
        const pas = pasInitial / (1 + e * 0.1);
        for (const n of ordre) {
            const { indices, k } = donnees[n];
            let max = -Infinity;
            for (let c = 0; c < K; c++) {
                let v = b[c];
                for (const f of indices) v += W[f * K + c];
                s[c] = v;
                if (v > max) max = v;
            }
            let somme = 0;
            for (let c = 0; c < K; c++) { s[c] = Math.exp(s[c] - max); somme += s[c]; }
            for (let c = 0; c < K; c++) {
                const g = s[c] / somme - (c === k ? 1 : 0);
                b[c] -= pas * g;
                for (const f of indices) {
                    const w = f * K + c;
                    if (masque && !masque[w]) continue;
                    W[w] -= pas * (g + REGLAGES.l2 * W[w]);
                }
            }
        }
    }
    return { vocabulaire, W, b, K };
}

// Élagage : les poids faibles sont mis à zéro, puis les poids gardés sont ré-entraînés
function elaguer(appris, echantillons, classes, seuil) {
    const masque = Uint8Array.from(appris.W, (w) => (Math.abs(w) >= seuil ? 1 : 0));
    const W = Float64Array.from(appris.W, (w, i) => (masque[i] ? w : 0));
    return entrainer(echantillons, classes, { vocabulaire: appris.vocabulaire, W, b: appris.b, masque });
}

// Quantification : chaque poids devient un entier de -127 à 127 (un octet au lieu de huit)
function compresser({ vocabulaire, W, b, K }, classes) {
    let maxi = 0;
    for (const w of W) maxi = Math.max(maxi, Math.abs(w));
    for (const w of b) maxi = Math.max(maxi, Math.abs(w));
    const echelle = maxi / 127;
    const poids = {};
    let gardes = 0;
    for (const [c, f] of vocabulaire) {
        const liste = [];
        for (let k = 0; k < K; k++) {
            const w = W[f * K + k];
            const q = Math.round(w / echelle);
            if (q !== 0) liste.push(k, q);
        }
        if (liste.length) { poids[c] = liste; gardes += liste.length / 2; }
    }
    return {
        classes,
        echelle: Number(echelle.toPrecision(6)),
        biais: Array.from(b, (w) => Math.round(w / echelle)),
        poids,
        gardes
    };
}

// Modèle non compressé, au même format, pour mesurer l'effet de la compression
function brut({ vocabulaire, W, b, K }, classes) {
    const poids = {};
    for (const [c, f] of vocabulaire) poids[c] = Array.from({ length: K }, (_, k) => [k, W[f * K + k]]).flat();
    return { classes, echelle: 1, biais: Array.from(b), poids };
}

/* ÉVALUATION */

function evaluer(modele, jeu) {
    const r = { bonnes: 0, precisions: 0, precisionsUtiles: 0, inconnues: 0, fausses: 0, total: jeu.length, erreurs: [] };
    for (const [q, attendu] of jeu) {
        const d = texte.decider(modele, q);
        if (d.type === 'calcul') {
            if (attendu === 'calcul') r.bonnes++;
            else { r.fausses++; r.erreurs.push(`${q} → calcul (attendu : ${attendu})`); }
            continue;
        }
        if (attendu === 'hors_sujet') {
            if ((d.type === 'reponse' && d.id === 'hors_sujet') || d.type === 'inconnu') r.bonnes++;
            else if (d.type === 'precision') r.precisions++;
            else { r.fausses++; r.erreurs.push(`${q} → ${d.id} (attendu : hors sujet)`); }
            continue;
        }
        if (d.type === 'reponse') {
            if (d.id === attendu) r.bonnes++;
            else { r.fausses++; r.erreurs.push(`${q} → ${d.id} (attendu : ${attendu})`); }
        } else if (d.type === 'precision') {
            r.precisions++;
            if (d.proches.some((c) => c.id === attendu)) r.precisionsUtiles++;
            else r.erreurs.push(`${q} → précision sans ${attendu}`);
        } else {
            r.inconnues++;
            r.erreurs.push(`${q} → ne sait pas (attendu : ${attendu})`);
        }
    }
    return r;
}

function pct(n, total) { return `${(100 * n / total).toFixed(1)} %`; }

/* PHRASES DES PAGES (recherche de secours) */

function fichiersHtml(dossier) {
    return readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
        const chemin = join(dossier, e.name);
        if (e.isDirectory()) return e.name === 'bde-esiroi' || e.name === 'langages_eco_rules' ? [] : fichiersHtml(chemin);
        return e.name.endsWith('.html') ? [chemin] : [];
    });
}

const ENTITES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', rsquo: '’', lsquo: '‘', laquo: '«', raquo: '»', hellip: '…', mdash: '—', ndash: '–' };

function nettoyer(html) {
    return html.replace(/<[^>]+>/g, ' ')
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
        .replace(/&(\w+);/g, (_, nom) => ENTITES[nom] || ' ')
        .replace(/\s+/g, ' ').trim();
}

// Phrases complètes du contenu des pages (sans menus, sources, tableaux ni code)
function extraire() {
    const fichiers = [join(RACINE, 'index.html'), ...fichiersHtml(join(RACINE, 'pages'))];
    const pages = [], passages = [], vues = new Set();
    for (const chemin of fichiers) {
        const html = readFileSync(chemin, 'utf8')
            .replace(/<(script|style|nav|footer|header|pre|table)[\s\S]*?<\/\1>/g, '')
            .replace(/<section[^>]*class="[^"]*bibliograph[^"]*"[\s\S]*?<\/section>/g, '');
        const titre = nettoyer((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
        if (!titre) continue;
        const n = pages.push([titre, relative(RACINE, chemin).split('\\').join('/')]) - 1;
        // Les retours à la ligne du code HTML ne coupent pas les phrases : seuls les blocs le font
        const blocs = html.replace(/\s+/g, ' ')
            .replace(/<\/(p|li|h[1-6]|div|section|article|blockquote|summary|dd|dt)>|<br\s*\/?>/g, '\n').split('\n');
        for (const bloc of blocs) {
            const propre = nettoyer(bloc).replace(/\s*\[\d+\](\s*,?\s*\[\d+\])*/g, '').replace(/\s+([.,;:])/g, '$1');
            // Pas de coupure après une initiale (« Herbert A. Simon »)
            for (const phrase of propre.split(/(?<=[.!?])(?<!\b[A-Z]\.)\s+(?=[A-ZÀ-ÖØ-Ý«])/)) {
                const mots = phrase.split(' ').length;
                if (mots < 8 || mots > 60 || vues.has(phrase) || /https?:|Disponible en ligne|Accessed|\[Online\]/.test(phrase)) continue;
                vues.add(phrase);
                passages.push([n, phrase]);
            }
        }
    }
    return { pages, passages };
}

/* PROGRAMME */

verifier();
const classes = INTENTIONS.map((i) => i.id);
const echantillons = INTENTIONS.flatMap((i, k) => phrases(i).map((p) => [p, k]));
const ecrits = INTENTIONS.reduce((n, i) => n + i.exemples.length, 0);

// Validation croisée : chaque pli met de côté une partie des exemples écrits à la main
const plis = Array.from({ length: REGLAGES.plis }, () => []);
INTENTIONS.forEach((i, k) => i.exemples.forEach((q, n) => plis[(n + k) % REGLAGES.plis].push([q, k])));
const predictionsValidation = [];
for (const pli of plis) {
    const exclus = new Set(pli.map(([q]) => q));
    const m = brut(entrainer(echantillons.filter(([p]) => !exclus.has(p)), classes), classes);
    for (const [q, k] of pli) predictionsValidation.push([texte.predire(m, q), k]);
}

// Seuils de confiance choisis sur la validation croisée (jamais sur les tests).
// Bonne réponse : +1 ; demande de précision qui propose le bon sujet : +0,5 ;
// mauvaise réponse : -3, car une réponse fausse coûte plus cher qu'une question en plus
let seuils = { repondre: 0.5, proposer: 0.1 }, meilleur = -Infinity;
for (let s = 0.2; s <= 0.8; s += 0.05) {
    let score = 0;
    for (const [r, k] of predictionsValidation) {
        const premier = r.classement[0];
        if (premier.p >= s) score += premier.id === classes[k] ? 1 : -3;
        else if (r.classement.slice(0, 3).some((c) => c.id === classes[k] && c.p >= seuils.proposer)) score += 0.5;
    }
    if (score > meilleur) { meilleur = score; seuils.repondre = Number(s.toFixed(2)); }
}

const appris = entrainer(echantillons, classes);
const complet = brut(appris, classes);
complet.seuils = seuils;

// Élagage : seuil le plus fort qui garde autant de réponses justes ET assez sûres
// sur les exemples écrits à la main (l'élagage rend le modèle moins sûr de lui)
const exemples = INTENTIONS.flatMap((i, k) => i.exemples.map((q) => [q, k]));
const exactitude = (m) => exemples.filter(([q, k]) => {
    const premier = texte.predire(m, q).classement[0];
    return premier.id === classes[k] && premier.p >= seuils.repondre;
}).length / exemples.length;
const reference = exactitude(complet);
let compresse = null;
for (const seuil of [2, 1.5, 1.2, 1, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]) {
    const m = compresser(elaguer(appris, echantillons, classes, seuil), classes);
    m.seuils = seuils;
    if (exactitude(m) >= reference - 0.01) { compresse = m; compresse.seuilElagage = seuil; break; }
}

const { pages, passages } = extraire();
const faits = FAITS.map(({ noms, ...f }) => ({ ...f, cles: [...new Set(noms.flatMap((n) => texte.racines(n)))] }));
Object.assign(complet, { pages, passages, faits });
Object.assign(compresse, { pages, passages, faits });
const avant = evaluer(complet, TESTS);
const apres = evaluer(compresse, TESTS);
const final = evaluer(compresse, TESTS_FINAUX);

// Effet du seuil de confiance sur les tests finaux (curseur de la page Atelier) :
// [seuil en %, bonnes réponses, demandes de précision ou « je ne sais pas », mauvaises réponses]
const courbe = [];
for (let s = 30; s <= 95; s += 5) {
    const r = evaluer({ ...compresse, seuils: { ...seuils, repondre: s / 100 } }, TESTS_FINAUX);
    courbe.push([s, r.bonnes, r.precisions + r.inconnues, r.fausses]);
}

const tailleBrute = Buffer.byteLength(JSON.stringify({ biais: complet.biais, poids: complet.poids }));
const sortie = {
    version: 1,
    classes,
    seuils,
    echelle: compresse.echelle,
    biais: compresse.biais,
    poids: compresse.poids,
    intentions: Object.fromEntries(INTENTIONS.map((i) => [i.id, { titre: i.titre, reponse: i.reponse, liens: i.liens, suite: i.suite }])),
    faits
};
const tailleModele = Buffer.byteLength(JSON.stringify({ biais: compresse.biais, poids: compresse.poids }));
const total = complet.biais.length + Object.values(complet.poids).reduce((n, p) => n + p.length / 2, 0);
sortie.stats = {
    intentions: classes.length,
    exemplesEcrits: ecrits,
    phrasesEntrainement: echantillons.length,
    caracteristiques: Object.keys(complet.poids).length,
    poidsAvant: total,
    poidsApres: compresse.gardes + compresse.biais.length,
    tailleModeleAvant: tailleBrute,
    tailleModeleApres: tailleModele,
    tests: TESTS_FINAUX.length,
    bonnes: final.bonnes,
    precisions: final.precisions,
    precisionsUtiles: final.precisionsUtiles,
    inconnues: final.inconnues,
    fausses: final.fausses,
    courbe
};

mkdirSync(dirname(SORTIE), { recursive: true });
const json = JSON.stringify(sortie);
writeFileSync(SORTIE, json);
const jsonTextes = JSON.stringify({ pages, passages });
writeFileSync(SORTIE_TEXTES, jsonTextes);

const ko = (o) => `${(o / 1024).toFixed(1)} Ko`;
console.log(`Intentions : ${classes.length} | exemples écrits : ${ecrits} | phrases d'entraînement : ${echantillons.length}`);
console.log(`Seuil pour répondre : ${seuils.repondre} (choisi par validation croisée)`);
console.log(`Élagage : poids sous ${compresse.seuilElagage} supprimés, ${sortie.stats.poidsAvant} → ${sortie.stats.poidsApres} poids`);
console.log(`Taille du modèle : ${ko(tailleBrute)} → ${ko(tailleModele)} (élagage + quantification)`);
console.log(`Phrases du site pour la recherche : ${passages.length}, dans ${pages.length} pages`);
console.log(`Fichier du chatbot (modèle, réponses, chiffres) : ${ko(Buffer.byteLength(json))}`);
console.log(`Fichier des phrases du site (chargé seulement si besoin) : ${ko(Buffer.byteLength(jsonTextes))}`);
for (const [nom, r] of [['Mise au point, avant compression', avant], ['Mise au point, après compression', apres], ['Tests finaux, modèle publié', final]]) {
    console.log(`\n${nom} — ${r.total} questions jamais vues à l'entraînement :`);
    console.log(`  bonnes réponses         ${pct(r.bonnes, r.total)}`);
    console.log(`  demandes de précision   ${pct(r.precisions, r.total)} (dont ${r.precisionsUtiles} proposant le bon sujet)`);
    console.log(`  « je ne sais pas »      ${pct(r.inconnues, r.total)}`);
    console.log(`  mauvaises réponses      ${pct(r.fausses, r.total)}`);
}
if (apres.erreurs.length) console.log(`\nÀ améliorer (mise au point) :\n  ${apres.erreurs.join('\n  ')}`);
if (final.erreurs.length) console.log(`\nErreurs des tests finaux :\n  ${final.erreurs.join('\n  ')}`);
