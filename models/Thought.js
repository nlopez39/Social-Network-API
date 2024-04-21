const { Schema, model } = require("mongoose");
//import Reaction module
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    //Use a getter method to format the timestamp on query
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//TODO: get createdDate to show up as FormatDate
//virtual to return a string format the date
thoughtSchema.virtual("formatDate").get(function () {
  return this.createdAt.toDateString();
});

//virtual that will calculate the number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
//initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
