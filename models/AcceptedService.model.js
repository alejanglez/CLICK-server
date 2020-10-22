// models/User.model.js

const { Schema, model } = require('mongoose');

const providerSchema = new Schema(
  {
    requestedserviceId: { type: mongoose.ObjectId, ref: "RequestedService", required: true },
    totalPrice: {
      type: number,
    },
  },
  {
    timestamps: true,
  },
  );

module.exports = model('Provider', providerSchema);