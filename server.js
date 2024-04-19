const express = require("express");
//calls mongoose connection which has wrapped local MongoDB connection
const db = require("./config/connection");
//require model
const { User } = require("./models");

// const { MongoClient } = require("mongodb");

const app = express();
const port = 3001;
//how incoming data is handled
app.use(express.urlencoded({ extended: true }));
//built in expres function that parsses incoming requests to JSON
app.use(express.json());

//connection string to local instance of MongoDB
//this is defined in connections.js
// const connectionStringURI = `mongodb://127.0.0.1:27017`;

//intialize a new instance of MongoClient
//not needed either
// const client = new MongoClient(connectionStringURI);

//decalre a variable to hold the connection
// let db;

//create a variable to hold our database name
// const dbName = "socialDB";

//use connect method to connect to the mongo server
//what happens to this? does it go to the user.js file instead?
// client
//   .connect()
//   .then(() => {
//     //callback function
//     console.log("connected successfully to mongodb");
//     //use client.db() constructor to add a new db instance
//     //the var is global
//     db = client.db(dbName);
//     //startup express server
//     app.listen(port, () => {
//       console.log(`Example app listening at http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Mongo connection error: ", err.message);
//   });

//create HTTP requests to create and read data
//inserting is happening in the user.js now
// app.post("/create", (req, res) => {
//   //use db connection to add a document
//   db.collection("socialMediaPost")
//     .insertOne({ name: req.body.name, title: req.body.title })
//     .then((results) => res.json(results))
//     .catch((err) => {
//       if (err) throw err;
//     });
// });
//get all users
app.get("/all-users", async (req, res) => {
  try {
    //using model in route to find all docs that are instanes of that model
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Internal server Error" });
  }
});
//is this a mongoose function?- the db.once("open")?
db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server running and listening at http://localhost:${port}`);
  });
});

// //read the socialmedia posts
// app.get("/read", (req, res) => {
//   db.collection("socialMediaPost")
//     .find()
//     .toArray()
//     .then((results) => res.json(results))
//     .catch((err) => {
//       if (err) throw err;
//     });
// });
