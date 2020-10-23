const mongodb = require("mongodb");
const mongoClient = mongodb.mongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

mongodb.MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log("Unable to connect to database");

    const db = client.db(dbName);

    db.collection("users").insertMany(
      [
        {
          Name: "Lindinha",
          age: 33,
        },
        { Name: "Giovani", age: 34 },
      ],
      (err, res) => {
        if (err) return console.log("Unable to insert documents");

        console.log(res.ops);
      }
    );
  }
);
