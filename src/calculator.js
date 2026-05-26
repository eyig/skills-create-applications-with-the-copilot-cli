#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*),
// division (/), modulo (%), exponentiation (^), and square root (sqrt, √).

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(left, right) {
  return left ** right;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(value);
}

const OPERATIONS = {
  add: { handler: add, arity: 2 },
  "+": { handler: add, arity: 2 },
  subtract: { handler: subtract, arity: 2 },
  "-": { handler: subtract, arity: 2 },
  multiply: { handler: multiply, arity: 2 },
  "*": { handler: multiply, arity: 2 },
  divide: { handler: divide, arity: 2 },
  "/": { handler: divide, arity: 2 },
  modulo: { handler: modulo, arity: 2 },
  "%": { handler: modulo, arity: 2 },
  power: { handler: power, arity: 2 },
  "^": { handler: power, arity: 2 },
  sqrt: { handler: squareRoot, arity: 1 },
  "√": { handler: squareRoot, arity: 1 },
};

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <left> [right]\n" +
      "Supported operations: add (+), subtract (-), multiply (*), divide (/), modulo (%), power (^), sqrt (sqrt, √)"
  );
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`The ${label} value must be a valid number.`);
  }

  return parsedValue;
}

function calculate(operation, left, right) {
  const operationKey = operation.toLowerCase();
  const operationDefinition = OPERATIONS[operationKey] ?? OPERATIONS[operation];

  if (!operationDefinition) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  if (operationDefinition.arity === 1) {
    return operationDefinition.handler(left);
  }

  return operationDefinition.handler(left, right);
}

function main() {
  const [operation, leftInput, rightInput] = process.argv.slice(2);

  if (!operation || leftInput === undefined) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const operationKey = operation.toLowerCase();
    const operationDefinition = OPERATIONS[operationKey] ?? OPERATIONS[operation];

    if (!operationDefinition) {
      throw new Error(`Unsupported operation: ${operation}`);
    }

    if (operationDefinition.arity === 2 && rightInput === undefined) {
      printUsage();
      process.exitCode = 1;
      return;
    }

    const left = parseNumber(leftInput, "left");
    const right =
      operationDefinition.arity === 2
        ? parseNumber(rightInput, "right")
        : undefined;
    const result = calculate(operation, left, right);

    console.log(result);
  } catch (error) {
    console.error(error.message);
    if (error.message.startsWith("Unsupported operation:")) {
      printUsage();
    }
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  parseNumber,
  calculate,
  OPERATIONS,
};
