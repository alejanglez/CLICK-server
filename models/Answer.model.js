const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const answerSchema = new Schema(
  {
    autorId: { type: mongoose.ObjectId, ref: "Provider", required: true },
    reciverId: { type: mongoose.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true, maxlength: 40 },
    rating: { type: Number, required: [true], enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Answer", answerSchema);
