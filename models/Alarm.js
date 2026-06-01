const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  interval: {
    type: Number,
    required: true,
  },
});

const Alarm = mongoose.model("Alarm", alarmSchema);

module.exports = Alarm;
