const display = document.querySelector('#display');

let expression = '';

function addToDisplay(value) {

    if (expression === '' && isOperator(value)) {
        return;
    }
    
    if (value === '.' && expression.includes('.')) {
        return;
    }

    if (isOperator(value) && isOperator(expression.slice(-1))) {
        return;
    }

    if (expression.length > 10) {
        return;
    }

    expression += value;
    display.textContent = expression;
}

function clearDisplay() {
    display.textContent = '';
    expression = '';
}

function displayResult() {
    try {
        let newExp = expression.replace(/−/gi, '-').replace(/×/gi, '*').replace(/÷/gi, '/').replace(/\^/gi, '**');
        if (newExp.includes('/0')) {
            throw new Error("You can't divide by 0!");
        }
        let result = eval(newExp);
        if (!isNaN(result) && isFinite(result)) {
            expression = result.toString();
            display.textContent = expression;
        } else {
            display.textContent = 'Error';
        }
    } catch (error) {
        display.textContent = 'Error';
    }
}

function backSpace() {
    expression = expression.slice(0, -1);
    display.textContent = expression;
}

function isOperator(char) {
    return ['+', '−', '×', '÷', '^', '%'].includes(char);
}
