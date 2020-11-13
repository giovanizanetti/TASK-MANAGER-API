const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");
const { TOKEN_SECRET } = process.env;

const existentUserId = new mongoose.Types.ObjectId();

const existentUser = {
  _id: existentUserId,
  name: "Alex",
  email: "alex@test.com",
  age: 33,
  password: "AlexTest123?",
  tokens: [
    {
      token: jwt.sign({ _id: existentUserId }, TOKEN_SECRET),
    },
  ],
};

const nonexistentUser = {
  name: "Anne",
  email: "anne@test.com",
};

// Clear the user created by sigup unit test
// Create a default user for authenticated unit tests
beforeEach(async () => {
  await User.deleteMany();
  await new User(existentUser).save();
});

// TESTS
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
  const { email, password } = existentUser;
  await request(app).post("/users/login").send({ email, password }).expect(200);
});

test("Should not login nonexistent user", async () => {
  const { email, password } = nonexistentUser;
  await request(app).post("/users/login").send({ email, password }).expect(400);
});

test("Should get profile for autheticated user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${existentUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for athenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .set("Authorization", `Bearer ${existentUser.tokens[0].token}`)
    .expect(200);
});

test("Should not delete account for unautheticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
