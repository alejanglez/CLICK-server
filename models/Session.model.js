const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const sessionSchema = new Schema({
  userId: { type: ObjectId, ref: "User" },
  providerId: { type: ObjectId, ref: "Provider" },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: { expires: 60 * 60 * 24 },
  },
});

const Session = model("Session", sessionSchema);

module.exports = Session;
