const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, userOneId, setUpDataBase } = require("./fixtures/db");

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
