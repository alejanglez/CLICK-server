// models/User.model.js

const { Schema, model } = require('mongoose');

const providerSchema = new Schema(

  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, required: true, maxlength: 200 },
    imageUrl: String,
    lessonType:{ type: String, enum: [ "On line", "face to face"]},
    serviceCat: { type: String, required: [true],
      enum: [
        "academic support",
        "informatics",
        "guitar lessons",
        "piano lessons",
        "english lessons",
        "math lessons",
        "baby sitting",
        ],
    },
    aptitudes: [{
    type: String,
    enum: [
      "driving licence",
      "animal lover",
      "first aid",
      "sports",
      ],
    }],
    rate: {
    type: Number,
    required: true,
    },
    facebookUrl: {
    type: String,
    },
  },
    {
    timestamps: true
    },
);

module.exports = model('Provider', providerSchema);