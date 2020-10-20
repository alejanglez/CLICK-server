// models/User.model.js

const { Schema, model } = require('mongoose');

const providerSchema = new Schema(
  {
    firtName: {
      type: String,
      required: [true, 'FirtName is required.'],
      unique: true,
      maxlength: 20
    },

    lastName: {
      type: String,
      required: [true, 'LastName is required.'],
      unique: true,
      maxlength: 20
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 6
    },
    about: { type: String, maxlength: 200},
    imageUrl: {
    type: String,
    },
    lessonType:{
    type: String,
    enum: [
    "On line",
    "face to face",
      ],
   required: [true],
 },
 imageUrl: {
  type: String,
  },
  serviceCat: {
    type: String,
    enum: [
      "academic support",
      "informatics",
      "guitar lessons",
      "piano lessons",
      "english lessons",
      "math lessons",
      "baby sitting",
      ],
    required: [true],
  },
  aptitudes: {
    type: String,
    enum: [
      "driving licence",
      "animal lover",
      "first aid",
      "sports",
      ],
    required: [true],
  },
  rate: {
   type: Number,
   required: [true],
},
facebookUrl: {
  type: String,
  },
},
{
  timestamps: true,
},
);

module.exports = model('Provider', providerSchema);