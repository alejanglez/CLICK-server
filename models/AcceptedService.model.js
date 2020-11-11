// models/User.model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const acceptedServiceSchema = new Schema(
  {
    userId: { type: String, required: true },
    providerId: { type: String, required: true },
    requestedServiceId: {
      type: mongoose.ObjectId,
      ref: "RequestedService",
      required: true,
    },
    quantity: { type: Number, default: 0 },
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
    userFirstName: { type: String, required: true, maxlength: 20 },
    userLastName: { type: String, required: true, maxlength: 20 },
    providerFirstName: { type: String, required: true, maxlength: 20 },
    providerLastName: { type: String, required: true, maxlength: 20 },
    date: {
      type: String,
    },
    userImageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
    providerImageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("AcceptedService", acceptedServiceSchema);
