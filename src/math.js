const calculateTip = (amount, percentage = 0.15) =>
  amount * percentage + amount;

const ferenheitToCelsius = (temp) => (temp - 32) / 1.8;

const celsiusToFereinheit = (temp) => temp * 1.8 + 32;

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Rejected");
      }
      resolve(a + b);
    }, 2000);
  });
};

module.exports = {
  calculateTip,
  ferenheitToCelsius,
  celsiusToFereinheit,
  add,
};
