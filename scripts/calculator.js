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
  let leftIndex = index - 1;
  let rightIndex = index + 1;

  // Check if we will perform brace or num logic on the left operand
  let leftChar = str[leftIndex];
  let leftIsBrace = leftChar == ")";
  let leftIsNum = isNumber(leftChar);

  // Check if Num
  if (leftIsNum) {
    while (leftIndex > 0 && isNumber(str[leftIndex - 1])) {
      leftIndex--;
    }
  } else if (leftIsBrace) {
    // Check if brace
    while (leftIndex > 0 && str[leftIndex] != "(") {
      leftIndex--;
    }
  }

  let rightChar = str[rightIndex];
  let rightIsBrace = rightChar == "(";
  let rightIsNum = isNumber(rightChar);

  // Check if num
  if (rightIsNum) {
    while (rightIndex < str.length && isNumber(str[rightIndex + 1])) {
      rightIndex++;
    }
  } else if (rightIsBrace) {
    // Check if brace
    while (rightIndex < str.length && str[rightIndex] != ")") {
      rightIndex++;
    }
  }

  var a, b;
  if (leftIsNum) {
    a = parseFloat(str.slice(leftIndex, index));
  } else {
    a = parseCalcString(str.slice(leftIndex + 1, index - 1));
  }

  if (rightIsNum) {
    b = parseFloat(str.slice(index + 1, rightIndex + 1));
  } else {
    b = parseCalcString(str.slice(index + 2, rightIndex));
  }

  return [a, b, leftIndex, rightIndex];
}

function parseCalcString(str) {
  //Base Case
  if (isNumber(str)) {
    return parseFloat(str);
  }

  // Split on multiply
  let index = str.indexOf("*");
  if (index != -1) {
    //[a, b] = split(str, index);
    [a, b, leftIndex, rightIndex] = findOperands(str, index);

    var product = a * b;

    var newStr =
      str.slice(0, leftIndex) + product + str.slice(rightIndex + 1);

    return parseCalcString(newStr);
  }

  // Split on divide
  index = str.indexOf("/");
  if (index != -1) {
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    var product = a / b;
    var newStr =
      str.slice(0, leftIndex) + product + str.slice(rightIndex + 1);
    return parseCalcString(newStr);
  }

  //Split on addition
  index = str.indexOf("+");
  if (index != -1) {
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    var product = a + b;
    var newStr =
      str.slice(0, leftIndex) + product + str.slice(rightIndex + 1);
    return parseCalcString(newStr);
  }

  //Split on subtract
  index = str.indexOf("-");
  if (index != -1) {
    [a, b, leftIndex, rightIndex] = findOperands(str, index);
    var product = a - b;
    var newStr =
      str.slice(0, leftIndex) + product + str.slice(rightIndex + 1);
    return parseCalcString(newStr);
  }
}

function calculateTotal() {
  try {
    total = parseCalcString(calcString);
    calcString = total.toString();
  } catch (error) {
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
