// models/User.model.js

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firtName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, maxlength: 200},
    imageUrl: String,
  },
  {
    timestamps: true,
  }
  {
    firtName: {
      type: String,
      required: [true, 'firtName is required.'],
      unique: true,
      maxlength: 20
    },
    lastName: {
      type: String,
      required: [true, 'firtName is required.'],
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
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);