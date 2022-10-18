/** @format */

const { Schema, model } = require("mongoose");

const adverSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    image: {
      type: [String],
    },
    attributes: Array,
    status: {
      type: String,
      enum: ["draft", "moderation", "active", "closed"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

adverSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  return obj;
};
const Advert = model("Advert", adverSchema);
module.exports = Advert;
