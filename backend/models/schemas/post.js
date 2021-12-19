const { Schema } = require("mongoose");
const shortId = require("./types/short-id");

const PostSchema = new Schema(
  {
    shortId,
    img: {
      data: Buffer,
      contentType: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    startdate: {
      type: String,
      required: true,
    },
    enddate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PostSchema;
