//define Mongoose
const { Schema, model } = require("mongoose");
//create a new instance of the mongoose schema to define shape of document
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    //email still needs validate email to match mongoose email ?
    email: {
      type: String,
      required: true,
      unique: true,
      //email validator
      validate: {
        validator: function (e) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
        },
      },
    },
    //array of _id values referencing the thoughts model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    //array of _id values referencing the user model itself
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    //removes the extra id
    id: false,
  }
);

//virtual that will count the number of friends the user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//using mongoose.model() to complie a model based on the schema
//User is the name of the model
//userSchema is the name of the schema we are using to create an instance of the model
const User = model("user", userSchema);

module.exports = User;

//TO MOVE ON:
//look at activity 13, 15, 17, maybe 19 for aggregation,
//21 virtuals is complexx. I think this is what the app is suppose to look like ???
//look at Activity 24- this is what the app should look like at the end of it all 0_0

//this was used to create one user record before we created the routes
// //error handler function to be called when an error occurs when saving doc
// const handleError = (err) => console.error(err);
// //we use the model to create individual docs
// User.create({
//   username: "Jen700",
//   email: "jen@gmail.com",
// })
//   .then((result) => console.log("created new document", result))
//   .catch((err) => handleError(err));
