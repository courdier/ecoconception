/*
 * Interface de l'atelier « Génération d'images par IA et écoconception ».
 *
 * - Lit les données de window.ATELIER_IA_DATA (atelierIaImagesData.js).
 * - Aucune dépendance, aucune requête réseau hormis le chargement des images
 *   réellement affichées (les images non visibles ne sont jamais téléchargées).
 * - Le rendu est fait une seule fois au chargement ; les interactions ne font
 *   ensuite que basculer des classes ou mettre à jour quelques nœuds.
 */
(function () {
    "use strict";

    const DATA = window.ATELIER_IA_DATA;
    if (!DATA) {
        return;
    }

    const CONFIGS = DATA.configurations;
    const REFERENCE_PIXELS = 512 * 512;

    /* Libellé de chaque statut (le symbole est ajouté en CSS) : jamais la couleur seule. */
    const STATUTS = {
        "mesure": "Mesuré",
        "estime": "Estimation théorique",
        "simule": "Valeur simulée",
        "non-mesure": "Donnée non mesurée"
    };

    const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 3 });

    function esc(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function badge(statut) {
        const cle = STATUTS[statut] ? statut : "non-mesure";
        return `<span class="ia-badge ia-badge--${cle}">${STATUTS[cle]}</span>`;
    }

    /* Énergie (Wh) = Puissance moyenne (W) × Durée (h). */
    function energieWh(mesure) {
        if (typeof mesure.energieWh === "number") {
            return mesure.energieWh;
        }
        if (typeof mesure.puissanceMoyenneW === "number" && typeof mesure.tempsSecondes === "number") {
            return mesure.puissanceMoyenneW * (mesure.tempsSecondes / 3600);
        }
        return null;
    }

    /*
     * Indice de calcul théorique : (pixels / 512²) × étapes, ramené à 100 pour la
     * configuration la plus coûteuse. Hypothèse volontairement simplifiée,
     * affichée comme une estimation et jamais comme une mesure.
     */
    const indicesBruts = CONFIGS.map(c => (c.largeur * c.hauteur / REFERENCE_PIXELS) * c.etapes);
    const indiceMax = Math.max.apply(null, indicesBruts);
    function indiceCalcul(config) {
        const brut = (config.largeur * config.hauteur / REFERENCE_PIXELS) * config.etapes;
        return (brut / indiceMax) * 100;
    }

    function valeurMesure(statut, valeur, unite, ecart) {
        if (statut === "non-mesure" || valeur === null || valeur === undefined) {
            return badge("non-mesure");
        }
        const plusMoins = typeof ecart === "number" ? ` ± ${nf.format(ecart)}` : "";
        return `${nf.format(valeur)}${plusMoins} ${esc(unite)} ${badge(statut)}`;
    }

    /* Cellule de tableau : le statut est porté par la cellule elle-même (moins de nœuds DOM). */
    function cellule(statut, valeur, unite) {
        if (statut === "non-mesure" || valeur === null || valeur === undefined) {
            return `<td class="ia-cell ia-cell--non-mesure">${STATUTS["non-mesure"]}</td>`;
        }
        const cle = STATUTS[statut] ? statut : "non-mesure";
        return `<td class="ia-cell ia-cell--${cle}">${nf.format(valeur)} ${esc(unite)} (${STATUTS[cle]})</td>`;
    }

    function ligneIndicateurs(config) {
        const m = config.mesure;
        const e = energieWh(m);
        const indice = indiceCalcul(config);
        return {
            resolution: `${config.largeur} × ${config.hauteur} px`,
            pixels: `${nf.format(config.largeur * config.hauteur / 1e6)} million${config.largeur * config.hauteur >= 2e6 ? "s" : ""} de pixels`,
            etapes: `${config.etapes} étapes`,
            temps: valeurMesure(m.statut, m.tempsSecondes, "s", m.tempsEcartType),
            energie: valeurMesure(m.statut, e, "Wh", m.energieEcartType),
            energieValeur: m.statut === "mesure" ? e : null,
            qualite: valeurMesure(config.qualite.statut, config.qualite.valeur, ""),
            indice: indice,
            indiceTexte: `${nf.format(Math.round(indice * 10) / 10)} / 100`
        };
    }

    /* Ligne « puissance moyenne » du détail, seulement si elle a été mesurée. */
    function lignePuissance(m) {
        if (m.statut !== "mesure" || typeof m.puissanceMoyenneW !== "number") {
            return "";
        }
        return `<dt>Puissance moyenne de la carte</dt><dd>${nf.format(m.puissanceMoyenneW)} W ${badge("mesure")}</dd>`;
    }

    /* ── 1. Schéma du débruitage ───────────────────────────────────────── */
    function initDebruitage() {
        const range = document.getElementById("ia-denoise-range");
        const img = document.getElementById("ia-denoise-img");
        const caption = document.getElementById("ia-denoise-caption");
        const etat = document.getElementById("ia-denoise-state");
        if (!range || !img || !caption) {
            return;
        }
        const etats = DATA.debruitage;
        range.max = String(etats.length - 1);

        function maj() {
            const i = Number(range.value);
            img.src = etats[i].src;
            img.alt = `Schéma du débruitage, état ${i} sur ${etats.length - 1} : ${etats[i].legende}`;
            caption.textContent = etats[i].legende;
            etat.textContent = `État ${i} / ${etats.length - 1}`;
            range.setAttribute("aria-valuetext", `État ${i} sur ${etats.length - 1} : ${etats[i].legende}`);
        }
        range.addEventListener("input", maj);
        maj();
    }

    /* ── 2. Sélection d'une configuration ──────────────────────────────── */
    function renderDetail(config) {
        const l = ligneIndicateurs(config);
        const lienPleineTaille = config.image.pleineTaille
            ? `<a class="ia-fullsize-link" href="${esc(config.image.pleineTaille)}" target="_blank" rel="noopener">
                   Ouvrir l'image en ${config.largeur} × ${config.hauteur} px (${config.image.pleineTailleKo || "?"} Ko)
                   <span class="sr-only">(nouvel onglet)</span></a>`
            : "";
        return `
            <div class="ia-detail-media">
                <img src="${esc(config.image.apercu)}" alt="${esc(config.image.alt)}"
                     width="512" height="512" decoding="async">
                <p class="ia-image-label">Image réellement générée lors de la mesure (essai n° 1)</p>
                ${lienPleineTaille}
            </div>
            <div class="ia-detail-body">
                <p class="ia-detail-kicker">Configuration ${esc(config.lettre)}</p>
                <h3 id="ia-detail-title">${esc(config.nom)}</h3>
                <p class="ia-detail-summary">${esc(config.resume)}</p>

                <div class="ia-param-cards">
                    <p class="ia-param-card">Résolution<strong>${esc(l.resolution)}</strong>${esc(l.pixels)}</p>
                    <p class="ia-param-card">Étapes de débruitage<strong>${config.etapes}</strong>passages du modèle</p>
                </div>

                <dl class="ia-measures">
                    <dt>Temps de génération</dt><dd>${l.temps}</dd>
                    <dt>Consommation énergétique</dt><dd>${l.energie}</dd>
                    ${lignePuissance(config.mesure)}
                    <dt>Qualité visuelle (score)</dt><dd>${l.qualite}</dd>
                    <dt>Volume de calcul relatif</dt>
                    <dd>${esc(l.indiceTexte)} ${badge("estime")}</dd>
                </dl>

                <h4>Méthode</h4>
                <p>${esc(config.methode)}</p>
                <p class="ia-vigilance" role="note"><strong>Point de vigilance :</strong> ${esc(config.vigilance)}</p>
                <p class="ia-expected"><strong>Qualité observée :</strong> ${esc(config.qualite.attendu)}</p>
            </div>`;
    }

    function initSelection() {
        const selector = document.getElementById("ia-config-selector");
        const detail = document.getElementById("ia-config-detail");
        if (!selector || !detail) {
            return;
        }

        selector.innerHTML = CONFIGS.map((c, i) => `
            <label class="ia-choice">
                <input type="radio" name="ia-config" value="${esc(c.id)}" ${i === 0 ? "checked" : ""}>
                <span class="ia-choice-box" data-lettre="${esc(c.lettre)}"><strong>${esc(c.nom)}</strong>${c.largeur} × ${c.hauteur} px · ${c.etapes} étapes</span>
            </label>`).join("");

        function afficher(id) {
            const config = CONFIGS.find(c => c.id === id) || CONFIGS[0];
            detail.innerHTML = renderDetail(config);
        }

        selector.addEventListener("change", event => {
            if (event.target.name === "ia-config") {
                afficher(event.target.value);
            }
        });
        afficher(CONFIGS[0].id);
    }

    /* ── 3. Comparaison côte à côte ────────────────────────────────────── */
    function initComparaison() {
        const grid = document.getElementById("ia-compare-grid");
        const tbody = document.getElementById("ia-compare-tbody");
        const toggle = document.getElementById("ia-view-toggle");
        const legende = document.getElementById("ia-view-legend");
        if (!grid || !tbody) {
            return;
        }

        const energiesMesurees = CONFIGS.map(c => ligneIndicateurs(c).energieValeur).filter(v => typeof v === "number");
        const energieMax = energiesMesurees.length ? Math.max.apply(null, energiesMesurees) : null;

        grid.innerHTML = CONFIGS.map(c => {
            const l = ligneIndicateurs(c);
            const barreEnergie = energieMax && typeof l.energieValeur === "number"
                ? `<p class="ia-meter ia-meter--mesure" style="--ia-part:${Math.max(l.energieValeur / energieMax * 100, 1.5).toFixed(1)}%">Énergie mesurée : ${nf.format(l.energieValeur)} Wh par image</p>`
                : "";
            return `
            <article class="ia-compare-card">
                <h3>${esc(c.lettre)} · ${esc(c.nom)}</h3>
                <p class="ia-compare-params">${esc(l.resolution)} · ${c.etapes} étapes</p>
                <img class="ia-view-whole" src="${esc(c.image.apercu)}" alt="${esc(c.image.alt)}"
                     width="512" height="512" loading="lazy" decoding="async">
                <img class="ia-view-detail" data-src="${esc(c.image.detail)}" alt="${esc(c.image.altDetail)}"
                     width="${c.image.detailTaille}" height="${c.image.detailTaille}" decoding="async" hidden>
                <p class="ia-meter" style="--ia-part:${Math.max(l.indice, 1.5).toFixed(1)}%">Volume de calcul relatif (estimation) : ${esc(l.indiceTexte)}</p>
                ${barreEnergie}
            </article>`;
        }).join("");

        tbody.innerHTML = CONFIGS.map(c => {
            const l = ligneIndicateurs(c);
            return `
            <tr>
                <th scope="row">${esc(c.lettre)} — ${esc(c.nom)}</th>
                <td>${esc(l.resolution)}</td>
                <td>${c.etapes}</td>
                ${cellule(c.mesure.statut, c.mesure.tempsSecondes, "s")}
                ${cellule(c.mesure.statut, energieWh(c.mesure), "Wh")}
                ${cellule(c.qualite.statut, c.qualite.valeur, "")}
                <td class="ia-cell ia-cell--estime">${esc(l.indiceTexte)}</td>
            </tr>`;
        }).join("");

        if (!toggle) {
            return;
        }
        toggle.addEventListener("change", event => {
            const detail = event.target.value === "detail";
            grid.classList.toggle("is-detail", detail);
            grid.querySelectorAll("img.ia-view-detail").forEach(img => {
                // Les recadrages ne sont téléchargés qu'à la première demande.
                if (detail && !img.getAttribute("src")) {
                    img.src = img.dataset.src;
                }
            });
            grid.querySelectorAll(".ia-view-whole").forEach(el => { el.hidden = detail; });
            grid.querySelectorAll(".ia-view-detail").forEach(el => { el.hidden = !detail; });
            if (legende) {
                legende.textContent = detail
                    ? "Vue détail : la même zone relative de chaque image (un quart de sa largeur), en pixels réels agrandis : 256 × 256 px pour A, 128 × 128 px pour B et C."
                    : "Vue d'ensemble : les trois images sont affichées à la même taille.";
            }
        });
    }

    /* ── 4. Calculateur d'énergie ──────────────────────────────────────── */
    function initCalculateur() {
        const form = document.getElementById("ia-calc");
        const out = document.getElementById("ia-calc-result");
        if (!form || !out) {
            return;
        }
        const puissance = form.elements["ia-calc-power"];
        const duree = form.elements["ia-calc-duration"];
        const nombre = form.elements["ia-calc-count"];

        function lire(input) {
            const v = parseFloat(String(input.value).replace(",", "."));
            return Number.isFinite(v) && v >= 0 ? v : null;
        }

        function maj() {
            const p = lire(puissance);
            const t = lire(duree);
            const n = lire(nombre) || 1;
            if (p === null || t === null) {
                out.textContent = "Renseignez une puissance et une durée pour lancer le calcul.";
                return;
            }
            const parImage = p * (t / 3600);
            const total = parImage * n;
            out.innerHTML =
                `${nf.format(p)} W × ${nf.format(t)} s ÷ 3 600 = <strong>${nf.format(parImage)} Wh</strong> par image` +
                (n > 1 ? `, soit <strong>${nf.format(total)} Wh</strong> pour ${nf.format(n)} images.` : ".") +
                ` <span class="ia-calc-note">Résultat calculé à partir de vos valeurs : ce n'est une mesure que si elles ont été mesurées.</span>`;
        }

        form.addEventListener("input", maj);
        form.addEventListener("submit", event => event.preventDefault());
        maj();
    }

    /* ── 5. Ce que disent les mesures (texte calculé à partir des données) ── */
    function initLecon() {
        const lecon = document.getElementById("ia-lecon-mesure");
        const contexte = document.getElementById("ia-mesure-contexte");
        const ctx = DATA.contexteMesures;
        if (contexte && ctx) {
            contexte.textContent =
                `Mesures réalisées le ${ctx.date} sur ${ctx.materiel} (${ctx.logiciel}). ${ctx.protocole} ` +
                `Au repos, la carte consomme déjà environ ${nf.format(ctx.puissanceReposW)} W. ` +
                "Ces valeurs sont propres à cette machine : ce sont surtout les écarts entre configurations qui comptent.";
        }
        const a = CONFIGS[0].mesure;
        const b = CONFIGS[1].mesure;
        if (!lecon || a.statut !== "mesure" || b.statut !== "mesure") {
            return;
        }
        const un = v => nf.format(Math.round(v * 10) / 10);
        lecon.textContent =
            `Mesuré sur notre machine : la configuration A prend ${un(a.tempsSecondes / b.tempsSecondes)} fois plus de temps que B, ` +
            `mais consomme ${un(energieWh(a) / energieWh(b))} fois plus d'énergie. ` +
            `La carte y travaille en effet à pleine charge (${nf.format(Math.round(a.puissanceMoyenneW))} W en moyenne contre ` +
            `${nf.format(Math.round(b.puissanceMoyenneW))} W) : se fier au seul temps aurait fortement sous-estimé l'écart.`;
    }

    document.addEventListener("DOMContentLoaded", () => {
        initDebruitage();
        initSelection();
        initComparaison();
        initCalculateur();
        initLecon();
    });
})();
