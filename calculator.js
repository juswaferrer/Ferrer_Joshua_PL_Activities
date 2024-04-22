function appendText(value) {
  document.calc.txt.value += value;
}

function clearAll() {
  document.calc.txt.value = '';
}

function deleteLast() {
  document.calc.txt.value = document.calc.txt.value.slice(0, -1);
}

function calculateSquare() {
  var currentValue = parseFloat(document.calc.txt.value);
  var result = currentValue * currentValue;
  document.calc.txt.value = result;
  appendToHistory(`${currentValue}^2`, result);
}

function calculateSquareRoot() {
  var currentValue = parseFloat(document.calc.txt.value);
  if (!isNaN(currentValue) && currentValue >= 0) {
    var result = Math.sqrt(currentValue);
    result = result.toFixed(2);
    document.calc.txt.value = result;
    appendToHistory(`√${currentValue}`, result);
  } else {
    document.calc.txt.value = 'Input first the number';
  }
}

function changeSign() {
  var currentValue = parseFloat(document.calc.txt.value);
  document.calc.txt.value = -currentValue;
}

function calculation() {
  try {
    return eval(document.calc.txt.value);
  } catch (error) {
    return 'Syntax Error!';
  }
}

function appendToHistory(operation, result) {
  var historyElement = document.createElement('p');
  historyElement.textContent = `${operation} = ${result}`;
  document.getElementById('history').appendChild(historyElement);
}

function computeAndStore() {
  var inputText = document.calc.txt.value.trim();
  if (inputText !== "") {
    var result = calculation();

    if (result !== undefined && result !== 'Syntax Error!') {
      appendToHistory(inputText, result);
      clearAll();
      appendText(result);
    } else {
      document.calc.txt.value = 'Syntax Error!';
    }
  }
}