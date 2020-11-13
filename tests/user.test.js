const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Alex",
  email: "alex@test.com",
  age: 33,
  password: "AlexTest123?",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users/signup")
    .send({
      name: "Giovani",
      email: "giovani@example.com",
      password: "MyPass777!",
      age: 34,
    })
    .expect(201);
});

test("Should login existing user", async () => {
  const { email, password } = userOne;
  await request(app).post("/users/login").send({ email, password }).expect(200);
});
