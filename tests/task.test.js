const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setUpDataBase,
} = require("./fixtures/db");

beforeEach(setUpDataBase);

test("Should create task for user", async () => {
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

test("Should not create task for non authenticated user", async () => {
  const newTask = { description: "This is a test task" };
  await request(app).post("/tasks").send(newTask).expect(401);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Should fetch only completed tasks", async () => {
  const response = await request(app)
    .get("/tasks?completed=true")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
});

test("Should fetch sorted tasks in descending order of creation", async () => {
  const response = await request(app)
    .get("/tasks?sortBy=createdAt:-1")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].description).toEqual("Second test task");
});

test("Should not update unvalid input", async () => {
  const taskToBeUpdated = { description: "" }; //is not allowed empty task description
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) //User two is not the author from the task
    .send(taskToBeUpdated)
    .expect(400);

  const task = await Task.findById(taskOne._id);
  expect(task.description).not.toEqual(taskToBeUpdated); //confirming that test from db was not updated
});

test("Should not update other users task", async () => {
  const taskToBeUpdated = { description: "Updated test description" };
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`) //User two is not the author from the task
    .send(taskToBeUpdated)
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task.description).not.toEqual(taskToBeUpdated); //confirming that test from db was not updated
});

test("Should delete user task", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`) //User two is not the author from the task
    .send()
    .expect(200);
});

test("Should not delete task if unauthenticated", async () => {
  await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);
});

test("Should not delete other users tasks", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`) //User two is not the author from the task
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
