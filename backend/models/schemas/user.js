const { Schema } = require("mongoose");
const shortId = require("./types/short-id");

const UserSchema = new Schema(
  {
    shortId,
    img: {
      data: Buffer,
      contentType: String,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
