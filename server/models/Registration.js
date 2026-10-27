const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  participantName: {
    type: String,
    required: true,
  },
  participantEmail: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);