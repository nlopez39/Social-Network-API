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
      //The function takes two parameters: doc (the original document) and ret (the transformed object).
      transform: function (doc, ret) {
        // Format the 'createdAt' field
        ret.createdAt = ret.createdAt.toLocaleString();
      },
    },
    id: false,
  }
);

module.exports = reactionSchema;
