let total = 0;
let calcString = "";

function split(str, index) {
  const result = [str.slice(0, index), str.slice(index + 1)];
  return result;
}

function isNumber(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

function parseCalcString(str) {
  //Base Case
  if (isNumber(str)) {
    return parseFloat(str);
  }

  // Split on multiply
  let index = str.indexOf("*");
  if (index != -1) {
    [a, b] = split(str, index);
    return parseCalcString(a) * parseCalcString(b);
  }

  // Split on divide
  index = str.indexOf("/");
  if (index != -1) {
    [a, b] = split(str, index);
    return parseFloat(parseCalcString(a)) / parseFloat(parseCalcString(b));
  }

  //Split on addition
  index = str.indexOf("+");
  if (index != -1) {
    [a, b] = split(str, index);
    return parseFloat(parseCalcString(a)) + parseFloat(parseCalcString(b));
  }

  //Split on subtract
  index = str.indexOf("-");
  if (index != -1) {
    [a, b] = split(str, index);
    return parseFloat(parseCalcString(a)) - parseFloat(parseCalcString(b));
  }
}

function calculateTotal() {
    try {
        total = parseCalcString(calcString);
        calcString = total.toString(); 
    } 
    catch (error) {
        console.log(error);
        calcString = NaN;
    }
    finally {     
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
