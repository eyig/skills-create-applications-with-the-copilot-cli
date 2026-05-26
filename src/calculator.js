#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/).

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

const OPERATION_HANDLERS = {
  add,
  "+": add,
  subtract,
  "-": subtract,
  multiply,
  "*": multiply,
  divide,
  "/": divide,
};

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <left> <right>\n" +
      "Supported operations: add (+), subtract (-), multiply (*), divide (/)"
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
  const handler = OPERATION_HANDLERS[operationKey] ?? OPERATION_HANDLERS[operation];

  if (!handler) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  return handler(left, right);
}

function main() {
  const [operation, leftInput, rightInput] = process.argv.slice(2);

  if (!operation || leftInput === undefined || rightInput === undefined) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const left = parseNumber(leftInput, "left");
    const right = parseNumber(rightInput, "right");
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
  parseNumber,
  calculate,
  OPERATION_HANDLERS,
};
