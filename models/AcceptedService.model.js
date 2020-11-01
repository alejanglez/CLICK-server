// models/User.model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const acceptedServiceSchema = new Schema(
  {
    requestedserviceId: {
      type: mongoose.ObjectId,
      ref: "RequestedService",
      required: true,
    },
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
    lessonType: { type: String, enum: ["Online", "In-person"] },
    rate: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    userFirstName: { type: String, required: true, maxlength: 20 },
    userLastName: { type: String, required: true, maxlength: 20 },
    providerFirstName: { type: String, required: true, maxlength: 20 },
    providerLastName: { type: String, required: true, maxlength: 20 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("AcceptedService", acceptedServiceSchema);
