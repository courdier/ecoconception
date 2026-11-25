/*
 * Chatbot du site : une IA frugale qui fonctionne dans le navigateur.
 * Un petit modèle de classification (assets/data/chatbot-eco.json) reconnaît le sujet
 * de la question, puis le chatbot affiche une réponse rédigée à l'avance à partir du site.
 * Le modèle est entraîné hors ligne : node chatbot/entrainer.mjs
 *
 * Ce fichier n'est chargé qu'au premier clic sur le bouton « Une question ? » (hamburger.js).
 */
(function () {
    'use strict';

    /* TRAITEMENT DU TEXTE (aussi utilisé par chatbot/entrainer.mjs) */

    var VIDES = {};
    ('a ai as au aux avec ca ce ceci cela ces cet cette d dans de des du elle en es est et etre il ils j je ' +
        'l la le les leur leurs lui m ma mais me mes moi mon n ne nos notre nous on ont ou par pour qu que ' +
        's sa se ses si son sont sur t ta te tes toi ton tu un une vos votre vous y svp stp')
        .split(' ').forEach(function (m) { VIDES[m] = true; });

    var REMPLACEMENTS = [
        [/\bc ?est\b/g, ' '],
        [/\bc koi\b|\bc quoi\b/g, 'quoi'],
        [/\btels?\b/g, 'telephone'],
        [/\bquel(le)?s?\b/g, 'quel'],
        [/\beco /g, 'eco'],
        [/\btik tok\b/g, 'tiktok'],
        [/\bchat gpt\b/g, 'chatgpt'],
        [/\bwi fi\b/g, 'wifi'],
        [/\bdata ?cent(er|re)s?\b/g, 'datacenter'],
        [/\bcentres? de donnees\b/g, 'datacenter'],
        [/\be mails?\b/g, 'email'],
        [/\bco 2\b/g, 'co2'],
        [/\bintelligences? artificielles?\b/g, 'ia']
    ];

    // Mots de même sens ramenés à une seule racine
    var SYNONYMES = {
        smartphon: 'telephon', mobil: 'telephon', ordi: 'ordin', pc: 'ordin',
        appli: 'applic', app: 'applic', insta: 'instagram', yt: 'youtub', fb: 'facebook', tweet: 'twitt',
        emet: 'emission', emettr: 'emission', emis: 'emission', rejet: 'emission', rejett: 'emission',
        pollution: 'pollu', polluant: 'pollu', energivor: 'consomm', gourmand: 'consomm',
        ecolo: 'ecologiqu', ecologi: 'ecologiqu', stream: 'streaming', sociau: 'social'
    };

    var SUFFIXES = ['issements', 'issement', 'ations', 'ation', 'ements', 'ement', 'atrices', 'atrice', 'ateurs',
        'ateur', 'ances', 'ance', 'ences', 'ence', 'ites', 'ite', 'ables', 'able', 'ismes', 'isme', 'istes', 'iste',
        'euses', 'euse', 'eurs', 'eur', 'ives', 'ive', 'ifs', 'if', 'ees', 'ee', 'es', 'er', 'ez', 'e', 's', 'x'];

    // Texte en minuscules, sans accents ni ponctuation
    function normaliser(texte) {
        var t = String(texte).toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae')
            .normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
        t = t.replace(/c\+\+/g, ' cpp ').replace(/[^a-z0-9]+/g, ' ');
        for (var i = 0; i < REMPLACEMENTS.length; i++) t = t.replace(REMPLACEMENTS[i][0], REMPLACEMENTS[i][1]);
        return t.replace(/ +/g, ' ').trim();
    }

    // Racine d'un mot : « consommations » et « consommer » donnent « consomm »
    function raciner(mot) {
        if (/\d/.test(mot)) return mot;
        if (mot.length <= 4) return /[^s]s$/.test(mot) ? mot.slice(0, -1) : mot;
        for (var i = 0; i < SUFFIXES.length; i++) {
            var s = SUFFIXES[i];
            if (mot.length - s.length >= 4 && mot.slice(-s.length) === s) return mot.slice(0, -s.length);
        }
        return mot;
    }

    function racines(texte) {
        return normaliser(texte).split(' ').filter(function (m) { return m && !VIDES[m]; }).map(function (m) {
            var r = raciner(m);
            return SYNONYMES[r] || r;
        });
    }

    // Caractéristiques d'une phrase : ses racines, sans doublon
    // (les paires de mots ont été testées : modèle 3 fois plus lourd et pas plus précis)
    function caracteristiques(liste) {
        return liste.filter(function (m, i) { return liste.indexOf(m) === i; });
    }

    // Distance d'édition limitée (fautes de frappe)
    function distance(a, b, max) {
        if (Math.abs(a.length - b.length) > max) return max + 1;
        var prec = [], cour, i, j;
        for (j = 0; j <= b.length; j++) prec[j] = j;
        for (i = 1; i <= a.length; i++) {
            cour = [i];
            var mini = i;
            for (j = 1; j <= b.length; j++) {
                cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1, prec[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
                if (cour[j] < mini) mini = cour[j];
            }
            if (mini > max) return max + 1;
            prec = cour;
        }
        return prec[b.length];
    }

    // Remplace un mot inconnu par le mot connu le plus proche (« netflx » devient « netflix »)
    function corriger(liste, modele) {
        if (!modele.mots) modele.mots = Object.keys(modele.poids);
        return liste.map(function (m) {
            if (modele.poids[m] || m.length < 5) return m;
            var max = m.length >= 8 ? 2 : 1, meilleur = m, dmin = max + 1;
            for (var i = 0; i < modele.mots.length; i++) {
                var d = distance(m, modele.mots[i], max);
                if (d < dmin) { dmin = d; meilleur = modele.mots[i]; }
            }
            return meilleur;
        });
    }

    // Probabilité de chaque intention (régression logistique multinomiale)
    function predire(modele, texte, dejaCorrigee) {
        var liste = dejaCorrigee || corriger(racines(texte), modele);
        var scores = modele.biais.slice(), connues = 0;
        caracteristiques(liste).forEach(function (c) {
            var p = modele.poids[c];
            if (!p) return;
            connues++;
            for (var k = 0; k < p.length; k += 2) scores[p[k]] += p[k + 1];
        });
        var max = -Infinity, somme = 0, i;
        for (i = 0; i < scores.length; i++) {
            scores[i] *= modele.echelle;
            if (scores[i] > max) max = scores[i];
        }
        for (i = 0; i < scores.length; i++) { scores[i] = Math.exp(scores[i] - max); somme += scores[i]; }
        var classement = scores.map(function (s, k) { return { id: modele.classes[k], p: s / somme }; });
        classement.sort(function (a, b) { return b.p - a.p; });
        return { classement: classement, connues: connues, mots: liste };
    }

    /* COMPARAISONS ET CALCULS (règles, sans modèle) */

    function nombre(n) {
        var d = n >= 100 ? 0 : n >= 10 ? 1 : n >= 1 ? 2 : 3;
        return Number(n.toFixed(d)).toLocaleString('fr-FR');
    }

    var CHIFFRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10 };

    var NOMBRE = '(\\d+|une?|deux|trois|quatre|cinq|six|sept|huit|neuf|dix)';

    // Quantité demandée : « 2 heures », « 1h30 », « 1 h 30 », « une heure et demie »,
    // « une demi-heure », « un quart d'heure », « 30 minutes », « 10 questions »
    function quantite(t) {
        var m = t.match(/\b(\d+) ?h ?(\d{2})\b/);
        if (m) return { unite: 'heure', n: +m[1] + m[2] / 60 };
        m = t.match(new RegExp('\\b' + NOMBRE + ' ?(?:h|heures?) et (demie?|quart)\\b'));
        if (m) return { unite: 'heure', n: (CHIFFRES[m[1]] || +m[1]) + (m[2] === 'quart' ? 0.25 : 0.5) };
        if (/\bdemi ?heures?\b/.test(t)) return { unite: 'heure', n: 0.5 };
        if (/\bquarts? d ?heures?\b/.test(t)) return { unite: 'heure', n: 0.25 };
        m = t.match(new RegExp('\\b' + NOMBRE + ' ?(h|heures?|min|minutes?|questions?|requetes?|recherches?|prompts?|messages?|echanges?)\\b'));
        if (!m) return null;
        var n = CHIFFRES[m[1]] || +m[1];
        if (/^h/.test(m[2])) return { unite: 'heure', n: n };
        if (/^min/.test(m[2])) return { unite: 'heure', n: n / 60 };
        return { unite: 'question', n: n };
    }

    // Fréquence demandée : « par jour », « chaque semaine », « tous les mois »…
    function periode(t) {
        if (/\bjour(s|nees?)?\b|\bquotidien/.test(t)) return { mot: 'jour', fois: 365 };
        if (/\bsemaines?\b|\bhebdo/.test(t)) return { mot: 'semaine', fois: 52 };
        if (/\bmois\b|\bmensuel/.test(t)) return { mot: 'mois', fois: 12 };
        return null;
    }

    // 55 g → « 55 g » ; 15 060 g → « 15,1 kg »
    function masse(g) {
        return g >= 1000 ? nombre(g / 1000) + ' kg' : nombre(g) + ' g';
    }

    // 0,5 → « 30 minutes » ; 2,5 → « 2 h 30 » ; 2 → « 2 heures »
    function duree(n) {
        var h = Math.floor(n), min = Math.round((n - h) * 60);
        if (!h) return min + ' minutes';
        if (!min) return h + (h > 1 ? ' heures' : ' heure');
        return h + ' h ' + (min < 10 ? '0' : '') + min;
    }

    function voiture(g) {
        var m = g * 5;  // hypothèse des fiches : 150 g de CO₂ par km, soit 5 m par gramme
        return m >= 1000 ? nombre(m / 1000) + ' km' : nombre(m) + ' m';
    }

    function que(nom) { return /^[aeiouéèê]/i.test(nom) ? 'qu’' + nom : 'que ' + nom; }

    // champ : 'co2' ou 'eau'
    function ecart(a, b, champ) {
        var r = a[champ] / b[champ], verbe = champ === 'eau' ? ' consomme ' : ' émet ', quoi = champ === 'eau' ? ' d’eau' : '';
        if (r >= 1.95) return a.nom + verbe + 'environ ' + nombre(Math.round(r)) + ' fois plus' + quoi + ' ' + que(b.nom) + '.';
        if (r > 1.02) return a.nom + verbe + 'environ ' + Math.round((r - 1) * 100) + ' % de plus' + quoi + ' ' + que(b.nom) + '.';
        return a.nom + ' et ' + b.nom + (champ === 'eau' ? ' consomment' : ' émettent') + ' à peu près autant.';
    }

    function calculer(modele, texte, liste) {
        var services = (modele.faits || []).filter(function (f) {
            return f.cles.some(function (c) { return liste.indexOf(c) >= 0; });
        });
        if (!services.length) return null;
        var t = normaliser(texte), lignes = [];
        var liens = services.map(function (f) { return ['Fiche ' + f.nom.replace(/ \(.*\)/, ''), f.page]; });
        var note = 'Ordres de grandeur tirés des fiches du site, dont les sources diffèrent.';

        if (services.length === 1) {
            var f = services[0], q = quantite(t), frequence = periode(t);
            // « une heure de Netflix » : la réponse complète du sujet est plus utile qu'un calcul,
            // sauf si une fréquence est demandée (« une heure de Netflix par jour »)
            if (!q || q.unite !== f.unite || (q.n === 1 && !frequence)) return null;
            var g = q.n * f.co2;
            if (f.unite === 'heure') {
                // « 1 heure » et « 1 h 30 » au singulier, « 30 minutes » et « 2 heures » au pluriel
                var pluriel = q.n >= 2 || q.n < 1;
                lignes.push(duree(q.n) + ' sur ' + f.nom + (pluriel ? ' émettent' : ' émet') + ' environ ' + nombre(g) + ' g de CO₂ (' +
                    nombre(f.co2) + ' g par heure), autant qu’environ ' + voiture(g) + ' en voiture.');
                if (f.eau) lignes.push('Cela représente aussi environ ' + nombre(q.n * f.eau) + ' litres d’eau.');
            } else {
                // « 1 question à ChatGPT émet », « 10 questions à ChatGPT émettent »
                var quoi = q.n === 1 ? f.quoi.replace(/^(\S+)s\b/, '$1') : f.quoi;
                lignes.push(nombre(q.n) + ' ' + quoi + (q.n === 1 ? ' émet' : ' émettent') + ' environ ' + nombre(g) + ' g de CO₂ (' +
                    nombre(f.co2) + ' g par ' + f.par + '), autant qu’environ ' + voiture(g) + ' en voiture.');
            }
            if (frequence) {
                var an = g * frequence.fois;
                lignes.push('Chaque ' + frequence.mot + ' pendant un an : environ ' + masse(an) + ' de CO₂, autant qu’environ ' + voiture(an) + ' en voiture.');
            }
            lignes.push(note);
            return { reponse: lignes, liens: liens, suite: ['equivalences', 'services_comparaison'] };
        }

        var parHeure = services.filter(function (f) { return f.unite === 'heure'; });
        var parQuestion = services.filter(function (f) { return f.unite === 'question'; });
        var tri = function (a, b) { return b.co2 - a.co2; };
        var eau = /\b(eau|litres?)\b/.test(t) && parHeure.length > 1 && parHeure.every(function (f) { return f.eau; });

        if (eau) {
            lignes.push('Selon les fiches, pour une heure d’utilisation :');
            parHeure.sort(function (a, b) { return b.eau - a.eau; }).forEach(function (f) {
                lignes.push('• ' + f.nom + ' : environ ' + nombre(f.eau) + ' litres d’eau');
            });
            lignes.push(ecart(parHeure[0], parHeure[parHeure.length - 1], 'eau'));
        } else {
            [[parHeure, 'pour une heure d’utilisation'], [parQuestion, 'pour une question']].forEach(function (groupe) {
                if (!groupe[0].length) return;
                lignes.push('Selon les fiches, ' + groupe[1] + ' :');
                groupe[0].sort(tri).forEach(function (f) { lignes.push('• ' + f.nom + ' : ' + nombre(f.co2) + ' g de CO₂'); });
                if (groupe[0].length > 1) lignes.push(ecart(groupe[0][0], groupe[0][groupe[0].length - 1], 'co2'));
            });
            if (parHeure.length && parQuestion.length) {
                var h = parHeure[0], q2 = parQuestion[0];
                lignes.push('Une heure sur ' + h.nom + ' émet autant qu’environ ' + nombre(Math.round(h.co2 / q2.co2)) + ' ' + q2.quoi + '.');
            }
        }
        lignes.push(note);
        return { reponse: lignes, liens: liens, suite: ['services_comparaison', 'streaming_conseils'] };
    }

    /* RECHERCHE DANS LE TEXTE DES PAGES (secours) */

    var index = null;

    // Index construit au premier besoin : les racines de chaque phrase du site
    function indexer(modele) {
        if (index) return index;
        var df = {};
        var phrases = modele.passages.map(function (p) {
            var mots = caracteristiques(racines(p[1]));
            mots.forEach(function (m) { df[m] = (df[m] || 0) + 1; });
            return { page: p[0], texte: p[1], mots: mots };
        });
        var idf = {};
        Object.keys(df).forEach(function (m) { idf[m] = Math.log(phrases.length / df[m]); });
        index = { phrases: phrases, idf: idf };
        return index;
    }

    // texte : la question ; liste : ses racines corrigées (les noms propres ne doivent pas l'être)
    function chercher(modele, texte, liste) {
        if (!modele.passages) return [];
        var ix = indexer(modele);
        // Mots utiles de la question, y compris ceux que le site ne contient pas (« bitcoin »)
        var utiles = caracteristiques(racines(texte).concat(liste)).filter(function (m) {
            return m.length > 2 && !(ix.idf[m] <= 1);
        });
        var mots = utiles.filter(function (m) { return ix.idf[m]; });
        var requis = Math.min(2, caracteristiques(racines(texte)).filter(function (m) {
            return m.length > 2 && !(ix.idf[m] <= 1);
        }).length);
        if (!mots.length) return [];
        var res = [];
        ix.phrases.forEach(function (p) {
            var trouves = 0, score = 0;
            mots.forEach(function (m) {
                if (p.mots.indexOf(m) >= 0) { trouves++; score += ix.idf[m]; }
            });
            if (trouves >= requis && score >= 4) {
                res.push({ texte: p.texte, titre: modele.pages[p.page][0], url: modele.pages[p.page][1], score: score / Math.sqrt(p.mots.length) });
            }
        });
        res.sort(function (a, b) { return b.score - a.score; });
        var vues = {};
        return res.filter(function (r) { return vues[r.url] ? false : (vues[r.url] = true); }).slice(0, 2);
    }

    var CONVERSATION = { salutation: 1, remerciement: 1, au_revoir: 1, aide: 1, hors_sujet: 1 };

    // Décision, du moins coûteux au plus coûteux : règle de calcul, modèle, recherche, aveu d'ignorance
    function decider(modele, texte) {
        var liste = corriger(racines(texte), modele);
        var calcul = calculer(modele, texte, liste);
        if (calcul) return { type: 'calcul', calcul: calcul };
        var r = predire(modele, texte, liste), premier = r.classement[0];
        if (r.connues > 0 && premier.p >= modele.seuils.repondre) {
            return { type: 'reponse', id: premier.id, prediction: r };
        }
        var passages = chercher(modele, texte, liste);
        var proches = r.classement.filter(function (c) {
            return c.p >= modele.seuils.proposer && !CONVERSATION[c.id];
        }).slice(0, 3);
        if (r.connues > 0 && proches.length) return { type: 'precision', proches: proches, passages: passages.slice(0, 1), prediction: r };
        return { type: 'inconnu', passages: passages, prediction: r };
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = { normaliser: normaliser, racines: racines, caracteristiques: caracteristiques, predire: predire, decider: decider, chercher: chercher };
        return;
    }

    /* INTERFACE */

    var script = document.currentScript;
    var lanceur = document.querySelector('.chatbot-lanceur');
    if (!script || !lanceur || window.chatbotEco) return;

    var racineSite = new URL('../../', script.src).href;
    var CLE = 'chatbot-eco';
    var CLE_INVITATION = 'chatbot-eco-invitation';
    var PAGE_ATELIER = 'pages/en-pratique/atelier-chatbot.html';
    var modele = null, panneau, invitation, decouvrir, fil, champ, intentions;

    function lien(url) { return new URL(url, racineSite).href; }

    function el(nom, classe, texte) {
        var e = document.createElement(nom);
        if (classe) e.className = classe;
        if (texte) e.textContent = texte;
        return e;
    }

    function icone(chemin) {
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        var p = document.createElementNS(ns, 'path');
        p.setAttribute('d', chemin);
        svg.appendChild(p);
        return svg;
    }

    function pourcent(p) { return Math.round(p * 100) + ' %'; }

    function lire() {
        try { return JSON.parse(sessionStorage.getItem(CLE)) || []; } catch (e) { return []; }
    }

    function memoriser(entree) {
        try {
            var h = lire();
            h.push(entree);
            sessionStorage.setItem(CLE, JSON.stringify(h.slice(-12)));
        } catch (e) { /* stockage indisponible : la conversation n'est simplement pas gardée */ }
    }

    function oublier() {
        try { sessionStorage.removeItem(CLE); } catch (e) { /* rien à faire */ }
    }

    function invitationVue() {
        try { return localStorage.getItem(CLE_INVITATION) !== null; } catch (e) { return false; }
    }

    function construire() {
        panneau = el('section', 'chatbot');
        panneau.id = 'chatbot';
        panneau.hidden = true;
        panneau.setAttribute('role', 'dialog');
        panneau.setAttribute('aria-labelledby', 'chatbot-titre');

        var entete = el('div', 'chatbot__entete');
        var titres = el('div', 'chatbot__titres');
        var titre = el('h2', 'chatbot__titre', 'Assistant du site');
        titre.id = 'chatbot-titre';
        titres.appendChild(titre);

        var recommencer = el('button', 'chatbot__icone');
        recommencer.type = 'button';
        recommencer.setAttribute('aria-label', 'Nouvelle conversation');
        recommencer.title = 'Nouvelle conversation';
        recommencer.appendChild(icone('M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4'));
        recommencer.addEventListener('click', function () {
            oublier();
            fil.textContent = '';
            accueillir();
            (invitation.hidden ? champ : decouvrir).focus();
        });

        var fermer = el('button', 'chatbot__icone');
        fermer.type = 'button';
        fermer.setAttribute('aria-label', 'Fermer l’assistant');
        fermer.title = 'Fermer';
        fermer.appendChild(icone('M6 6l12 12M18 6L6 18'));
        fermer.addEventListener('click', fermerPanneau);

        entete.appendChild(titres);
        entete.appendChild(recommencer);
        entete.appendChild(fermer);

        fil = el('div', 'chatbot__fil');
        fil.setAttribute('role', 'log');
        fil.setAttribute('aria-live', 'polite');
        fil.setAttribute('aria-label', 'Conversation');
        fil.tabIndex = 0;

        var formulaire = el('form', 'chatbot__formulaire');
        var etiquette = el('label', 'visually-hidden', 'Votre question');
        etiquette.setAttribute('for', 'chatbot-question');
        champ = el('input', 'chatbot__champ');
        champ.id = 'chatbot-question';
        champ.type = 'text';
        champ.maxLength = 200;
        champ.autocomplete = 'off';
        champ.placeholder = 'Posez votre question…';
        champ.setAttribute('enterkeyhint', 'send');
        var envoyer = el('button', 'chatbot__envoyer');
        envoyer.type = 'submit';
        envoyer.setAttribute('aria-label', 'Envoyer la question');
        envoyer.appendChild(icone('M5 12h14M13 6l6 6-6 6'));
        formulaire.appendChild(etiquette);
        formulaire.appendChild(champ);
        formulaire.appendChild(envoyer);
        formulaire.addEventListener('submit', function (e) {
            e.preventDefault();
            var question = champ.value.trim();
            if (!question || !modele) return;
            champ.value = '';
            questionner(question);
        });

        invitation = el('section', 'chatbot__invitation');
        invitation.setAttribute('aria-labelledby', 'chatbot-invitation-texte');
        var texteInvitation = el('p', '', 'Découvrez comment ce chatbot a été conçu pour limiter les ressources utilisées.');
        texteInvitation.id = 'chatbot-invitation-texte';
        invitation.appendChild(texteInvitation);

        var actions = el('div', 'chatbot__invitation-actions');
        decouvrir = el('a', 'button', 'Découvrir l’atelier');
        decouvrir.href = lien(PAGE_ATELIER);
        decouvrir.setAttribute('aria-describedby', texteInvitation.id);
        var acceder = el('button', 'button-secondary', 'Accéder au chatbot');
        acceder.type = 'button';
        acceder.setAttribute('aria-describedby', texteInvitation.id);
        actions.append(decouvrir, acceder);
        invitation.appendChild(actions);

        function afficherConversation() {
            invitation.hidden = true;
            fil.hidden = false;
            formulaire.hidden = false;
        }

        function choisirParcours(choix) {
            try { localStorage.setItem(CLE_INVITATION, choix); } catch (e) { /* Le panneau reste utilisable. */ }
            afficherConversation();
            champ.focus();
        }

        decouvrir.addEventListener('click', function () { choisirParcours('atelier'); });
        acceder.addEventListener('click', function () { choisirParcours('chatbot'); });
        if (invitationVue()) afficherConversation();
        else {
            fil.hidden = true;
            formulaire.hidden = true;
        }

        var note = el('p', 'chatbot__note', 'Réponses rédigées à partir du site, aucune donnée envoyée. ');
        var comment = el('a', '', 'Comment ça marche ?');
        comment.href = lien(PAGE_ATELIER);
        note.appendChild(comment);

        panneau.appendChild(entete);
        panneau.appendChild(invitation);
        panneau.appendChild(fil);
        panneau.appendChild(formulaire);
        panneau.appendChild(note);

        panneau.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                fermerPanneau();
            }
        });

        // Clic (ou toucher) hors de l'assistant : le panneau se réduit.
        // « pointerdown » et non « click » : le clic qui ouvre le panneau ne doit pas le refermer aussitôt.
        document.addEventListener('pointerdown', function (e) {
            if (!panneau.hidden && !panneau.contains(e.target)) fermerPanneau(false);
        }, true);

        document.body.appendChild(panneau);
        lanceur.setAttribute('aria-controls', 'chatbot');
    }

    function message(classe, auteur) {
        var m = el('div', 'chatbot__message chatbot__message--' + classe);
        m.appendChild(el('span', 'visually-hidden', auteur + ' : '));
        return m;
    }

    function afficher(m) {
        fil.appendChild(m);
        fil.scrollTop = m.offsetTop - fil.offsetTop - 8;
    }

    function texte(m, paragraphes) {
        var liste = null;
        paragraphes.forEach(function (ligne) {
            if (ligne.indexOf('• ') === 0) {
                if (!liste) { liste = el('ul', 'chatbot__liste'); m.appendChild(liste); }
                liste.appendChild(el('li', '', ligne.slice(2)));
            } else {
                liste = null;
                m.appendChild(el('p', '', ligne));
            }
        });
    }

    function liens(m, items, titre) {
        if (!items.length) return;
        var bloc = el('div', 'chatbot__liens');
        bloc.appendChild(el('p', 'chatbot__etiquette', titre));
        var ul = el('ul');
        items.forEach(function (l) {
            var li = el('li'), a = el('a', '', l[0]);
            a.href = lien(l[1]);
            li.appendChild(a);
            ul.appendChild(li);
        });
        bloc.appendChild(ul);
        m.appendChild(bloc);
    }

    function suggestions(m, ids, titre) {
        ids = ids.filter(function (id) { return intentions[id]; });
        if (!ids.length) return;
        var bloc = el('div', 'chatbot__suggestions');
        if (titre) bloc.appendChild(el('p', 'chatbot__etiquette', titre));
        var ul = el('ul');
        ids.forEach(function (id) {
            var li = el('li'), b = el('button', 'chatbot__puce', intentions[id].titre);
            b.type = 'button';
            b.addEventListener('click', function () { choisir(id); });
            li.appendChild(b);
            ul.appendChild(li);
        });
        bloc.appendChild(ul);
        m.appendChild(bloc);
    }

    function explication(m, decision, duree) {
        var d = el('details', 'chatbot__pourquoi');
        d.appendChild(el('summary', '', 'Pourquoi cette réponse ?'));
        var p;
        var temps = duree.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' ms';
        if (!decision) {
            p = el('p', '', 'Vous avez choisi une suggestion : aucun calcul n’a été nécessaire.');
        } else if (decision.type === 'calcul') {
            p = el('p', '', 'Question reconnue par une règle simple, sans modèle : le calcul utilise les chiffres des fiches. Fait dans votre navigateur en ' + temps + '.');
        } else {
            var top = decision.prediction.classement.slice(0, 3).map(function (c) {
                return intentions[c.id].titre + ' (' + pourcent(c.p) + ')';
            }).join(', ');
            p = el('p', '', 'Sujets les plus probables : ' + top + '. Calcul fait dans votre navigateur en ' + temps + ', sans aucun envoi.');
        }
        d.appendChild(p);
        m.appendChild(d);
    }

    // Phrases exactes du site, avec la page d'où elles viennent
    function citations(m, passages, titre) {
        if (!passages.length) return;
        var bloc = el('div', 'chatbot__citations');
        if (titre) bloc.appendChild(el('p', 'chatbot__etiquette', titre));
        passages.forEach(function (p) {
            var citation = el('blockquote', 'chatbot__citation');
            citation.appendChild(el('p', '', '« ' + p.texte + ' »'));
            var source = el('p', 'chatbot__source', 'Page : '), a = el('a', '', p.titre);
            a.href = lien(p.url);
            source.appendChild(a);
            citation.appendChild(source);
            bloc.appendChild(citation);
        });
        m.appendChild(bloc);
    }

    function repondre(id, decision, duree) {
        var i = intentions[id], m = message('bot', 'Assistant');
        texte(m, i.reponse);
        liens(m, i.liens, 'À lire sur le site');
        suggestions(m, i.suite, 'Pour aller plus loin');
        explication(m, decision, duree);
        afficher(m);
    }

    function demander(texteQuestion, enregistrer) {
        var m = message('moi', 'Vous');
        m.appendChild(el('p', '', texteQuestion));
        afficher(m);
        if (enregistrer) memoriser(enregistrer);
    }

    // Phrases du site : téléchargées une seule fois, et seulement si le modèle ne sait pas répondre
    var textes = null;
    function chargerTextes() {
        if (!textes) {
            textes = fetch(lien('assets/data/chatbot-eco-textes.json')).then(function (r) {
                if (!r.ok) throw new Error(r.status);
                return r.json();
            }).then(function (t) {
                modele.pages = t.pages;
                modele.passages = t.passages;
            }, function () {
                // Hors ligne : on répond sans les phrases du site, et on réessaiera à la prochaine question
                textes = null;
            });
        }
        return textes;
    }

    function questionner(question, rejouer) {
        demander(question, rejouer ? null : { q: question });
        var debut = performance.now();
        var d = decider(modele, question);
        var duree = performance.now() - debut;
        if (d.type === 'reponse') return repondre(d.id, d, duree);

        var m = message('bot', 'Assistant');
        if ((d.type === 'precision' || d.type === 'inconnu') && !modele.passages) {
            var attente = el('p', '', 'Je cherche dans les pages du site…');
            m.appendChild(attente);
            afficher(m);
            chargerTextes().then(function () {
                debut = performance.now();
                d = decider(modele, question);
                m.removeChild(attente);
                remplir(m, d, performance.now() - debut);
            });
            return;
        }
        afficher(m);
        remplir(m, d, duree);
    }

    function remplir(m, d, duree) {
        if (d.type === 'calcul') {
            texte(m, d.calcul.reponse);
            liens(m, d.calcul.liens, 'À lire sur le site');
            suggestions(m, d.calcul.suite, 'Pour aller plus loin');
        } else if (d.type === 'precision') {
            texte(m, ['Je ne suis pas sûr d’avoir bien compris. Vouliez-vous parler de l’un de ces sujets ?']);
            suggestions(m, d.proches.map(function (c) { return c.id; }));
            citations(m, d.passages, 'Ou peut-être ce passage du site');
        } else if (d.passages.length) {
            texte(m, ['Je n’ai pas de réponse toute prête, mais le site en parle ici :']);
            citations(m, d.passages);
            suggestions(m, ['aide'], '');
        } else {
            texte(m, [
                'Je ne sais pas répondre à cette question et je préfère ne rien inventer. Je ne connais que le contenu de ce site sur l’écoconception numérique.',
                'Essayez une autre formulation, ou l’un de ces sujets :'
            ]);
            suggestions(m, ['aide', 'chiffres_monde', 'contact']);
        }
        explication(m, d, duree);
    }

    function choisir(id, rejouer) {
        demander(intentions[id].titre, rejouer ? null : { i: id });
        repondre(id, null, 0);
        if (!rejouer) champ.focus();
    }

    // Suggestions d'accueil : d'abord les sujets liés à la page consultée
    function accueillir() {
        var page = location.pathname.split('/').pop() || 'index.html';
        // Rang du lien vers la page consultée : un sujet dont c'est le premier lien passe devant
        function rang(id) {
            var liens = intentions[id].liens;
            for (var k = 0; k < liens.length; k++) {
                if (liens[k][1].split('#')[0].split('/').pop() === page) return k;
            }
            return -1;
        }
        var liees = Object.keys(intentions).filter(function (id) { return rang(id) >= 0; })
            .sort(function (a, b) { return rang(a) - rang(b); }).slice(0, 2);
        var ids = liees.concat(['ecoconception', 'chiffres_monde', 'services_comparaison', 'ia_frugale'])
            .filter(function (id, k, t) { return t.indexOf(id) === k; }).slice(0, 4);
        var m = message('bot', 'Assistant');
        texte(m, [
            'Bonjour ! Je réponds aux questions sur l’écoconception numérique et sur ce site.',
            'Écrivez votre question avec vos mots, ou choisissez un sujet :'
        ]);
        suggestions(m, ids);
        afficher(m);
    }

    function restaurer() {
        var h = lire();
        if (!h.length) return accueillir();
        h.forEach(function (e) {
            if (e.i && intentions[e.i]) choisir(e.i, true);
            else if (e.q) questionner(e.q, true);
        });
    }

    function ouvrirPanneau() {
        panneau.hidden = false;
        lanceur.hidden = true;
        lanceur.setAttribute('aria-expanded', 'true');
        // Conversation reprise d'une autre page : afficher le dernier message
        var dernier = fil.lastElementChild;
        if (dernier) fil.scrollTop = dernier.offsetTop - fil.offsetTop - 8;
        (invitation.hidden ? champ : decouvrir).focus();
    }

    // rendreFocus : false après un clic hors du panneau, pour laisser le focus là où l'on a cliqué
    function fermerPanneau(rendreFocus) {
        panneau.hidden = true;
        lanceur.hidden = false;
        lanceur.setAttribute('aria-expanded', 'false');
        if (rendreFocus !== false) lanceur.focus();
    }

    // Échec du téléchargement : un bouton relance le chargement sans recharger la page
    function erreur() {
        var m = message('bot', 'Assistant');
        texte(m, ['Le chatbot n’a pas pu se charger. Vérifiez votre connexion, puis réessayez.']);
        var bloc = el('div', 'chatbot__suggestions'), ul = el('ul'), li = el('li');
        var b = el('button', 'chatbot__puce', 'Réessayer');
        b.type = 'button';
        b.addEventListener('click', function () {
            fil.removeChild(m);
            demarrer();
            champ.focus();
        });
        li.appendChild(b);
        ul.appendChild(li);
        bloc.appendChild(ul);
        m.appendChild(bloc);
        afficher(m);
    }

    // Le fichier CSS est demandé par hamburger.js en même temps que ce script
    function cssPret() {
        var css = document.querySelector('link[data-chatbot]');
        if (!css || css.sheet) return Promise.resolve();
        return new Promise(function (ok) {
            css.addEventListener('load', ok, { once: true });
            css.addEventListener('error', ok, { once: true });
        });
    }

    // Résumé d'une décision pour la page Atelier : quelle étape de la cascade a répondu
    function analyser(question) {
        var debut = performance.now(), d = decider(modele, question), duree = performance.now() - debut;
        var attente = (d.type === 'precision' || d.type === 'inconnu') && !modele.passages ? chargerTextes() : Promise.resolve();
        return attente.then(function () {
            if (!modele.passages || d.type === 'calcul' || d.type === 'reponse') return d;
            debut = performance.now();
            d = decider(modele, question);
            duree = performance.now() - debut;
            return d;
        }).then(function (d) {
            var r = { type: d.type, duree: duree };
            if (d.type === 'calcul') {
                r.etape = 'calcul';
                // La phrase qui conclut : l'écart entre services ou le résultat du calcul
                var utiles = d.calcul.reponse.filter(function (l) {
                    return l.indexOf('• ') !== 0 && l.slice(-1) !== ':' && l.indexOf('Ordres de grandeur') !== 0;
                });
                r.extrait = d.calcul.reponse[0].slice(-1) === ':' ? utiles.pop() : utiles[0];
            } else if (d.type === 'reponse') {
                r.etape = 'modele';
                r.titre = intentions[d.id].titre;
                r.confiance = d.prediction.classement[0].p;
                r.extrait = intentions[d.id].reponse[0];
            } else {
                r.etape = d.passages.length || d.type === 'precision' ? 'recherche' : 'aveu';
                r.proches = (d.proches || []).map(function (c) { return intentions[c.id].titre; });
                r.extrait = d.passages.length ? d.passages[0].texte : '';
                r.page = d.passages.length ? d.passages[0].titre : '';
            }
            return r;
        });
    }

    // Télécharge le modèle et les réponses, puis reprend la conversation en cours
    function demarrer() {
        var donnees = fetch(lien('assets/data/chatbot-eco.json')).then(function (r) {
            if (!r.ok) throw new Error(r.status);
            return r.json();
        });
        return Promise.all([donnees, cssPret()]).then(function (res) {
            modele = res[0];
            intentions = modele.intentions;
            restaurer();
        }, erreur);
    }

    construire();

    // Le chatbot ne s'ouvre pas tout seul : hamburger.js l'ouvre au clic sur le bouton
    demarrer().then(function () {
        window.chatbotEco = {
            basculer: function () { if (panneau.hidden) ouvrirPanneau(); else fermerPanneau(); },
            analyser: function (question) { return modele ? analyser(question) : Promise.reject(); },
            // Lu à chaque fois : le modèle peut arriver plus tard, après « Réessayer »
            get stats() { return modele ? modele.stats : null; }
        };
        document.dispatchEvent(new Event('chatbot-pret'));
    });
})();
