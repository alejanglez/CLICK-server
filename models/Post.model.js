const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    providerId: { type: mongoose.ObjectId, ref: "Provider", required: true },
    comment: { type: String, required: true, maxlength: 40 },
    rating: { type: Number, required: [true], enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
