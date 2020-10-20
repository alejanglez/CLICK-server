const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const sessionSchema = new Schema({
  userId: { type: ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: { expires: 60*1000*60} //One hour
  },
});

const Session = model("Session", sessionSchema);

module.exports = Session;
