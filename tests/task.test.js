const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, userTwo, setUpDataBase } = require("./fixtures/db");

beforeEach(setUpDataBase);

test("should create task for user", async () => {
  const newTask = { description: "This is a test task" };
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(newTask)
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Should not fetch user tasks which are not their", async () => {
  const task = await Task.findOne({ description: "First test task" });
  await request(app)
    .delete(`/tasks/${task._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(401);
});
