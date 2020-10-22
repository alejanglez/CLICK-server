// models/User.model.js

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
  },
  {
    timestamps: true
  }

);

module.exports = model('User', userSchema);