(() => {
    if (typeof tp05Data === 'undefined' || typeof tp05Evaluator === 'undefined') return;
    const { exercises, languages } = tp05Data;
    const { evaluateExpression, parseExpression } = tp05Evaluator;

    const byId = id => document.getElementById(id);
    const form = byId('atelier');
    const languageSelect = byId('language');
    const exerciseSelect = byId('exercise');
    const answer = byId('answer');
    const feedback = byId('feedback');
    const results = byId('results');
    const solutionButton = byId('reveal-solution');
    const solutionPanel = byId('solution-panel');
    const progress = new Map();
    const format = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
    const indentation = '    ';
    const solutionDelay = 60000;
    const failedAttemptLimit = 3;
    let currentSelection;
    let leaveEditor = false;
    let solutionTimer;

    function addOptions(select, entries) {
        select.replaceChildren(...entries.map(([value, label]) => new Option(label, value)));
    }

    addOptions(languageSelect, Object.entries(languages).map(([key, language]) => [key, language.name]));
    addOptions(exerciseSelect, Object.entries(exercises).map(([key, exercise]) => [key, exercise.title]));

    function resetResults() {
        feedback.textContent = '';
        delete feedback.dataset.success;
        results.hidden = true;
    }

    function replaceAnswerRange(text, from, to, selectionStart, selectionEnd) {
        if (answer.value.length - (to - from) + text.length > answer.maxLength) return;
        const direction = answer.selectionDirection;
        answer.setSelectionRange(from, to);
        // Preserve the browser's undo history where text insertion is supported.
        if (!document.execCommand('insertText', false, text)) {
            answer.setRangeText(text, from, to);
        }
        answer.setSelectionRange(selectionStart, selectionEnd, direction);
        resetResults();
    }

    function changeIndentation(outdent) {
        const { value, selectionStart, selectionEnd } = answer;
        const hasSelection = selectionStart !== selectionEnd;
        if (!outdent && !hasSelection) {
            const caret = selectionStart + indentation.length;
            replaceAnswerRange(indentation, selectionStart, selectionEnd, caret, caret);
            return;
        }

        const firstLineStart = value.slice(0, selectionStart).lastIndexOf('\n') + 1;
        const lastSelected = hasSelection ? selectionEnd - 1 : selectionEnd;
        const nextBreak = value.indexOf('\n', lastSelected);
        const lastLineEnd = nextBreak === -1 ? value.length : nextBreak;
        const lines = value.slice(firstLineStart, lastLineEnd).split('\n');
        let lineStart = firstLineStart;
        let newStart = selectionStart;
        let newEnd = selectionEnd;

        const edited = lines.map(line => {
            const prefix = outdent ? line.match(/^(?:\t| {1,4})/)?.[0] ?? '' : '';
            const shiftAt = position => outdent
                ? -Math.min(prefix.length, Math.max(0, position - lineStart))
                : indentation.length;
            if (lineStart === firstLineStart) newStart += shiftAt(selectionStart);
            newEnd += shiftAt(selectionEnd);
            lineStart += line.length + 1;
            return outdent ? line.slice(prefix.length) : indentation + line;
        }).join('\n');

        if (edited !== value.slice(firstLineStart, lastLineEnd)) {
            replaceAnswerRange(edited, firstLineStart, lastLineEnd, newStart, newEnd);
        }
    }

    function showExercise() {
        if (currentSelection) currentSelection.progress.draft = answer.value;

        const languageKey = languageSelect.value;
        const exerciseKey = exerciseSelect.value;
        const language = languages[languageKey];
        const exercise = exercises[exerciseKey];
        const selectionKey = `${languageKey}/${exerciseKey}`;
        if (!progress.has(selectionKey)) {
            progress.set(selectionKey, { draft: '', failedAttempts: 0, availableAt: Date.now() + solutionDelay });
        }
        currentSelection = { languageKey, exerciseKey, progress: progress.get(selectionKey) };
        answer.value = currentSelection.progress.draft;
        resetResults();
        solutionPanel.hidden = true;
        solutionButton.setAttribute('aria-expanded', 'false');
        updateSolutionAvailability();
        form.querySelector('details').open = false;
        byId('exercise-title').textContent = exercise.title;
        byId('exercise-description').textContent = exercise.description;
        byId('baseline').textContent = language[exerciseKey];
        byId('baseline-note').textContent = exercise.note;
        byId('hint').textContent = exercise.hint;
        byId('language-guide').href = `../langages/${languageKey}.html`;
        byId('language-guide').textContent = `Guide ${language.name}`;
        const names = exercise.inputs.map(name => languageKey === 'php' ? `$${name}` : name);
        byId('inputs').textContent = `Variables : ${names.join(', ')}. ${exercise.domain}`;
        const booleanAnd = languageKey === 'python' ? 'and' : '&&';
        const syntax = {
            sum: language.division === 'intdiv'
                ? 'Division entière : intdiv(a, b).'
                : `Opérateur de division pour cet exercice : ${language.division}.`,
            contains: `Pour combiner deux comparaisons, utilisez ${booleanAnd}.`,
            read: `Pour lire un élément, utilisez les crochets : ${names[0]}[…].`,
        };
        byId('syntax').textContent = syntax[exerciseKey];
    }

    function updateSolutionAvailability() {
        clearTimeout(solutionTimer);
        const { failedAttempts, availableAt } = currentSelection.progress;
        const remaining = availableAt - Date.now();
        solutionButton.hidden = failedAttempts < failedAttemptLimit && remaining > 0;
        if (solutionButton.hidden) {
            solutionTimer = setTimeout(updateSolutionAvailability, remaining);
        }
    }

    solutionButton.addEventListener('click', () => {
        const { languageKey, exerciseKey } = currentSelection;
        if (solutionPanel.hidden) {
            byId('solution-code').textContent = exercises[exerciseKey].solution(languageKey);
            byId('solution-explanation').textContent = exercises[exerciseKey].explanation;
        }
        solutionPanel.hidden = !solutionPanel.hidden;
        solutionButton.setAttribute('aria-expanded', String(!solutionPanel.hidden));
    });

    function restoreDisplayedSelection() {
        languageSelect.value = currentSelection.languageKey;
        exerciseSelect.value = currentSelection.exerciseKey;
    }

    function describeInputs(inputs) {
        return Object.entries(inputs).map(([name, value]) => {
            if (!Array.isArray(value)) return `${name} = ${value}`;
            return `${name} = [${value.slice(0, 5).join(', ')}${value.length > 5 ? ', …' : ''}]`;
        }).join(', ');
    }

    function assertCorrect(expression, exercise, language, inputs) {
        const expected = exercise.reference(inputs);
        const actual = evaluateExpression(expression, inputs, language);
        if (actual.value !== expected.value) {
            throw new Error(`Résultat différent pour ${describeInputs(inputs)}. Attendu : ${expected.value}. Obtenu : ${actual.value}.`);
        }
        return { expected, actual };
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        // A browser can restore select values without dispatching a change event.
        restoreDisplayedSelection();
        resetResults();
        const { languageKey, exerciseKey } = currentSelection;
        const exercise = exercises[exerciseKey];

        try {
            const expression = parseExpression(answer.value, languageKey, exercise.inputs, exercise.resultType);
            for (const inputs of exercise.cases) assertCorrect(expression, exercise, languageKey, inputs);
            const { expected, actual } = assertCorrect(expression, exercise, languageKey, exercise.benchmark);
            if (actual.operations >= expected.operations && !expected.memory) {
                feedback.textContent = 'Les résultats sont corrects. Essayez de réduire le nombre d’opérations sur le cas de comparaison.';
                return;
            }
            byId('benchmark').textContent = exercise.measure;
            byId('before-operations').textContent = format.format(expected.operations);
            byId('after-operations').textContent = format.format(actual.operations);
            byId('before-memory').textContent = format.format(expected.memory);
            const removed = expected.operations - actual.operations;
            const operations = removed > 0 ? `${format.format(removed)} opérations comptées en moins` : 'Pas de réduction des opérations comptées';
            const memory = expected.memory ? ` et ${format.format(expected.memory)} éléments temporaires évités` : '';
            byId('gain').textContent = `${operations}${memory} sur ce jeu de données.`;
            results.hidden = false;
            feedback.dataset.success = 'true';
            feedback.textContent = `Optimisation validée sur ${exercise.cases.length + 1} jeux de données. La comparaison est affichée sous l’éditeur.`;
        } catch (error) {
            feedback.textContent = `${languages[languageKey].name} — ${error.message}`;
            currentSelection.progress.failedAttempts++;
            updateSolutionAvailability();
        }
    });

    languageSelect.addEventListener('change', showExercise);
    exerciseSelect.addEventListener('change', showExercise);
    answer.addEventListener('input', resetResults);
    answer.addEventListener('blur', () => { leaveEditor = false; });
    answer.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            leaveEditor = true;
        } else if (event.key === 'Tab' && !event.ctrlKey && !event.altKey && !event.metaKey && !event.isComposing) {
            if (!leaveEditor) {
                event.preventDefault();
                changeIndentation(event.shiftKey);
            }
            leaveEditor = false;
        } else if (event.key !== 'Shift') {
            leaveEditor = false;
        }
    });
    showExercise();
    window.addEventListener('pageshow', restoreDisplayedSelection);
    byId('atelier-controls').disabled = false;
    byId('atelier-status').hidden = true;
})();
