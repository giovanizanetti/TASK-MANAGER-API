const request = require("supertest");
const app = require("../src/app");

test("Should signup a new user", async () => {
  await request(app)
    .post("/users/signup")
    .send({
      name: "Giovani",
      email: "giovani@example.com",
      password: "MyPass777!",
      age: "34",
    })
    .expect(201);
});
