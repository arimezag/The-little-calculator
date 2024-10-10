//Information field
const operationLabels = {
    addition: "Addition",
    subtraction: "Subtraction",
    multiplication: "Multiplication",
    division: "Division",
    square: "Square",
    squareRoot: "Square Root",
    modulo: "Modulo",
    factorial: "Factorial",
    exponentiation: "Exponentiation",
    sum: "CSV Sum",
    average: "CSV Average"
};
function generateTitle(operation, result) {
    let resultTitle = "";
    if (result < 100) {
        resultTitle = "The result is less than 100";
    } else if (result >= 100 && result <= 200) {
        resultTitle = "The result is between 100 and 200";
    } else {
        resultTitle = "The result is greater than 200";
    }
    if (['sort', 'reverse', 'removeLast', 'removeSpecific'].includes(operation)) {
        return "List of values processed";
    }
    if (operation === '+') {
        operation = 'addition';
    } else if (operation === '-') {
        operation = 'subtraction';
    } else if (operation === '*') {
        operation = 'multiplication';
    } else if (operation === '/') {
        operation = 'division';
    }
    let operationLabel = operationLabels[operation] || "Unknown operation";
    return `Operation: ${operationLabel}. ${resultTitle}`;
}
function fillInfo(result, operation) {
    let infoElement = document.getElementById('info');
    infoElement.innerHTML = generateTitle(operation, result);
    let output = "";
    if (['addition', 'subtraction', 'multiplication', 'division'].includes(operation)) {
        output = `<em>Operation:</em> ${operationLabels[operation]}. The result is ${result}.`;
    } else if (['square', 'squareRoot', 'modulo', 'factorial', 'exponentiation'].includes(operation)) {
        output = `<em>Operation:</em> ${operationLabels[operation]}. The result is ${result}.`;
    } else if (['sum', 'average'].includes(operation)) {
        output = `<em>Operation:</em> ${operationLabels[operation]}. The result is ${result}.`;
    } else if (['sort', 'reverse', 'removeLast', 'removeSpecific'].includes(operation)) {
        output = "List of values processed";
    } else {
        output = "<em>Operation:</em> Unknown operation.";
    }
}


// Error handling
let errorLog = [];

function displayAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}
function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
}
function validate(input) {
    const trimmedInput = input.trim();
    if (trimmedInput === '') {
        const errorMessage = 'Error: Input field cannot be empty.';
        displayAlert(errorMessage);
        logError(errorMessage);
        return false;
    }
    if (!isNaN(trimmedInput)) {
        return parseFloat(trimmedInput);
    }
    const csvPattern = /^-?\d+(\.\d+)?(,-?\d+(\.\d+)?)*$/;
    if (csvPattern.test(trimmedInput)) {
        return trimmedInput.split(',').map(Number);
    }
    const errorMessage = 'Error: Invalid input. Please enter a number or a valid CSV list.';
    displayAlert(errorMessage);
    logError(errorMessage);
    return false;
}
function logError(message) {
    let timestamp = new Date().toLocaleString();
    errorLog.push({ message: message, time: timestamp });
    console.error(`[${timestamp}] ${message}`);
}
function downloadLogs() {
    if (errorLog.length === 0) {
        displayAlert('No errors to download.');
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Time,Message\n" 
        + errorLog.map(e => `${e.time},${e.message}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "error_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Unary Operations
function square() {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput)) return;
    let result = validatedInput * validatedInput;
    document.getElementById('inputField').value = result;
    fillInfo(result, 'square');
}
function mod() {
    let input1 = document.getElementById('inputField').value;
    let input2 = document.getElementById('divisorField').value;
    if (!validate(input1) || !validate(input2)) return;
    if (input2 == 0) {
        displayAlert("Error: Division by zero is not allowed.");
        logError("Error: Division by zero is not allowed.")
        return;
    }
    let result = input1 % input2;
    document.getElementById('inputField').value = result;
    fillInfo(result, 'modulo');
}
function fact() {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput) || validatedInput < 0 || !Number.isInteger(validatedInput)) {
        displayAlert('Error: Factorial requires a non-negative integer.');
        logError('Error: Factorial requires a non-negative integer.');
        return;
    }
    let result = 1;
    for (let i = 1; i <= validatedInput; i++) {
        result *= i;
    }
    document.getElementById('inputField').value = result;
    fillInfo(result, 'factorial');
}
function squareRoot() {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput) || validatedInput < 0) {
        displayAlert('Error: Cannot calculate square root of a negative number.');
        logError('Error: Cannot calculate square root of a negative number.');
        return;
    }
    let result = Math.sqrt(validatedInput);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'squareRoot');
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
}

//Unary operations - arrow function notation
/*const square = () => {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput)) return;
    let result = validatedInput * validatedInput;
    document.getElementById('inputField').value = result;
    fillInfo(result, 'square');
};

const mod = () => {
    let input1 = document.getElementById('inputField').value;
    let input2 = document.getElementById('divisorField').value;
    if (!validate(input1) || !validate(input2)) return;
    if (input2 == 0) {
        displayAlert("Error: Division by zero is not allowed.");
        logError("Error: Division by zero is not allowed.")
        return;
    }
    let result = input1 % input2;
    document.getElementById('inputField').value = result;
    fillInfo(result, 'modulo');
};

const fact = () => {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput) || validatedInput < 0 || !Number.isInteger(validatedInput)) {
        displayAlert('Error: Factorial requires a non-negative integer.');
        logError('Error: Factorial requires a non-negative integer.');
        return;
    }
    let result = 1;
    for (let i = 1; i <= validatedInput; i++) {
        result *= i;
    }
    document.getElementById('inputField').value = result;
    fillInfo(result, 'factorial');
};

const squareRoot = () => {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput) || validatedInput < 0) {
        displayAlert('Error: Cannot calculate square root of a negative number.');
        logError('Error: Cannot calculate square root of a negative number.');
        return;
    }
    let result = Math.sqrt(validatedInput);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'squareRoot');
};

const exponentiate = () => {
    let base = document.getElementById('inputField').value;
    let power = document.getElementById('powerField').value;
    let validatedBase = validate(base);
    let validatedPower = validate(power);
    if (validatedBase === false || validatedPower === false || Array.isArray(validatedBase) || Array.isArray(validatedPower)) return;
    let result = Math.pow(validatedBase, validatedPower);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'exponentiation');
};
*/


// Binary operations
let firstOperand = null;
let operator = null;

function setOperator(op) {
    let input = document.getElementById('inputField').value;
    let validatedInput = validate(input);
    if (validatedInput === false || Array.isArray(validatedInput)) return;
    firstOperand = validatedInput;
    operator = op;
    document.getElementById('inputField').value = '';
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
                displayAlert('Error: Division by zero is not allowed.');
                logError('Error: Division by zero is not allowed.');
                return;
            }
            result = firstOperand / validatedSecondOperand;
            break;
        default:
            displayAlert('Error: Unknown operator.');
            logError('Error: Division by zero is not allowed.');
            return;
    }
    document.getElementById('inputField').value = result;
    fillInfo(result, operator);
}


// CSV operations
function sum() {
    let values = getCsvValues();
    if (!values) return;
    let result = values.reduce((acc, val) => acc + val, 0);
    document.getElementById('inputField').value = result;
    fillInfo(result, 'sum');
}
function sort() {
    let values = getCsvValues();
    if (!values) return;
    values.sort((a, b) => a - b);
    document.getElementById('inputField').value = values.join(',');
    fillInfo(values.join(','), 'sort'); 
}
function reverse() {
    let values = getCsvValues();
    if (!values) return;
    values.reverse();
    document.getElementById('inputField').value = values.join(',');
    fillInfo(values.join(','), 'reverse');
}
function removeLast() {
    let values = getCsvValues();
    if (!values) return;
    values.pop();
    document.getElementById('inputField').value = values.join(',');
    fillInfo(values.join(','), 'removeLast');
}
function calculateAverage() {
    let values = getCsvValues();
    let total = values.reduce((acc, val) => acc + val, 0);
    let average = total / values.length;
    document.getElementById('inputField').value = average;
    fillInfo(average, 'average');
}
function removeSpecific() {
    let values = getCsvValues();
    let valueToRemove = document.getElementById('removeValueField').value.trim();
    if (valueToRemove === "") {
        displayAlert('Error: You have not provided the element that you want to eliminate.');
        logError('Error: You have not provided the element that you want to eliminate.');
        return;
    }
    if (values === null || isNaN(valueToRemove) || valueToRemove === "") {
        return;
    }
    let filteredValues = values.filter(val => val != Number(valueToRemove));
    if (filteredValues.length === values.length) {
        displayAlert('Error: Value not found. Please provide a valid value to remove.');
        logError('Error: Value not found. Please provide a valid value to remove.');
        return;
    }
    document.getElementById('inputField').value = filteredValues.join(',');
    fillInfo(filteredValues.join(','), 'removeSpecific');
}
function getCsvValues() {
    let input = document.getElementById('inputField').value.trim();
    if (!validate(input)) {
        displayAlert('Error: Invalid CSV input. Please enter a valid comma-separated list of numbers.');
        logError('Error: Invalid CSV input. Please enter a valid comma-separated list of numbers.');
        return null;
    }
    let values = input.split(',').map(Number);
    if (values.some(isNaN)) {
        displayAlert('Error: CSV contains non-numeric values.');
        logError('Error: CSV contains non-numeric values.');
        return null;
    }
    return values;
}


// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '+':
            event.preventDefault();
            setOperator('+');
            break;
        case '-':
            if (inputField.value.trim() === '' || inputField.value.trim().endsWith(',')) {
                break;
            } else if (inputField.value.trim() === '-') {
                break;
            } else {
                event.preventDefault();
                setOperator('-');
            }
            break;
        case '*':
            event.preventDefault();
            setOperator('*');
            break;
        case '/':
            event.preventDefault();
            setOperator('/');
            break;
        case 'Enter':
            eq();
            break;
        case 's':
            event.preventDefault();
            square();
            break;
        case 'r':
            event.preventDefault();
            squareRoot();
            break;
        case '!':
            event.preventDefault();
        case 'f':
            event.preventDefault();
            fact();
            break;
        case 'e':
            event.preventDefault();
            exponentiate();
            break;
        case 'm':
            event.preventDefault();
            mod();
            break;
        case 'x':
            event.preventDefault();
            sum();
            break;
        case 'a':
            event.preventDefault();
            calculateAverage();
            break;
        case 't':
            event.preventDefault();
            sort();
            break;
        case 'v':
            event.preventDefault();
            reverse();
            break;
        case 'l':
            event.preventDefault();
            removeLast();
            break;
    }
});
