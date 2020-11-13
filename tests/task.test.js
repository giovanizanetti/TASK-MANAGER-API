const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOne, userOneId, setUpDataBase } = require("./fixtures/db");

beforeEach(setUpDataBase);

test("should create task for user", async () => {});
