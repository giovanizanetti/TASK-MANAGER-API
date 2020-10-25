const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log("Unable to connect to database");

    const db = client.db(dbName);

    db.collection("tasks")
      .deleteMany({
        description: "walk the dog",
      })
      .then((res) => console.log(res.deletedCount))
      .catch((err) => console.log(err));
  }
);
