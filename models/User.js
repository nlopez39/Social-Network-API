//define Mongoose
const mongoose = require("mongoose");
//create a new instance of the mongoose schema to define shape of document
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  //email still needs validate email to match mongoose email ?
  email: { type: String, required: true, unique: true },
  //array of _id values referencing the thoughts model
  //thoughts: [arrayofThoughts],
  //array of _id values referencing the user model itself
  //friends: [arrayOfIds]
});

//using mongoose.model() to complie a model based on the schema
//User is the name of the model
//userSchema is the name of the schema we are using to create an instance of the model
const User = mongoose.model("User", userSchema);
//error handler function to be called when an error occurs when saving doc
const handleError = (err) => console.error(err);
//we use the model to create individual docs
User.create({
  username: "Jen700",
  email: "jen@gmail.com",
})
  .then((result) => console.log("created new document", result))
  .catch((err) => handleError(err));

module.exports = User;
