const mongoose = require("mongoose");

const monitorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  lastEmailSent: {
    type: Date,
    default: null,
  }
});

const Monitor = mongoose.model("Monitor", monitorSchema);

module.exports = Monitor;
