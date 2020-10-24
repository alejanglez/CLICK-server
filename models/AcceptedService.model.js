// models/User.model.js

const { Schema, model } = require('mongoose');

const providerSchema = new Schema(
  {
    requestedserviceId: { type: mongoose.ObjectId, ref: "RequestedService", required: true },
    totalPrice: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
  );

module.exports = model('Provider', providerSchema);