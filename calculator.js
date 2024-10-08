//Information field
function fillInfo(result, operation) {
    let infoElement = document.getElementById('info');
    if (result < 100) {
        infoElement.innerHTML = "<strong>Info:</strong> The result is less than 100.";
    } else if (result >= 100 && result <= 200) {
        infoElement.innerHTML = "<strong>Info:</strong> The result is between 100 and 200.";
    } else {
        infoElement.innerHTML = "<strong>Info:</strong> The result is greater than 200.";
    }
    switch (operation) {
        case 'addition':
            infoElement.innerHTML += "<br><em>Operation:</em> Addition. The sum is " + result + ".";
            break;
        case 'subtraction':
            infoElement.innerHTML += "<br><em>Operation:</em> Subtraction. The difference is " + result + ".";
            break;
        case 'multiplication':
            infoElement.innerHTML += "<br><em>Operation:</em> Multiplication. The product is " + result + ".";
            break;
        case 'division':
            if (result === Infinity || result === -Infinity) {
                infoElement.innerHTML += "<br><em>Operation:</em> Division. Division by zero is not allowed.";
            } else {
                infoElement.innerHTML += "<br><em>Operation:</em> Division. The quotient is " + result + ".";
            }
            break;
        case 'square':
            infoElement.innerHTML += "<br><em>Operation:</em> Square. The result is " + result + ".";
            break;
        case 'modulo':
            infoElement.innerHTML += "<br><em>Operation:</em> Modulo. The absolute value is " + result + ".";
            break;
        case 'factorial':
            infoElement.innerHTML += "<br><em>Operation:</em> Factorial. The factorial result is " + result + ".";
            break;
        case 'squareRoot':
            if (result < 0) {
                infoElement.innerHTML += "<br><em>Operation:</em> Square Root. Negative numbers cannot have real square roots.";
            } else {
                infoElement.innerHTML += "<br><em>Operation:</em> Square Root. The square root is " + result + ".";
            }
            break;
        case 'exponentiation':
            infoElement.innerHTML += "<br><em>Operation:</em> Exponentiation. The result is " + result + ".";
            break;
        case 'sum':
            infoElement.innerHTML += "<br><em>Operation:</em> CSV Sum. The total sum is " + result + ".";
            break;
        case 'sort':
            infoElement.innerHTML += "<br><em>Operation:</em> CSV Sort. The values have been sorted.";
            break;
        case 'reverse':
            infoElement.innerHTML += "<br><em>Operation:</em> CSV Reverse. The values have been reversed.";
            break;
        case 'average':
            infoElement.innerHTML += "<br><em>Operation:</em> CSV Average. The average of the values is " + result + ".";
            break;
        default:
            infoElement.innerHTML += "<br><em>Operation:</em> Unknown operation.";
            break;
    }
}


// Error handling
function displayError(message) {
    let errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    } else {
        console.error('Error element not found in the DOM');
    }
}

function clearError() {
    let errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }
}


function validate(input) {
    const trimmedInput = input.trim();
    if (trimmedInput === '') {
        logError('Error: Input field cannot be empty.');
        displayError('Error: Input cannot be empty.');
        return false;
    }
    if (!isNaN(trimmedInput)) {
        return parseFloat(trimmedInput); // Return the number if valid
    }
    const csvPattern = /^-?\d+(\.\d+)?(,-?\d+(\.\d+)?)*$/;
    if (csvPattern.test(trimmedInput)) {
        return trimmedInput.split(',').map(Number); // Return CSV as an array of numbers
    }
    logError('Error: Invalid input. Please enter a number or a valid CSV list.');
    displayError('Error: Invalid input format.');
    return false;
}

let errorLog = [];
function logError(message) {
    let timestamp = new Date().toLocaleString();
    errorLog.push({ message: message, time: timestamp });
    console.error(`[${timestamp}] ${message}`);
    displayError(message);
}

function downloadErrorLog() {
    if (errorLog.length === 0) {
        displayError('No errors to download.');
        return;
    }
    let data = JSON.stringify(errorLog, null, 2);
    let blob = new Blob([data], { type: 'application/json' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'error-log.json';
    link.click();
}


// Unary Operations
function square() {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput)) return;
    let result = validatedInput * validatedInput;
    document.getElementById('inputField').value = result;
    fillInfo(result, 'square');
    clearError();
}

function mod() {
    let input = parseFloat(document.getElementById('inputField').value);
    if (!validate(input)) return;
    let result = (input < 0) ? -input : input;
    document.getElementById('inputField').value = result;
    fillInfo(result, 'modulo');
    clearError();
}


function fact() {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput) || validatedInput < 0 || !Number.isInteger(validatedInput)) {
        logError('Error: Factorial requires a non-negative integer.');
        displayError('Error: Factorial requires a non-negative integer.');
        return;
    }
    let result = 1;
    for (let i = 1; i <= validatedInput; i++) {
        result *= i;
    }
    document.getElementById('inputField').value = result;
    fillInfo(result, 'factorial');
    clearError();
}

