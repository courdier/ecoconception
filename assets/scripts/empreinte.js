/*
 * Compteur d'empreinte EcoIndex : estimation, dans le navigateur, de l'empreinte
 * de la page consultée. Le badge s'affiche dans le bandeau du bas (footer).
 *
 * Méthode EcoIndex : GreenIT.fr / Collectif Conception Numérique Responsable.
 *   - Quantiles, objectifs et notes : https://github.com/cnumr/ecoindex_reference
 *   - Valeurs d'ACV des impacts environnementaux (GES, eau) : © Frédéric Bordage
 *   - Implémentation de référence consultée pour vérifier la méthode :
 *     https://github.com/cnumr/GreenIT-Analysis
 */

(function () {
    'use strict';

    // Dernier footer de la page
    var footers = document.getElementsByTagName('footer');
    var footer = footers[footers.length - 1];
    var perf = window.performance;
    var script = document.currentScript;
    if (!footer || !perf || !perf.getEntriesByType || footer.querySelector('.eco-badge')) return;

    // Racine du site, déduite de l'emplacement de ce script
    var racine = script && script.src ? new URL('../../', script.src).href : '/';

    // Référence EcoIndex : quantiles du DOM, des requêtes et du poids (Ko), puis seuils des notes
    var Q_DOM = [0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459, 1801, 2479, 594601];
    var Q_REQ = [0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281, 3920];
    var Q_KO = [0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32, 1648.27, 1876.08,
        2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54, 223212.26];
    var NOTES = [[80, 'A', '#349A47'], [70, 'B', '#51B84B'], [55, 'C', '#CADB2A'], [40, 'D', '#F6EB15'],
        [25, 'E', '#FECD06'], [10, 'F', '#F99839'], [-1, 'G', '#ED2124']];

    // Position (de 0 à 20) d'une valeur dans une échelle de quantiles
    function quantile(q, v) {
        for (var i = 1; i < q.length; i++) {
            if (v < q[i]) return i - 1 + (v - q[i - 1]) / (q[i] - q[i - 1]);
        }
        return q.length - 1;
    }

    // Poids d'une ressource. Si elle vient du cache, on compte sa taille réelle :
    // EcoIndex mesure une première visite (cache vide).
    function poids(e) {
        return Math.max(e.transferSize || 0, e.encodedBodySize || 0);
    }

    function nombre(n, decimales) {
        return n.toLocaleString('fr-FR', { maximumFractionDigits: decimales || 0 });
    }

    function echapper(texte) {
        return texte.replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function nomRessource(url) {
        try {
            var u = new URL(url);
            return decodeURIComponent(u.pathname.split('/').pop()) || u.hostname;
        } catch (e) {
            return url;
        }
    }

    var details = null; // le badge, créé au premier calcul

    // Mesure la page et calcule l'EcoIndex
    function mesurer() {
        // Éléments de la page, sans le contenu des SVG ni le badge lui-même
        var dom = document.getElementsByTagName('*').length - document.querySelectorAll('svg *').length;
        if (details) dom -= details.getElementsByTagName('*').length + 1;
        var navigation = perf.getEntriesByType('navigation')[0];
        var ressources = perf.getEntriesByType('resource');
        var octets = navigation ? poids(navigation) : 0;
        var inconnues = 0;
        var lourdes = [];

        for (var i = 0; i < ressources.length; i++) {
            var p = poids(ressources[i]);
            if (p) lourdes.push([ressources[i].name, p]);
            else inconnues++; // fichier externe qui ne donne pas sa taille
            octets += p;
        }

        var requetes = ressources.length + 1;
        var ko = octets / 1000;

        // Formule EcoIndex : le DOM compte triple, les requêtes double
        var brut = Math.max(0, 100 - 5 * (3 * quantile(Q_DOM, dom) + 2 * quantile(Q_REQ, requetes) + quantile(Q_KO, ko)) / 6);
        var score = Math.round(brut);
        var note = NOTES[0];
        for (var j = 0; brut <= note[0]; j++) note = NOTES[j + 1];
        var ges = 2 + 2 * (50 - brut) / 100;
        var eau = 3 + 3 * (50 - brut) / 100;

        return { dom: dom, requetes: requetes, ko: ko, inconnues: inconnues, lourdes: lourdes,
            score: score, note: note, ges: ges, eau: eau };
    }

    var NBSP = ' ';
    function unite(n, decimales, u) {
        return nombre(n, decimales) + NBSP + u;
    }

    var ECOINDEX = '<span translate="no">EcoIndex</span>';
    var CO2E = 'g' + NBSP + 'CO₂e';

    var SEP = '<span class="visually-hidden">' + NBSP + ':' + NBSP + '</span>';
    var ESPACE = '<span class="visually-hidden">' + NBSP + '</span>';

    // Contenu du badge
    function resume(m) {
        return '<span class="eco-badge__fleche" style="--eco-note:' + m.note[2] + '" aria-hidden="true"></span>' +
            '<span class="eco-badge__texte">' + ECOINDEX + ' <strong>' + m.note[1] + '</strong> ' + m.score + '/100' +
            '<span class="eco-badge__ges"> · ' + unite(m.ges, 2, CO2E) + '</span>' +
            '<span class="visually-hidden">, empreinte estimée de cette page</span></span>' +
            '<span class="eco-badge__chevron" aria-hidden="true"></span>';
    }

    // Réglette de G à A en 7 cases égales. L'étiquette du score se place dans la case
    // de la note, selon la position du score dans sa plage (90 = milieu de A, 80-100).
    function echelle(m) {
        var zones = '';
        var position = 50;
        for (var i = NOTES.length - 1; i >= 0; i--) {
            var ici = NOTES[i][1] === m.note[1];
            zones += '<span class="eco-jauge__zone' + (ici ? ' eco-jauge__zone--ici' : '') +
                '" style="--eco-note:' + NOTES[i][2] + '">' + NOTES[i][1] + '</span>';
            if (ici) {
                var haut = i === 0 ? 100 : NOTES[i - 1][0];
                var bas = Math.max(NOTES[i][0], 0);
                var dans = Math.min(Math.max((m.score - bas) / (haut - bas), 0), 1);
                position = (NOTES.length - 1 - i + dans) / NOTES.length * 100;
            }
        }
        var plage = (m.note[0] < 0 ? 0 : m.note[0]) + NBSP + 'à' + NBSP + (m.note[1] === 'A' ? 100 :
            NOTES[NOTES.indexOf(m.note) - 1][0]);
        return '<div class="eco-jauge">' +
            '<p class="visually-hidden">Note ' + m.note[1] + NBSP + ': score de ' + m.score + ' sur 100 ' +
            '(la note ' + m.note[1] + ' couvre les scores de ' + plage + '). Échelle de G, 0, à A, 100.</p>' +
            '<div class="eco-jauge__piste" aria-hidden="true" style="--eco-position:' + position.toFixed(1) + '">' +
            '<span class="eco-jauge__repere">' + m.score + '/100</span>' + zones + '</div>' +
            '<div class="eco-jauge__bornes" aria-hidden="true"><span>0</span><span>100</span></div>' +
            '</div>';
    }

    // Une mesure comparée à son objectif. Jauge de 0 à 2 fois l'objectif (trait central = objectif).
    function mesure(libelle, valeur, objectif, u) {
        var depasse = valeur > objectif;
        var largeur = Math.min(valeur / (2 * objectif), 1) * 100;
        return '<li class="eco-mesure' + (depasse ? ' eco-mesure--depasse' : '') + '">' +
            '<span class="eco-mesure__libelle">' + libelle + '</span>' + SEP +
            '<span class="eco-mesure__valeur">' + (u ? unite(valeur, 1, u) : nombre(valeur)) +
            '<span class="eco-mesure__objectif"> /' + NBSP + nombre(objectif) + '</span>' +
            '<span class="visually-hidden">, objectif ' + (depasse ? 'dépassé' : 'respecté') + '</span></span>' +
            '<span class="eco-mesure__jauge" aria-hidden="true"><span style="width:' + largeur.toFixed(1) + '%"></span></span>' +
            '</li>';
    }

    // Contenu du panneau de détail
    function panneau(m) {
        // Les 3 fichiers les plus lourds, avec leur part du poids total de la page
        m.lourdes.sort(function (a, b) { return b[1] - a[1]; });
        var top = '';
        for (var k = 0; k < Math.min(3, m.lourdes.length); k++) {
            var ko = m.lourdes[k][1] / 1000;
            var part = Math.min(ko / m.ko * 100, 100);
            top += '<li><span class="eco-lourds__nom" translate="no">' + echapper(nomRessource(m.lourdes[k][0])) + '</span>' + SEP +
                '<span class="eco-lourds__poids">' + unite(ko, 1, 'Ko') + ' · ' + unite(part, 0, '%') +
                '<span class="visually-hidden">' + NBSP + 'de la page</span></span>' +
                '<span class="eco-lourds__jauge" aria-hidden="true"><span style="width:' + part.toFixed(1) + '%"></span></span></li>';
        }
        return '<div class="eco-badge__panel">' +
            '<p class="eco-badge__titre">Empreinte de cette page</p>' +
            echelle(m) +
            '<div class="eco-impact">' +
            '<p><strong>' + unite(m.ges, 2, CO2E) + '</strong>' + ESPACE + '<span>émis par visite</span></p>' +
            '<p><strong>' + unite(m.eau, 2, 'cl') + '</strong>' + ESPACE + '<span>d\'eau par visite</span></p>' +
            '</div>' +
            '<ul class="eco-mesures">' +
            mesure('Éléments de la page', m.dom, 600) +
            mesure('Requêtes', m.requetes, 40) +
            mesure('Poids transféré', m.ko, 1024, 'Ko') +
            '</ul>' +
            (top ? '<p class="eco-badge__sous-titre">Fichiers les plus lourds <span>(part du poids de la page)</span></p><ol class="eco-lourds">' + top + '</ol>' : '') +
            (m.inconnues ? '<p class="eco-badge__discret">' + m.inconnues +
                ' fichier(s) externe(s) de taille inconnue non compté(s) dans le poids.</p>' : '') +
            '<p><a href="https://www.ecoindex.fr/" rel="noopener">Mesure officielle sur <span translate="no">ecoindex.fr</span></a>' +
            ' · <a href="' + racine + 'pages/outils.html">Découvrir les outils</a></p>' +
            '<p class="eco-badge__discret">Méthode ' + ECOINDEX + NBSP + ': <span translate="no">GreenIT.fr</span> / ' +
            'Collectif Conception Numérique Responsable. Coefficients GES et eau © Frédéric Bordage.</p>' +
            '</div>';
    }

    // Crée le badge dans le footer
    function afficher() {
        details = document.createElement('details');
        details.className = 'eco-badge';
        var affiche = resume(mesurer());
        details.innerHTML = '<summary>' + affiche + '</summary>';
        var summary = details.firstChild;

        // À chaque ouverture : nouvelle mesure et panneau reconstruit
        details.addEventListener('toggle', function () {
            var ancien = details.querySelector('.eco-badge__panel');
            if (ancien) details.removeChild(ancien);
            if (!details.open) return;
            var m = mesurer();
            var html = resume(m);
            if (html !== affiche) summary.innerHTML = affiche = html;
            details.insertAdjacentHTML('beforeend', panneau(m));
        });

        // Échap referme le panneau
        details.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && details.open) {
                details.open = false;
                summary.focus();
            }
        });

        footer.appendChild(details);
    }

    function lancer() {
        if (window.requestIdleCallback) window.requestIdleCallback(afficher, { timeout: 3000 });
        else setTimeout(afficher, 1);
    }

    // Premier calcul une fois la page et les polices chargées
    function quandPret() {
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(lancer, lancer);
        else lancer();
    }

    if (document.readyState === 'complete') quandPret();
    else window.addEventListener('load', quandPret, { once: true });
})();
