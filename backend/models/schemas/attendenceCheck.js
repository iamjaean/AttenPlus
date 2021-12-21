const { Schema } = require("mongoose");

const attendenceCheckSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    challenge: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
    },
    attendanceDate: {
        type: String,
    }
  },
);

module.exports = attendenceCheckSchema;