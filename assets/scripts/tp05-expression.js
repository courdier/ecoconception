const tp05Evaluator = (() => {
    const precedence = {
        '||': 1, or: 1, '&&': 2, and: 2,
        '==': 3, '!=': 3, '===': 3, '!==': 3,
        '<': 4, '>': 4, '<=': 4, '>=': 4,
        '+': 5, '-': 5, '*': 6, '/': 6, '//': 6, '~/': 6, '%': 6,
    };
    const comparisons = new Set(['==', '!=', '<', '>', '<=', '>=']);
    const operatorPattern = /\s+|\$?[A-Za-z_][A-Za-z_0-9]*|(?:0|[1-9][0-9]*)|===|!==|==|!=|<=|>=|&&|\|\||\/\/|~\/|--|[+*/%<>!()[\],-]/gy;
    const functionDeclaration = /^(?:(?:async\s+)?(?:def|fn|function)\b|(?:(?:public|private|static)\s+)*(?:int|bool|boolean|long|double|num|void)\s+\w+\s*\()/;

    function tokenize(source, language) {
        const expression = source.trimStart();
        if (!expression || source.length > 240) {
            throw new Error('Écrivez une expression de 1 à 240 caractères.');
        }
        if (functionDeclaration.test(expression)) {
            throw new Error('Vous avez saisi une définition de fonction. Dans ce champ, écrivez seulement l’expression qui doit être renvoyée.');
        }
        if (/^return\b/.test(expression)) {
            throw new Error('Écrivez seulement l’expression qui suit « return ».');
        }
        if (/^(?:if|for|while)\b/.test(expression)) {
            throw new Error('Vous avez saisi une instruction. Ce champ attend une expression, par exemple un calcul ou une comparaison.');
        }
        const tokens = [];
        operatorPattern.lastIndex = 0;
        let offset = 0;
        while (offset < source.length) {
            const token = operatorPattern.exec(source)?.[0];
            if (!token) {
                const character = String.fromCodePoint(source.codePointAt(offset));
                throw new Error(`Caractère non pris en charge « ${character} » à la position ${offset + 1} de l’expression.`);
            }
            if (token.trim()) {
                const python = language === 'python';
                const supported = {
                    '!': !python, '&&': !python, '||': !python,
                    and: python, or: python, not: python,
                    '/': !['python', 'php', 'dart'].includes(language),
                    '//': python, '~/': language === 'dart',
                    '===': language === 'javascript' || language === 'php',
                    '!==': language === 'javascript' || language === 'php',
                };
                if (Object.hasOwn(supported, token) && !supported[token]) {
                    throw new Error(`L’opérateur « ${token} » ne fait pas partie des expressions acceptées pour ce langage.`);
                }
                if (token === '--') {
                    if (!python && language !== 'rust') throw new Error('L’opérateur de décrémentation est indisponible.');
                    tokens.push('-', '-');
                } else {
                    tokens.push(token);
                }
            }
            offset = operatorPattern.lastIndex;
        }
        return tokens;
    }

    function parseExpression(source, language, inputNames, resultType) {
        const tokens = tokenize(source, language);
        let position = 0;

        function consume(expected) {
            if (tokens[position] !== expected) throw new Error(`Le symbole « ${expected} » est attendu ici.`);
            position++;
        }

        function readOperand() {
            const token = tokens[position++];
            if (token === '(') {
                const node = readExpression();
                consume(')');
                return node;
            }
            if (token === '-' || token === '!' || token === 'not') {
                const operand = token === 'not' ? readExpression(3) : readOperand();
                return { type: 'unary', operator: token, operand };
            }
            if (token && /^[0-9]+$/.test(token)) {
                const value = Number(token);
                if (value > 2147483647) throw new Error('Utilisez des constantes entières sur 32 bits.');
                return { type: 'value', value };
            }

            const bools = language === 'python' ? ['True', 'False'] : ['true', 'false'];
            if (bools.includes(token)) return { type: 'value', value: token === bools[0] };

            if (token === 'intdiv' && language === 'php') {
                consume('(');
                const left = readExpression();
                consume(',');
                const right = readExpression();
                consume(')');
                return { type: 'binary', operator: 'intdiv', left, right };
            }

            const name = language === 'php' && token?.startsWith('$') ? token.slice(1) : token;
            const expectedName = language === 'php' ? `$${name}` : name;
            if (!inputNames.includes(name) || token !== expectedName) {
                throw new Error(token ? `Élément inattendu « ${token} ». Vérifiez les variables et la syntaxe de l’exercice.` : 'L’expression est incomplète.');
            }
            if (name === 'valeurs') {
                consume('[');
                const index = readExpression();
                consume(']');
                return { type: 'index', index };
            }
            return { type: 'input', name };
        }

        function readExpression(minimum = 1) {
            let left = readOperand();
            while (Object.hasOwn(precedence, tokens[position])) {
                const operator = tokens[position];
                const rank = language === 'python' && comparisons.has(operator) ? 3 : precedence[operator];
                if (rank < minimum) break;
                if (language === 'python' && comparisons.has(operator)) {
                    const steps = [];
                    while (comparisons.has(tokens[position])) {
                        const comparator = tokens[position++];
                        steps.push({ operator: comparator, right: readExpression(rank + 1) });
                    }
                    left = { type: 'chain', left, steps };
                    continue;
                }
                position++;
                const right = readExpression(rank + 1);
                left = { type: 'binary', operator, left, right };
            }
            return left;
        }

        const expression = readExpression();
        if (position !== tokens.length) {
            throw new Error(`Élément inattendu « ${tokens[position]} ». Saisissez uniquement l’expression à renvoyer.`);
        }
        const actualType = expressionType(expression, language);
        if (actualType !== resultType) throw new Error(resultType === 'boolean'
            ? 'Cette fonction doit renvoyer un booléen.'
            : 'Cette fonction doit renvoyer un nombre.');
        return expression;
    }

    function expressionType(node, language, insideIndex = false) {
        const typeOf = child => expressionType(child, language, insideIndex);
        const need = (actual, expected) => {
            if (actual !== expected) throw new Error(expected === 'boolean'
                ? 'Un opérateur logique attend des comparaisons ou des booléens.'
                : 'Cette opération attend des nombres compatibles.');
        };
        switch (node.type) {
            case 'value':
                return typeof node.value;
            case 'input':
                if (node.name === 'indice' && ['rust', 'c'].includes(language) && !insideIndex) {
                    throw new Error('Utilisez la variable indice à l’intérieur des crochets.');
                }
                return 'number';
            case 'index':
                if (insideIndex && language === 'rust') throw new Error('Utilisez un indice de type usize dans les crochets.');
                need(expressionType(node.index, language, true), 'number');
                return 'number';
            case 'unary': {
                const type = node.operator === '-' ? 'number' : 'boolean';
                if (type === 'number' && insideIndex && language === 'rust') {
                    throw new Error('Un indice Rust de type usize ne peut pas être négatif.');
                }
                need(typeOf(node.operand), type);
                return type;
            }
            case 'chain': {
                let left = typeOf(node.left);
                for (const { operator, right } of node.steps) {
                    if (operator !== '==' && operator !== '!=') need(left, 'number');
                    need(left, typeOf(right));
                    left = typeOf(right);
                }
                return 'boolean';
            }
            case 'binary': {
                const left = typeOf(node.left);
                const right = typeOf(node.right);
                if (['&&', '||', 'and', 'or'].includes(node.operator)) {
                    need(left, 'boolean');
                    need(right, 'boolean');
                    return 'boolean';
                }
                if (['==', '!=', '===', '!=='].includes(node.operator)) {
                    need(left, right);
                    return 'boolean';
                }
                need(left, 'number');
                need(right, 'number');
                return comparisons.has(node.operator) ? 'boolean' : 'number';
            }
        }
    }

    function checkNumber(value, language) {
        if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER) {
            throw new Error('Le calcul dépasse la plage numérique prise en charge.');
        }
        if (['c', 'java', 'rust'].includes(language) && (value < -2147483648 || value > 2147483647)) {
            throw new Error('Le calcul dépasse la plage d’un entier signé sur 32 bits.');
        }
        return value;
    }

    function calculate(operator, left, right, language) {
        if (['==', '===', '!=', '!=='].includes(operator)) {
            const equal = left === right;
            return operator.startsWith('!') ? !equal : equal;
        }
        switch (operator) {
            case '<': return left < right;
            case '>': return left > right;
            case '<=': return left <= right;
            case '>=': return left >= right;
            case '+': return checkNumber(left + right, language);
            case '-': return checkNumber(left - right, language);
            case '*': return checkNumber(left * right, language);
        }
        if (right === 0) throw new Error('Division par zéro sur un jeu de test.');
        if (operator === '%') {
            if (!Number.isInteger(left) || !Number.isInteger(right)) throw new Error('Utilisez le modulo sur des entiers.');
            const remainder = left % right;
            return language === 'python' && remainder * right < 0 ? remainder + right : remainder;
        }
        if (operator === 'intdiv') {
            left = Math.trunc(left);
            right = Math.trunc(right);
            if (right === 0) throw new Error('Division par zéro sur un jeu de test.');
        }
        const quotient = left / right;
        if (operator === '//') return checkNumber(Math.floor(quotient), language);
        const integerDivision = operator === '~/' || operator === 'intdiv' || ['c', 'java', 'rust'].includes(language);
        return checkNumber(integerDivision ? Math.trunc(quotient) : quotient, language);
    }

    function evaluateExpression(expression, inputs, language) {
        let operations = 0;

        function evaluate(node) {
            switch (node.type) {
                case 'value': return node.value;
                case 'input': return inputs[node.name];
                case 'index': {
                    operations++;
                    const index = evaluate(node.index);
                    if (!Number.isInteger(index) || index < 0 || index >= inputs.valeurs.length) {
                        throw new Error('L’indice doit être un entier dans les bornes du tableau.');
                    }
                    return inputs.valeurs[index];
                }
                case 'unary': {
                    operations++;
                    const value = evaluate(node.operand);
                    return node.operator === '-' ? checkNumber(-value, language) : !value;
                }
                case 'chain': {
                    let left = evaluate(node.left);
                    for (const step of node.steps) {
                        operations++;
                        const right = evaluate(step.right);
                        if (!calculate(step.operator, left, right, language)) return false;
                        left = right;
                    }
                    return true;
                }
                case 'binary': {
                    operations++;
                    const left = evaluate(node.left);
                    if (node.operator === '&&' || node.operator === 'and') {
                        return left && evaluate(node.right);
                    }
                    if (node.operator === '||' || node.operator === 'or') {
                        return left || evaluate(node.right);
                    }
                    return calculate(node.operator, left, evaluate(node.right), language);
                }
            }
        }

        const value = evaluate(expression);
        return { value, operations };
    }

    return { evaluateExpression, parseExpression };
})();
