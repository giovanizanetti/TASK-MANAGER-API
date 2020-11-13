const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const { TOKEN_SECRET } = process.env;
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
  age: 33,
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, TOKEN_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  const newUser = {
    name: "luis",
    email: "luis@example.com",
    password: "MyPass978!",
    age: "32",
  };
  const response = await request(app)
    .post("/users/signup")
    .send(newUser)
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe(newUser.password); //Check is password is not saved as plain string to the db
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "thisisnotmypass", //Wrong passord
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticate user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer)); //use ToEqual to compare objects as opposed to toBe
});

test("Should update valid user fields", async () => {
  const updatedFields = { name: "Jair" };
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(updatedFields)
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual(updatedFields.name);
});

test("Should not update unauthenticated user", async () => {
  const updatedFields = { name: "Jair" };
  await request(app).patch("/users/me").send(updatedFields).expect(401);
});

test("Should not update invalid user fields", async () => {
  const invalidFields = { color: "blue" };
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(invalidFields)
    .expect(400);
});
