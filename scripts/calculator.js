var total = 0;
var calcString = "";

function split(str, index) {
  const result = [str.slice(0, index), str.slice(index + 1)];
  return result;
}

function isNumber(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

function findOperands(str, index) {
  var leftIndex = index - 1;
  var rightIndex = index + 1;

  console.log(leftIndex);
  console.log(rightIndex);

  while (leftIndex > 0 && !isNaN(str[leftIndex - 1])) {
    leftIndex--;
  }

  while (rightIndex < str.length && !isNaN(str[rightIndex + 1])) {
    rightIndex++;
  }

  var a = parseFloat(str.substring(leftIndex, index));
  var b = parseFloat(str.substring(index + 1, rightIndex + 1));

  return [a, b, leftIndex, rightIndex];
}

function parseCalcString(str) {
  console.log(`String=${str}. Type=${typeof(str)}`);
  //Base Case
  if (isNumber(str)) {
    console.log(`Number=${str}`)
    return parseFloat(str);
  }

  // Split on multiply
  let index = str.indexOf("*");
  if (index != -1) {
    //[a, b] = split(str, index);
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    console.log([a, b, leftIndex, rightIndex]);
    var product = a * b;
    console.log(`Product=${product}`);
    var newStr = str.substring(0, leftIndex) + product + str.substring(rightIndex+1);
    console.log(newStr);
    return parseCalcString(newStr);
  }

  // Split on divide
  index = str.indexOf("/");
  if (index != -1) {
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    var product = a / b;
    var newStr = str.substring(0, leftIndex) + product + str.substring(rightIndex+1);
    return parseCalcString(newStr);
  }

  //Split on addition
  index = str.indexOf("+");
  if (index != -1) {
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    var product = a + b;
    var newStr = str.substring(0, leftIndex) + product + str.substring(rightIndex+1);
    return parseCalcString(newStr);
  }

  //Split on subtract
  index = str.indexOf("-");
  if (index != -1) {
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    var product = a - b;
    var newStr = str.substring(0, leftIndex) + product + str.substring(rightIndex+1);
    return parseCalcString(newStr);
  }
}

function calculateTotal() {
  console.log(calcString);
  try {
    total = parseCalcString(calcString);
    calcString = total.toString();
  } catch (error) {
    console.log(error);
    calcString = NaN;
  } finally {
    updateScreen();
  }
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
  screen.value = calcString;
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
