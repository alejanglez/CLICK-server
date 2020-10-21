// models/User.model.js

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    fullname: { type: String, required: true, maxlength: 20 },
    birthday: { type: Date },
    zipcode: { type: Number, required: true, maxlength: 30 },
    address: { type: String, required: true, maxlength: 30 },
    phone: { type: String, required: true, minlength: 9, maxlength: 9 },
  },
  {
    timestamps: true
  }

);

module.exports = model('User', userSchema);