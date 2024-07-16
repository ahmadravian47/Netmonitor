const mongoose = require("mongoose");

const monitorSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
  }
});

const Monitor = mongoose.model("Monitor", monitorSchema);

module.exports = Monitor;