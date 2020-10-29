const Task = require("../src/models/task");
require("../src/db/mongoose");

// Task.findByIdAndDelete("5f958147a99a94dae3f71106")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => console.log(count))
//   .catch((err) => console.log(err));

const deleteTaskAndCount = async (_id) => {
  await Task.findByIdAndDelete(_id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5f98549f535f66000b9457c3")
  .then((count) => console.log("count: " + count))
  .catch((err) => console.log(err));
