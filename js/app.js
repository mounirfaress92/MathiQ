
// Main calculator display functions
function input(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display').value;
    document.getElementById('display').value = display.slice(0, -1);
}

function calculate() {
    let display = document.getElementById('display').value;
    try {
        document.getElementById('display').value = eval(display);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

// Copy result function
function copyToClipboard() {
    let displayValue = document.getElementById('display').value;
    navigator.clipboard.writeText(displayValue).then(() => {
        alert("Result copied to clipboard!");
    });
}

// Unit Converter logic
const unitConversions = {
    meters: 1,
    kilometers: 0.001,
    miles: 0.000621371,
    grams: 1,
    kilograms: 0.001,
    pounds: 0.00220462,
    celsius: { toFahrenheit: (c) => (c * 9/5) + 32, toCelsius: (f) => (f - 32) * 5/9 }
};

function convertUnits() {
    let amount = document.getElementById('unit-amount').value;
    let fromUnit = document.getElementById('from-unit').value;
    let toUnit = document.getElementById('to-unit').value;

    let convertedAmount;
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedAmount = unitConversions.celsius.toFahrenheit(amount);
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedAmount = unitConversions.celsius.toCelsius(amount);
    } else {
        convertedAmount = (amount * unitConversions[toUnit] / unitConversions[fromUnit]).toFixed(2);
    }
    
    document.getElementById('unit-result').innerText = `${amount} ${fromUnit} = ${convertedAmount} ${toUnit}`;
}

// Function to toggle the Unit Converter section
function openUnitConverter() {
    document.getElementById('unit-converter').style.display = 'block';
    document.getElementById('currency-converter').style.display = 'none';
}

// Currency Converter logic
async function convertCurrency() {
    let amount = document.getElementById('currency-amount').value;
    let fromCurrency = document.getElementById('from-currency').value;
    let toCurrency = document.getElementById('to-currency').value;

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);
        
        document.getElementById('currency-result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        document.getElementById('currency-result').innerText = "Error converting currency.";
    }
}

// Function to toggle the Currency Converter section
function openCurrencyConverter() {
    document.getElementById('unit-converter').style.display = 'none';
    document.getElementById('currency-converter').style.display = 'block';
}
