const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");
// const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// app.post("/tasks", async (req, res) => {
//   const task = new Task(req.body);

//   try {
//     task.save();
//     res.status(201).send(task);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(201).send(tasks);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// app.get("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const task = await Task.findById(_id);
//     if (!task) return res.status(404).send();
//     res.send(task);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// app.patch("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;
//   const newData = req.body;
//   const updates = Object.keys(newData);
//   const options = { new: true, runValidators: true, useFindAndModify: false };
//   const allowedUpdates = ["description", "completed"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   try {
//     const task = await Task.findByIdAndUpdate(_id, newData, options);
//     if (!isValidOperation)
//       return res.status(400).send({ error: "Invalid update!" });
//     if (!task) return res.status(404).send();
//     res.send(task);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.delete("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const task = await Task.findByIdAndDelete(_id);
//     if (!task) return res.status(404).send({ error: "Task not found!" });
//     res.send(task);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
