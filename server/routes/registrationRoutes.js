const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const { participantName, participantEmail, eventId } = req.body;

    if (!participantName || !participantEmail || !eventId) {
      return res.status(400).json({
        message: "Participant name, email, and event ID are required",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const registration = await Registration.create({
      participantName,
      participantEmail,
      event: event._id,
    });

    const result = await Registration.findById(registration._id).populate("event");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("event");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;