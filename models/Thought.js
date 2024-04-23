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
      transform: function (doc, ret) {
        // Format the 'createdAt' field
        ret.createdAt = ret.createdAt.toDateString();
      },
    },

    id: false,
  }
);

//virtual that will calculate the number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
//initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