function squareRoot() {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput) || validatedInput < 0) {
        logError('Error: Cannot calculate square root of a negative number.');
        displayError('Error: Cannot calculate square root of a negative number.');
        return;
    }
    let result = Math.sqrt(validatedInput);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'squareRoot');
    clearError();
}
 
function exponentiate() {
    let base = document.getElementById('inputField').value;
    let power = document.getElementById('powerField').value;
    let validatedBase = validate(base);
    let validatedPower = validate(power);
    if (validatedBase === false || validatedPower === false || Array.isArray(validatedBase) || Array.isArray(validatedPower)) return;
    let result = Math.pow(validatedBase, validatedPower);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'exponentiation');
    clearError();
}


//Binary operations
let firstOperand = null;
let operator = null;

function setOperator(op) {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput)) return;
    firstOperand = validatedInput;
    operator = op;
    document.getElementById('inputField').value = ''; // Clear input field for second operand
    clearError();
}

function eq() {
    let secondOperand = document.getElementById('inputField').value;
    let validatedSecondOperand = validate(secondOperand);
    if (validatedSecondOperand === false || Array.isArray(validatedSecondOperand)) return;
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + validatedSecondOperand;
            break;
        case '-':
            result = firstOperand - validatedSecondOperand;
            break;
        case '*':
            result = firstOperand * validatedSecondOperand;
            break;
        case '/':
            if (validatedSecondOperand === 0) {
                logError('Error: Division by zero is not allowed.');
                displayError('Error: Division by zero is not allowed.');
                return;
            }
            result = firstOperand / validatedSecondOperand;
            break;
        default:
            logError('Error: Unknown operator.');
            displayError('Error: Unknown operator.');
            return;
    }
    document.getElementById('inputField').value = result;
    fillInfo(result, operator);
    clearError();
}


// CSV operations
function sum() {
    let values = getCsvValues();
    if (!values) return;
    let result = values.reduce((acc, val) => acc + val, 0);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'sum');
    clearError();
}

function sort() {
    let values = getCsvValues();
    if (!values) return;
    values.sort((a, b) => a - b);
    document.getElementById('inputField').value = values.join(',');
    fillInfo(values.join(','), 'sort'); 
    clearError();
}

function reverse() {
    let values = getCsvValues();
    if (!values) return;
    values.reverse();
    document.getElementById('inputField').value = values.join(',');
    fillInfo(values.join(','), 'reverse');
    clearError();
}

function removeLast() {
    let values = getCsvValues();
    if (!values) return;
    if (values.length === 0) {
        logError('Error: No elements to remove.');
        return;
    }
    values.pop();
    document.getElementById('inputField').value = values.join(',');
    fillInfo(values.join(','), 'removeLast');
    clearError();
}

function calculateAverage() {
    let values = getCsvValues();
    if (!values || values.length === 0) {
        logError("Error: No valid numbers for average calculation.");
        return;
    }
    let total = values.reduce((acc, val) => acc + val, 0);
    let average = total / values.length;
    document.getElementById('inputField').value = average;
    fillInfo(average, 'average');
    clearError();
}

function removeSpecific() {
    let values = getCsvValues();
    let valueToRemove = document.getElementById('removeValueField').value.trim();
    if (values === null || isNaN(valueToRemove) || valueToRemove === "") {
        logError("Error: Invalid CSV or value to remove.");
        displayError('Error: Please provide a valid value to remove.');
        return;
    }
    let filteredValues = values.filter(val => val != Number(valueToRemove));
    if (filteredValues.length === values.length) {
        logError('Error: Value not found in the CSV.');
        displayError('Error: Value not found.');
        return;
    }

    document.getElementById('inputField').value = filteredValues.join(',');
    fillInfo(filteredValues.join(','), 'removeSpecific');
    clearError();
}

function getCsvValues() {
    let input = document.getElementById('inputField').value.trim();
        if (!validate(input)) {
        logError('Error: Invalid CSV input. Please enter a valid comma-separated list of numbers.');
        return null;
    }
    let values = input.split(',').map(Number);
    if (values.some(isNaN)) {
        logError('Error: CSV contains non-numeric values.');
        return null;
    }
    clearError();
    return values;
}


// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '+':
            setOperator('+');
            break;
        case '-':
            setOperator('-');
            break;
        case '*':
            setOperator('*');
            break;
        case '/':
            setOperator('/');
            break;
        case 'Enter':
            eq();
            break;
        case '%':
            mod();
            break;
        case '^':
        case 'e':
            exponentiate();
            break;
        case 's':
            square();
            break;
        case 'r':
            squareRoot();
            break;
        case '!':
        case 'f':
            fact();
            break;
    }
});