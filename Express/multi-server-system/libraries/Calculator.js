const Logger = require("../libraries/logging"); 

class Calculator {
  constructor() {
    this.id = this.generateRandomId();
    this.logger = new Logger();
  }

  generateRandomId() {
    return Math.floor(Math.random() * 100000000000); 
  }

  add(num1, num2) {
    const value = num1 + num2;
    this.logger.log(this.id, `Add: Result=${value}`);
    return value;
  }

  subtract(num1, num2) {
    const value = num1 - num2;
    this.logger.log(this.id, `Subtract: Result=${value}`);
    return value;
  }

  multiply(num1, num2) {
    const value = num1 * num2;
    this.logger.log(this.id, `Multiply: Result=${value}`);
    return value;
  }

  divide(num1, num2) {
    const value = num2 !== 0 ? num1 / num2 : "Error";
    this.logger.log(this.id, `Divide: Result=${value}`);
    return value;
  }
}

module.exports = Calculator;
