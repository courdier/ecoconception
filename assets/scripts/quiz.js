(() => {
    const get = selector => document.querySelector(selector);
    const welcome = get('[data-welcome]');
    const start = get('[data-start]');
    const quizCard = get('[data-quiz-card]');
    const questionsView = get('[data-questions-view]');
    const results = get('[data-results]');
    const title = get('#question-title');
    const options = get('[data-options]');
    const feedback = get('[data-feedback]');
    const glossary = get('[data-glossary]');
    const answerMessage = get('[data-answer-message]');
    const previous = get('[data-previous]');
    const validate = get('[data-validate]');
    const next = get('[data-next]');
    const recommendations = get('#recommendations-list');
    const plan = get('#action-plan');
    const planItems = get('#action-plan-list');
    const planMessage = get('#action-plan-message');
    const legacyTotal = get('[data-legacy-total]');
    const legacyPanel = legacyTotal.closest('details');

    const answers = new Map();
    const drafts = new Map();
    const chosenActions = new Set();
    let step = 0;
    let editingFromCarbon = false;

    function updateFeedback() {
        const question = questions[step];
        const savedIndex = answers.get(question.id);
        const isValidated = savedIndex !== undefined && savedIndex === drafts.get(question.id);

        feedback.hidden = !isValidated;
        validate.hidden = isValidated;
        next.hidden = !isValidated;
        answerMessage.textContent = '';
        if (!isValidated) return;

        const answer = question.options[savedIndex];
        get('[data-answer]').textContent = `Votre réponse : ${answer.label}`;
        get('[data-info]').textContent = answer.info;
        get('[data-recommendation]').textContent = answer.recommendation;
        const source = get('[data-source-link]');
        source.textContent = question.source.label;
        source.href = question.source.url;
        get('[data-source-date]').textContent = ` — consulté le ${question.source.consultedAt}`;

        glossary.hidden = !question.glossary;
        if (question.glossary) {
            const link = glossary.querySelector('a');
            link.href = `./terminologie.html#${question.glossary}`;
            link.textContent = question.glossary.replaceAll('_', ' ');
        }
    }

    function showView(view) {
        if (welcome) welcome.hidden = view !== welcome;
        questionsView.hidden = view !== questionsView;
        results.hidden = view !== results;
        quizCard?.classList.toggle('question-mode', view === questionsView);
    }

    function showQuestion(moveFocus = true) {
        const question = questions[step];
        title.textContent = question.question;
        get('[data-progress-text]').textContent = `Question ${step + 1} sur ${questions.length}`;
        get('[data-progress-bar]').style.width = `${(step + 1) / questions.length * 100}%`;
        previous.hidden = step === 0 || editingFromCarbon;
        next.textContent = editingFromCarbon ? 'Retour au bilan'
            : step === questions.length - 1 ? 'Voir mon bilan' : 'Question suivante';

        options.replaceChildren(...question.options.map((answer, index) => {
            const label = document.createElement('label');
            label.className = question.icon ? 'option-button' : 'answer-option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz-answer';
            radio.value = index;
            radio.checked = drafts.get(question.id) === index;
            radio.addEventListener('change', () => {
                drafts.set(question.id, index);
                updateFeedback();
            });
            label.append(radio);

            if (question.icon) {
                const icon = document.createElement('span');
                icon.className = 'option-icon';
                icon.setAttribute('aria-hidden', 'true');
                icon.textContent = question.icon;
                label.append(icon);
            }

            const text = document.createElement('span');
            text.textContent = answer.label;
            label.append(text);
            return label;
        }));
        updateFeedback();
        showView(questionsView);
        if (moveFocus) title.focus();
    }

    validate.addEventListener('click', () => {
        const { id } = questions[step];
        const draft = drafts.get(id);
        if (draft === undefined) {
            answerMessage.textContent = 'Sélectionnez une réponse avant de valider.';
            options.querySelector('input').focus();
            return;
        }

        if (answers.get(id) !== draft) chosenActions.delete(id);
        answers.set(id, draft);
        updateFeedback();
        feedback.focus();
    });

    previous.addEventListener('click', () => {
        step -= 1;
        showQuestion();
    });

    next.addEventListener('click', () => {
        if (editingFromCarbon || step === questions.length - 1) {
            showResults();
        } else {
            step += 1;
            showQuestion();
        }
    });

    function selectedRecommendations() {
        return questions.filter(question => chosenActions.has(question.id))
            .map(question => question.options[answers.get(question.id)].recommendation);
    }

    function updateCount() {
        const count = chosenActions.size;
        get('#actions-count').textContent = count === 0
            ? 'Aucune action sélectionnée.'
            : `${count} ${count === 1 ? 'action sélectionnée' : 'actions sélectionnées'}.`;
    }

    function showResults() {
        recommendations.replaceChildren(...questions.filter(question => answers.has(question.id)).map(question => {
            const answer = question.options[answers.get(question.id)];
            const item = document.createElement('li');
            const title = document.createElement('strong');
            title.textContent = question.question;
            const reminder = document.createElement('p');
            reminder.textContent = `Votre réponse : ${answer.label}`;

            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = chosenActions.has(question.id);
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    chosenActions.add(question.id);
                } else {
                    chosenActions.delete(question.id);
                }
                updateCount();
                planMessage.textContent = '';
                if (!plan.hidden) renderPlan();
            });
            const text = document.createElement('span');
            text.textContent = answer.recommendation;
            label.append(checkbox, text);
            item.append(title, reminder, label);
            return item;
        }));
        updateCount();
        showLegacyCarbon();
        plan.hidden = true;
        planItems.replaceChildren();
        planMessage.textContent = '';
        showView(results);
        if (editingFromCarbon) {
            legacyPanel.querySelector('summary').focus();
        } else {
            get('#results-title').focus();
        }
        editingFromCarbon = false;
        step = questions.length - 1;
    }

    function showLegacyCarbon() {
        const heading = get('[data-legacy-title]');
        const coverage = get('[data-legacy-coverage]');
        const comparisons = get('[data-legacy-comparisons]');
        const details = get('[data-legacy-values]');
        const blockers = get('[data-legacy-blockers]');
        legacyPanel.open = editingFromCarbon;
        comparisons?.replaceChildren();
        const entries = questions.map((question, index) => {
            const answerIndex = answers.get(question.id);
            return {
                index,
                question,
                answer: question.options[answerIndex],
                value: legacyCarbon[question.id]?.[answerIndex]
            };
        });
        const known = entries.filter(({ value }) => Number.isFinite(value));
        const blocked = entries.filter(({ value }) => !Number.isFinite(value));
        blockers.replaceChildren(...blocked.map(({ index, question, answer }) => {
            const item = document.createElement('li');
            const description = document.createElement('p');
            description.textContent = answer
                ? `${question.question} Réponse validée : ${answer.label}. Aucun coefficient historique.`
                : `${question.question} Aucune réponse validée.`;
            description.id = `legacy-blocker-${question.id}`;

            const edit = document.createElement('button');
            edit.type = 'button';
            edit.className = 'button';
            edit.textContent = answer ? 'Modifier la réponse' : 'Répondre à la question';
            edit.setAttribute('aria-describedby', description.id);
            edit.addEventListener('click', () => {
                editingFromCarbon = true;
                step = index;
                showQuestion();
            });
            item.append(description, edit);
            return item;
        }));
        if (details) {
            details.replaceChildren(...known.map(({ question, answer, value }) => {
                const item = document.createElement('li');
                item.textContent = `${question.question} — ${answer.label} — ${value} kg de CO₂`;
                return item;
            }));
        }
        if (known.length === 0) {
            heading.textContent = 'Estimation carbone indisponible';
            legacyTotal.textContent = 'Aucune réponse ne fournit de coefficient exploitable dans le barème historique.';
            coverage.textContent = '';
            return;
        }

        const partial = blocked.length > 0;
        heading.textContent = partial ? 'Résultat carbone partiel' : 'Résultat carbone historique complet';
        coverage.textContent = `Calculé sur ${known.length} ${known.length === 1 ? 'réponse' : 'réponses'} sur ${entries.length}.`;
        if (partial) {
            coverage.textContent += ' Les questions listées ci-dessous sont exclues du calcul.';
            coverage.textContent += details
                ? ' La comparaison à l’ancienne référence porte sur cette estimation partielle.'
                : ' Les équivalences portent sur cette estimation partielle.';
        }
        const sum = known.reduce((subtotal, { value }) => subtotal + value, 0);
        const format = (value, decimals) => value.toLocaleString('fr-FR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
        if (details) {
            const annualEstimate = sum * 10;
            legacyTotal.textContent = `${format(annualEstimate, 1)} kg de CO₂e par an, soit ${format(annualEstimate / 9900 * 100, 1)} % de l’ancienne référence de 9,9 t de CO₂e par an.`;
            return;
        }

        legacyTotal.textContent = `${format(sum, 2)} kg de CO₂e.`;
        const equivalents = [
            [sum / 70, 'smartphones utilisés pendant un an'],
            [sum / (78 * 0.24), 'trajets Saint-Pierre → Saint-Denis en voiture'],
            [sum / 1500, 'allers-retours Réunion → Paris en avion'],
            [sum / 120, 'ordinateurs fabriqués']
        ];
        equivalents.forEach(([value, label]) => {
            const item = document.createElement('li');
            item.textContent = `${format(value, 2)} ${label}`;
            comparisons.append(item);
        });
    }

    function renderPlan() {
        planItems.replaceChildren(...selectedRecommendations().map(action => {
            const item = document.createElement('li');
            item.textContent = action;
            return item;
        }));

        plan.hidden = planItems.childElementCount === 0;
        if (plan.hidden) {
            planMessage.textContent = 'Cochez au moins une action pour créer votre plan.';
        }
        return !plan.hidden;
    }

    get('#show-plan-button').addEventListener('click', () => {
        planMessage.textContent = '';
        if (renderPlan()) get('#action-plan-title').focus();
    });

    function clearPrint() {
        document.body.classList.remove('printing-action-plan');
        get('#action-plan-print')?.remove();
    }

    get('#print-plan-button').addEventListener('click', () => {
        if (!renderPlan()) return;
        clearPrint();

        const printSection = document.createElement('section');
        printSection.id = 'action-plan-print';
        const printTitle = document.createElement('h1');
        printTitle.textContent = 'Mon plan d’action numérique';
        const printList = planItems.cloneNode(true);
        printList.removeAttribute('id');
        printSection.append(printTitle, printList);
        document.body.append(printSection);
        document.body.classList.add('printing-action-plan');
        window.print();
    });
    window.addEventListener('afterprint', clearPrint);

    get('[data-review]').addEventListener('click', () => showQuestion());
    get('[data-restart]').addEventListener('click', () => {
        step = 0;
        answers.clear();
        drafts.clear();
        chosenActions.clear();
        recommendations.replaceChildren();
        planItems.replaceChildren();
        plan.hidden = true;
        planMessage.textContent = '';
        updateCount();
        clearPrint();
        if (welcome) {
            showView(welcome);
            start.focus();
        } else {
            showQuestion();
        }
    });

    if (start) {
        start.addEventListener('click', () => showQuestion());
        showView(welcome);
    } else {
        showQuestion(false);
    }
})();
