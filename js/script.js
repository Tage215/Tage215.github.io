/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let isComma = false;

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
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);
    } 
    else { // Inte en siffertangent, övriga tangenter.
        switch(btn) {
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
    memory += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    isComma = true;
    lcd.value += '.'
    memory += ',';
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    lcd.value += operator;
    memory += operator;
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {
    let result = null;
    let number = 0;
    let temp = null;
    for (let i = 0; i < memory.length; i++)
    {
        for (let j = 0; j < memory.length; j++)
        {
            temp = memory.charAt(j);
            if(temp <= 9 || temp >= 0) {
                number += temp;
            }
        }
        
        if (temp == ',') {
            isComma = true;
        }
        else {
            arithmetic = temp;
        }

        if (result == null) {
            result = number;
        }
        else {
            switch(arithmetic) {
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
        number = 0;
    }
    lcd.value = result;
    memory = result;
    result = null;

}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    result = null;
    clearLCD();
}

window.onload = init;
