const {
  calculateTip,
  ferenheitToCelsius,
  celsiusToFereinheit,
  add,
} = require("../src/math");

test("Should calculate total with tip", () => {
  const total = calculateTip(100, 0.2);
  expect(total).toBe(120);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(100);
  expect(total).toBe(115);
});

test("Should convert 32 F to 0 C", () => {
  const conversion = ferenheitToCelsius(32);
  expect(conversion).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const conversion = celsiusToFereinheit(0);
  expect(conversion).toBe(32);
});

test("Async demo", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});

test("Should add to numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add to numbers ASYNC / AWAIT", async () => {
  const sum = await add(2, 10);
  expect(sum).toBe(12);
});
