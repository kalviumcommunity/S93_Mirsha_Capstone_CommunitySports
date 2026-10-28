const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const { title, sport, date, venue, maxParticipants } = req.body;

    if (!title || !sport || !date || !venue || maxParticipants == null) {
      return res.status(400).json({
        message: "All event fields are required",
      });
    }

    const event = await Event.create({
      title,
      sport,
      date,
      venue,
      maxParticipants,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;