// models/User.model.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    address: { type: String, required: true },
    about: { type: String, required: true },
    imageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
