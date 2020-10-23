const mongodb = require("mongodb");
const mongoClient = mongodb.mongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

mongodb.MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(dbName);

    db.collection("users").insertOne({
      Name: "Lindinha",
      age: 33,
    });
  }
);
