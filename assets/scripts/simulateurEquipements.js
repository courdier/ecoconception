/*
 * Simulateur : empreinte carbone annuelle de mes équipements numériques.
 *
 * Principe d'écoconception : JavaScript natif, aucune bibliothèque, aucune requête réseau.
 * Les données de référence (kg eq. CO2) sont lues dans les attributs data-* du HTML :
 *   data-fabrication : empreinte de fabrication d'un appareil
 *   data-usage       : usage (électricité) + fin de vie sur toute la durée de référence
 *   data-duree-ref   : durée de vie de référence de l'étude ADEME / Arcep (années)
 *
 * Formule, pour un type d'appareil :
 *   empreinte annuelle = nombre × (fabrication ÷ durée de vie + usage ÷ durée de référence)
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const formulaire = document.getElementById('sim-form');
    if (!formulaire) { return; }

    const KG_CO2_PAR_KM_VOITURE = 0.112; // 112 g eq. CO2 par km (Benchmark Green IT 2021)
    const BUDGET_SOUTENABLE_KG = 1700;    // budget carbone annuel soutenable par personne (cours Eco-TIC)

    const entier = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
    const decimal = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
    const parId = (id) => document.getElementById(id);

    // Les éléments de la page sont recherchés une seule fois, puis réutilisés à chaque calcul.
    const appareils = Array.from(formulaire.querySelectorAll('.sim-device')).map((ligne) => ({
        ligne: ligne,
        fabrication: Number(ligne.dataset.fabrication),
        usage: Number(ligne.dataset.usage),
        dureeRef: Number(ligne.dataset.dureeRef),
        champQuantite: ligne.querySelector('[name="quantite"]'),
        champDuree: ligne.querySelector('[name="duree"]'),
        valeur: ligne.querySelector('.sim-device-kg strong'),
        barre: ligne.querySelector('.sim-device-bar span')
    }));

    const sortie = {
        total: parId('sim-total'),
        anneau: parId('sim-ring'),
        partFabrication: parId('sim-fab-pct'),
        partUsage: parId('sim-use-pct'),
        km: parId('sim-km'),
        budget: parId('sim-budget'),
        curseur: parId('sim-extra'),
        curseurTexte: parId('sim-extra-label'),
        maintenant: parId('sim-now'),
        nouveauNom: parId('sim-new-label'),
        nouveauTotal: parId('sim-new-total'),
        nouveauBarre: parId('sim-bar-new'),
        gain: parId('sim-gain')
    };

    // Lit un champ numérique et borne la valeur : un champ vide ou invalide prend la valeur par défaut.
    function lireNombre(champ, min, max, defaut) {
        const valeur = parseFloat(String(champ.value).replace(',', '.'));
        if (Number.isNaN(valeur)) { return defaut; }
        return Math.min(max, Math.max(min, valeur));
    }

    // Empreinte annuelle (kg eq. CO2) d'un type d'appareil.
    function empreinteAnnuelle(appareil, quantite, duree) {
        const fabrication = quantite * appareil.fabrication / duree;
        const usage = quantite * appareil.usage / appareil.dureeRef;
        return { fabrication: fabrication, usage: usage, total: fabrication + usage };
    }

    function calculer() {
        const anneesEnPlus = lireNombre(sortie.curseur, 0, 5, 0);
        let fabrication = 0;
        let usage = 0;
        let totalProlonge = 0;

        const parAppareil = appareils.map((appareil) => {
            const quantite = Math.round(lireNombre(appareil.champQuantite, 0, 20, 0));
            const duree = lireNombre(appareil.champDuree, 0.5, 20, appareil.dureeRef);
            const empreinte = empreinteAnnuelle(appareil, quantite, duree);
            fabrication += empreinte.fabrication;
            usage += empreinte.usage;
            totalProlonge += empreinteAnnuelle(appareil, quantite, duree + anneesEnPlus).total;
            return { quantite: quantite, total: empreinte.total };
        });

        const total = fabrication + usage;
        const partFabrication = total > 0 ? fabrication / total * 100 : 0;
        const partUsage = total > 0 ? 100 - partFabrication : 0;
        const gain = total - totalProlonge;
        const gainPourcent = total > 0 ? gain / total * 100 : 0;
        const anneesTexte = decimal.format(anneesEnPlus) + (anneesEnPlus >= 2 ? ' ans' : ' an');

        // Résultat : l'anneau se redessine grâce à une seule variable CSS
        sortie.total.textContent = entier.format(total);
        sortie.anneau.style.setProperty('--fab', partFabrication + '%');
        sortie.anneau.classList.toggle('is-empty', total === 0);
        sortie.anneau.setAttribute('aria-label', total === 0
            ? 'Aucun équipement renseigné'
            : 'Fabrication ' + entier.format(partFabrication) + ' %, usage et fin de vie ' + entier.format(partUsage) + ' %');
        sortie.partFabrication.textContent = entier.format(partFabrication) + ' %';
        sortie.partUsage.textContent = entier.format(partUsage) + ' %';

        // Détail par appareil : valeur et barre dans la ligne de saisie
        appareils.forEach((appareil, i) => {
            appareil.ligne.classList.toggle('is-off', parAppareil[i].quantite === 0);
            appareil.valeur.textContent = entier.format(parAppareil[i].total) + ' kg';
            appareil.barre.style.width = (total > 0 ? parAppareil[i].total / total * 100 : 0) + '%';
        });

        sortie.km.textContent = entier.format(total / KG_CO2_PAR_KM_VOITURE) + ' km';
        sortie.budget.textContent = decimal.format(total / BUDGET_SOUTENABLE_KG * 100) + ' %';

        // « Et si je les gardais plus longtemps ? »
        sortie.curseurTexte.textContent = anneesTexte;
        sortie.nouveauNom.textContent = 'Avec ' + anneesTexte + ' de plus';
        sortie.maintenant.textContent = entier.format(total) + ' kg';
        sortie.nouveauTotal.textContent = entier.format(totalProlonge) + ' kg';
        sortie.nouveauBarre.style.width = (total > 0 ? totalProlonge / total * 100 : 0) + '%';
        sortie.gain.textContent = entier.format(gain) + ' kg (' + entier.format(gainPourcent) + ' %)';
    }

    // Boutons « − » et « + » : on s'appuie sur les méthodes natives stepDown() / stepUp() du champ,
    // qui respectent déjà le pas, le minimum et le maximum.
    formulaire.addEventListener('click', (evenement) => {
        const bouton = evenement.target.closest('[data-dir]');
        if (!bouton) { return; }
        const champ = parId(bouton.dataset.for);
        if (!champ) { return; }
        if (bouton.dataset.dir === '1') { champ.stepUp(); } else { champ.stepDown(); }
        champ.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Un seul écouteur pour tout le formulaire (délégation d'événement).
    formulaire.addEventListener('input', calculer);
    // Le bouton « reset » remet les valeurs par défaut du HTML ; on recalcule juste après.
    formulaire.addEventListener('reset', () => setTimeout(calculer, 0));
    // Le formulaire ne s'envoie nulle part : tout reste dans le navigateur.
    formulaire.addEventListener('submit', (evenement) => evenement.preventDefault());

    calculer();
});
