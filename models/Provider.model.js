const { Schema, model } = require("mongoose");

const providerSchema = new Schema(
  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, required: true, maxlength: 200 },
    imageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
    lessonType: { type: String, enum: ["Online", "In-person"] },
    serviceCat: {
      type: String,
      required: [true],
      enum: [
        "Academic Support",
        "Informatics",
        "Guitar Lessons",
        "Piano Lessons",
        "English Lessons",
        "Math Lessons",
        "Baby Sitting",
      ],
    },
    aptitudes: [
      {
        type: String,
        enum: ["driving licence", "animal lover", "first aid", "sports"],
      },
    ],
    rate: {
      type: Number,
      default: 0,
    },
    facebookUrl: {
      type: String,
    },
    // role: { type: String, default: "provider" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Provider", providerSchema);
