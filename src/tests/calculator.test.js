const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  parseNumber,
  calculate,
} = require("../calculator");

describe("calculator functions", () => {
  describe("addition", () => {
    test("adds the example values from the image", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("adds negative and decimal values", () => {
      expect(add(-2, 3.5)).toBe(1.5);
    });
  });

  describe("subtraction", () => {
    test("subtracts the example values from the image", () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test("returns a negative result when the right operand is larger", () => {
      expect(subtract(4, 10)).toBe(-6);
    });
  });

  describe("multiplication", () => {
    test("multiplies the example values from the image", () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test("multiplies by zero", () => {
      expect(multiply(99, 0)).toBe(0);
    });
  });

  describe("division", () => {
    test("divides the example values from the image", () => {
      expect(divide(20, 5)).toBe(4);
    });

    test("supports decimal results", () => {
      expect(divide(7, 2)).toBe(3.5);
    });

    test("throws for division by zero", () => {
      expect(() => divide(10, 0)).toThrow("Division by zero is not allowed.");
    });
  });

  describe("modulo", () => {
    test("calculates the example values from the image", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("returns zero when numbers divide evenly", () => {
      expect(modulo(12, 3)).toBe(0);
    });

    test("throws for modulo by zero", () => {
      expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("power", () => {
    test("calculates the example values from the image", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("supports zero as an exponent", () => {
      expect(power(9, 0)).toBe(1);
    });
  });

  describe("square root", () => {
    test("calculates the example value from the image", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("supports decimal results", () => {
      expect(squareRoot(2)).toBeCloseTo(1.41421356237);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-16)).toThrow(
        "Square root of a negative number is not allowed."
      );
    });
  });

  describe("input parsing", () => {
    test("parses numeric strings", () => {
      expect(parseNumber("12.5", "left")).toBe(12.5);
    });

    test("throws for invalid numbers", () => {
      expect(() => parseNumber("abc", "right")).toThrow(
        "The right value must be a valid number."
      );
    });
  });

  describe("operation dispatch", () => {
    test("supports named operations", () => {
      expect(calculate("add", 8, 2)).toBe(10);
      expect(calculate("subtract", 8, 2)).toBe(6);
      expect(calculate("multiply", 8, 2)).toBe(16);
      expect(calculate("divide", 8, 2)).toBe(4);
      expect(calculate("modulo", 8, 3)).toBe(2);
      expect(calculate("power", 2, 4)).toBe(16);
      expect(calculate("sqrt", 16)).toBe(4);
    });

    test("supports symbol operations", () => {
      expect(calculate("+", 8, 2)).toBe(10);
      expect(calculate("-", 8, 2)).toBe(6);
      expect(calculate("*", 8, 2)).toBe(16);
      expect(calculate("/", 8, 2)).toBe(4);
      expect(calculate("%", 8, 3)).toBe(2);
      expect(calculate("^", 2, 4)).toBe(16);
      expect(calculate("√", 16)).toBe(4);
    });

    test("throws for unsupported operations", () => {
      expect(() => calculate("cube", 2, 3)).toThrow(
        "Unsupported operation: cube"
      );
    });
  });
});
