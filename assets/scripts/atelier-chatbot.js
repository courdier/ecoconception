// Atelier ChatBot éco-conçu : éléments interactifs de la page
(() => {
    'use strict';

    const $ = (selecteur) => document.querySelector(selecteur);
    const nombre = (n, decimales = 1) => n.toLocaleString('fr-FR', { maximumFractionDigits: decimales });

    /* QUIZ : retour immédiat et expliqué pour chaque choix */

    const finaux = [...document.querySelectorAll('.quiz[data-final]')];

    document.querySelectorAll('.quiz').forEach((quiz) => {
        const retour = quiz.querySelector('.retour');
        quiz.addEventListener('change', (e) => {
            const choix = e.target;
            const bon = choix.hasAttribute('data-bon');
            const neutre = !bon && /^Je ne sais pas/.test(choix.parentElement.textContent);
            quiz.dataset.etat = bon ? 'bon' : 'faux';
            retour.textContent = (bon ? 'Exact. ' : neutre ? '' : 'Pas tout à fait. ') + choix.dataset.explication;
            // Question « Devinez » : le graphique apparaît après la réponse
            if (quiz.dataset.revele) document.getElementById(quiz.dataset.revele).hidden = false;
            if (quiz.hasAttribute('data-final')) {
                const score = finaux.filter((q) => q.dataset.etat === 'bon').length;
                $('#score').textContent = `Score : ${score} / ${finaux.length}` + (score === finaux.length ? ' : bravo !' : '');
            }
        });
    });

    /* ÉCHELLE DE L'IA */

    const ECHELLE = [
        ['Boutons et règles fixes', 'Non, seulement les choix proposés', 'Quelques Ko', 'Non'],
        ['Recherche par mots-clés', 'En partie : les mots exacts', 'Un index de quelques Ko', 'Non'],
        ['Petit classifieur (ce chatbot)', 'Oui, sur 75 sujets', '23 Ko, moins d’1 ms par question', 'Non : les réponses sont rédigées'],
        ['Recherche sémantique', 'Oui, synonymes compris', 'Un modèle de plusieurs dizaines de Mo', 'Non, si les réponses sont rédigées'],
        ['Petit LLM dans le navigateur', 'Oui', 'Des centaines de Mo à quelques Go, un appareil puissant', 'Oui'],
        ['Grand LLM sur serveur', 'Oui', 'Des serveurs à cartes graphiques : 0,24 Wh par requête (Gemini), 1,14 g CO₂e et 45 mL d’eau par réponse (Mistral)', 'Oui']
    ];

    const escalier = $('.escalier');
    if (escalier) {
        escalier.addEventListener('change', (e) => {
            const [nom, libre, poids, invente] = ECHELLE[e.target.value];
            $('#echelle-nom').textContent = nom;
            $('#echelle-libre').textContent = libre;
            $('#echelle-poids').textContent = poids;
            $('#echelle-invente').textContent = invente;
        });
    }

    /* CASCADE : le vrai chatbot, téléchargé au premier essai */

    const essai = $('#essai');
    if (essai) {
        const champ = $('#essai-question');
        const resultat = $('#resultat');
        const etapes = [...document.querySelectorAll('#etapes li')];
        const ORDRE = etapes.map((li) => li.dataset.etape);

        const montrer = (r) => {
            const rang = ORDRE.indexOf(r.etape);
            etapes.forEach((li, i) => {
                li.classList.toggle('passee', i < rang);
                li.classList.toggle('repond', i === rang);
            });
            const temps = `${nombre(r.duree)} ms`;
            const proches = r.proches || [];
            const phrases = {
                calcul: `Étape 2, règle de calcul : aucun modèle n’a servi (${temps}).`,
                modele: `Étape 3, classifieur : sujet « ${r.titre} » reconnu à ${Math.round(r.confiance * 100)} % (${temps}).`,
                recherche: `Étape 4, recherche : le modèle hésitait${proches.length ? ` (${proches.slice(0, 2).join(', ')})` : ''}${r.page ? `, une phrase de la page « ${r.page} » répond` : ''}.`,
                aveu: 'Étape 5 : rien de fiable sur le site, le chatbot dit qu’il ne sait pas au lieu d’inventer.'
            };
            resultat.textContent = phrases[r.etape];
            if (r.extrait) {
                const citation = document.createElement('q');
                citation.textContent = r.extrait;
                resultat.appendChild(citation);
            }
        };

        const analyser = (question) => {
            if (!question || !window.chargerChatbot) return;
            resultat.textContent = window.chatbotEco ? 'Analyse…' : 'Téléchargement du chatbot (environ 35 Ko compressés)…';
            window.chargerChatbot()
                .then(() => window.chatbotEco.analyser(question))
                .then(montrer, () => { resultat.textContent = 'Le chatbot n’a pas pu se charger. Vérifiez votre connexion.'; });
        };

        essai.addEventListener('submit', (e) => {
            e.preventDefault();
            analyser(champ.value.trim());
        });

        document.querySelectorAll('.exemples .puce').forEach((puce) => {
            puce.addEventListener('click', () => {
                champ.value = puce.textContent;
                analyser(puce.textContent);
            });
        });
    }

    /* SEUIL DE CONFIANCE : résultats réels des 60 questions de test */

    const curseur = $('#seuil-curseur');
    if (curseur) {
        let courbe = null;
        const parts = [...document.querySelectorAll('.empile span')];
        const message = (s, precisions, fausses) => {
            const erreurs = `${fausses} erreur${fausses > 1 ? 's' : ''}`;
            if (s === 75) return 'le réglage choisi, une seule erreur sur 60.';
            if (!fausses) return `plus aucune erreur, mais ${precisions} relances pour le visiteur.`;
            if (precisions <= 1) return `il répond presque toujours, mais fait ${erreurs}.`;
            return `compromis : ${erreurs} et ${precisions} demandes de précision.`;
        };

        const afficher = () => {
            const s = Number(curseur.value);
            $('#seuil-valeur').textContent = `${s} %`;
            const ligne = courbe && courbe.find((c) => c[0] === s);
            if (!ligne) return;
            const [, bonnes, precisions, fausses] = ligne;
            [bonnes, precisions, fausses].forEach((n, i) => parts[i].style.setProperty('--part', n));
            $('#seuil-bonnes').textContent = bonnes;
            $('#seuil-precisions').textContent = precisions;
            $('#seuil-fausses').textContent = fausses;
            $('#seuil-fausses-mot').textContent = fausses > 1 ? 'mauvaises réponses' : 'mauvaise réponse';
            $('#seuil-message').textContent = `${s} % : ${message(s, precisions, fausses)}`;
            curseur.setAttribute('aria-valuetext', `${s} % : ${bonnes} bonnes réponses, ${precisions} demandes de précision, ${fausses} mauvaise${fausses > 1 ? 's' : ''} réponse${fausses > 1 ? 's' : ''}`);
        };

        curseur.addEventListener('input', () => {
            if (courbe) return afficher();
            $('#seuil-valeur').textContent = `${curseur.value} %`;
            if (!window.chargerChatbot) return;
            window.chargerChatbot().then(() => {
                courbe = window.chatbotEco.stats && window.chatbotEco.stats.courbe;
                afficher();
            }, () => {});
        });
    }
})();
