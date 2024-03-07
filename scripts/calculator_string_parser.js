const Operators = {
  MULTIPLY: "*",
  DIVIDE: "/",
  ADD: "+",
  SUBTRACT: "-",
  LEFT_B: "(",
  RIGHT_B: ")",
};

function solveForOperator(str, operator, operatorIndex) {
  if (operatorIndex != -1) {
    let leftOperandEnd = operatorIndex - 1;
    let leftOperandStart = leftOperandEnd;
    while (
      leftOperandStart > 0 &&
      (!isNaN(str[leftOperandStart - 1]) ||
        str[leftOperandStart - 1] === "-" ||
        str[leftOperandStart - 1] === ".")
    ) {
      leftOperandStart--;
    }
    let rightOperandStart = operatorIndex + 1;
    let rightOperandEnd = rightOperandStart;
    while (
      rightOperandEnd < str.length &&
      (!isNaN(str[rightOperandEnd + 1]) || str[rightOperandEnd + 1] === ".")
    ) {
      rightOperandEnd++;
    }

    let leftOperand = parseFloat(str.slice(leftOperandStart, operatorIndex));
    let rightOperand = parseFloat(
      str.slice(rightOperandStart, rightOperandEnd + 1)
    );

    // DEPENDING WHAT OPERATOR PERFORM DIFFERENT FUNCTION
    let result;
    if (operator === "*") {
      result = leftOperand * rightOperand;
    } else if (operator === "/") {
      result = leftOperand / rightOperand;
    } else if (operator === "+") {
      result = leftOperand + rightOperand;
    } else if (operator === "-") {
      result = leftOperand - rightOperand;
    } else {
      throw new Error(`Invalid Operator Found - ${operator}`);
    }

    let newStr =
      str.slice(0, leftOperandStart) + result + str.slice(rightOperandEnd + 1);

    return parseStr(newStr);
  }
}

function solveBraces(str, braceIndex) {
  let scope = 0;
  let LIndex = braceIndex;
  let RIndex = 0;

  for (let i = braceIndex; i < str.length; i++) {
    let char = str[i];
    if (char === "(") {
      scope++;
    }
    else if (char === ")") {
      scope--;
      if (scope === 0) {
        RIndex = i;
        let braceVal = parseStr(str.slice(LIndex + 1, RIndex));
        let newStr = str.slice(0, LIndex) + braceVal + str.slice(RIndex + 1);
        return parseStr(newStr);
      }
    }
  }
}

function parseStr(str) {
  console.log(`str = ${str}`);
  // Base Case
  if (!isNaN(str)) {
    return parseFloat(str);
  }

  let braceIndex = str.indexOf(Operators.LEFT_B);
  if (braceIndex != -1) {
    return solveBraces(str, braceIndex);
  }

  let operatorIndex = str.indexOf(Operators.MULTIPLY);
  if (operatorIndex != -1) {
    return solveForOperator(str, Operators.MULTIPLY, operatorIndex);
  }

  operatorIndex = str.indexOf(Operators.DIVIDE);
  if (operatorIndex != -1) {
    return solveForOperator(str, Operators.DIVIDE, operatorIndex);
  }

  operatorIndex = str.indexOf(Operators.ADD);
  if (operatorIndex != -1) {
    return solveForOperator(str, Operators.ADD, operatorIndex);
  }

  operatorIndex = str.indexOf(Operators.SUBTRACT);
  if (operatorIndex == 0) {
    operatorIndex = str.indexOf(Operators.SUBTRACT, operatorIndex + 1);
  }

  if (operatorIndex != -1) {
    return solveForOperator(str, Operators.SUBTRACT, operatorIndex);
  }
}