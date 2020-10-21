// models/User.model.js

const { Schema, model } = require('mongoose');

const providerSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    providerId: { type: mongoose.ObjectId, ref: "Provider", required: true },
    quantity: {
    type: Number, default: 0,
        },
    day: {
     type: Number,
      enum: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        ],
        },
     month: {
     type: String,
      enum: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
        ],
        },
      year: {
     type: Number,
      enum: [
        "2020",
        "2021",
        ],
        },
     hours: {
     type: Number,
      enum: [
        "1",
        "2",
        "3",
        "4",
        "5",
        ],
        },
      },
      {
        timestamps: true,
      },
  );

module.exports = model('Provider', providerSchema);