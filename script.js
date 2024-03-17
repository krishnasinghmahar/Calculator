const display = document.querySelector('#display');
const bopSound = document.querySelector('#bop');
const buttons = document.querySelectorAll('button');


buttons.forEach((e) => {
    e.addEventListener('click', () => bopSound.play());
})



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
            display.textContent = 'Never Gonna Give You Up!';
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            return;
        }
        let result = eval(newExp);
        if (!isNaN(result) && isFinite(result)) {
            expression = result.toString();
            display.textContent = expression;
        } else {
            display.textContent = 'LOL!';
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

document.addEventListener('keydown', (event) => {
    const key = event.key;

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            addToDisplay(key);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
        case '%':
            addToDisplay(key);
            break;
        case '=':
        case 'Enter':
            displayResult();
            break;
        case 'Backspace':
            backSpace();
            break;
        case '.':
            addToDisplay('.');
            break;
        case 'Escape':
            clearDisplay();
            break;
    }
});
