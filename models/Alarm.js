const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Alarm name is required"],
      minlength: [3, "Alarm name must be at least 3 characters"],
      trim: true,
    },

    interval: {
      type: Number,
      required: [true, "Interval is required"],
      min: [1, "Interval must be greater than 0"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Alarm = mongoose.model("Alarm", alarmSchema);

module.exports = Alarm;
