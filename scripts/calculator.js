const MAX_STRING_LENGTH = 15;
total = 0;
var calcString = "";

function split(str, index) {
  const result = [str.slice(0, index), str.slice(index + 1)];
  return result;
}

function isNumber(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

function calculateTotal() {
  try {
    total = parseStr(calcString);
    calcString = total.toString();
  } catch (error) {
    calcString = NaN;
  } finally {
    updateScreen();
  }
}

function backCalString() {
  calcString = calcString.slice(0, calcString.length - 1);
  updateScreen();
}

function clearScreen() {
  delete total;
  calcString = "";
  updateScreen();
}

function addToCalcString(value) {
  calcString += value;
  updateScreen();
}

function addToTotal(val) {
  total += val;
}

function updateScreen() {
  var screen = document.getElementById("calc-screen-text");
  screen.value = calcString.slice(Math.max(calcString.length - MAX_STRING_LENGTH, 0));
}

function calcButtonVal(buttonIndex, rowIndex) {
  switch (rowIndex) {
    case 0:
      return 7 + buttonIndex;
    case 1:
      return 4 + buttonIndex;
    case 2:
      return 1 + buttonIndex;
    default:
      return -1;
  }
}
