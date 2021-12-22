const { Schema } = require("mongoose");

const attendanceCheckSchema = new Schema(
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

module.exports = attendanceCheckSchema;