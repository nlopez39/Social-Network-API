const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      //setting a relationship with the thought document
      //a one-to-many relationship-one reaction for every thought?
      //ask about this ?
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//virtual to return a string format the date
reactionSchema.virtual("formatDate").get(function () {
  return this.createdAt.toDateString();
});
