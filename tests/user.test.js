const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const existinUser = {
  name: "Alex",
  email: "alex@test.com",
  age: 33,
  password: "AlexTest123?",
};

const nonexistentUser = {
  name: "Anne",
  email: "anne@test.com",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(existinUser).save();
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
  const { email, password } = existinUser;
  await request(app).post("/users/login").send({ email, password }).expect(200);
});

test("Should not login nonexistent user", async () => {
  const { email, password } = nonexistentUser;
  await request(app).post("/users/login").send({ email, password }).expect(400);
});
