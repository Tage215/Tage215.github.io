let lcd = null; // displayen
let memory = 0; // Lagrat värde från display
let arithmetic = []; // Vilken beräkning som skall göras +,-, x eller /
let numbers = []; // talen som ska beräknas

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.charAt(0) === 'b') {
        addDigit(btn.charAt(1));
    }
    else { // Inte en siffertangent, övriga tangenter.
        switch (btn) {
            case 'comma':
                addComma();
                break;

            case 'enter':
                calculate();
                break;

            case 'clear':
                memClear();
                break;

            case 'add':
                setOperator('+');
                break;

            case 'sub':
                setOperator('-');
                break;

            case 'mul':
                setOperator('*');
                break;

            case 'div':
                setOperator('/');

        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit;
    if (memory == 0) {
        memory = digit;
    }
    else {
        memory += digit;
    }
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    lcd.value += '.'
    memory += '.';
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    lcd.value = '';
    memory += operator;
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {
    read();
    let result = Number(numbers[0]);
    let number = 0;
    for (let i = 0; i < arithmetic.length; i++) {
        number = Number(numbers[i + 1])
        switch (arithmetic[i]) {
            case '+':
                result += number;
                break;

            case '-':
                result -= number;
                break;

            case '*':
                result *= number;
                break;

            case '/':
                result /= number;
        }
    }

    numbers = [];
    arithmetic = [];
    if(result != null){
        lcd.value = result;
        memory = result;
    }
    
}

function read() {
    let temp = null;
    let k = 0;
    let j = 0;
    for (let i = 0; i < memory.length; i++) {
        temp = memory.charAt(i);
        if (isNumber(temp) || temp == '.') {
            if (numbers[k] == null) {
                numbers[k] = temp;
            }
            else {
                numbers[k] += temp;
            }
        }
        else {
            arithmetic[j] = temp;
            j++;
            k++;
        }
    }
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    isComma = false;
    lcd.value = '';
}

function isNumber(number) {
    if (number <= 9 && number >= 0) {
        return true;
    }
    else {
        return false;
    }
}

window.onload = init;