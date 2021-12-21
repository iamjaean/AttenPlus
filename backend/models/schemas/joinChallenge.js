const { Schema } = require("mongoose");

const JoinChellengeSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    challenge: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
    }
  }
);

module.exports = JoinChellengeSchema;
