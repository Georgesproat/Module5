
const Calculator = require("../libraries/Calculator");

const calculator = new Calculator();

exports.add = (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const sum = calculator.add(num1, num2);
  res.json({ result: sum });
};

exports.subtract = (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const difference = calculator.subtract(num1, num2);
  res.json({ result: difference });
};

exports.multiply = (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const product = calculator.multiply(num1, num2);
  res.json({ result: product });
};

exports.divide = (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const quotient = calculator.divide(num1, num2);
  res.json({ result: quotient });
};
