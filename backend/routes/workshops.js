const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define the Workshop Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  notes: String,
});

const WorkshopSchema = new mongoose.Schema({
  students: [StudentSchema],
  date: String,
  time: String,
  capacity: { type: Number, default: 20 },
  minimumStudents: { type: Number, default: 7 },
});

const Workshop = mongoose.model("Workshop", WorkshopSchema);

// Create a new workshop
router.post("/", async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).json(workshop);
  } catch (err) {
    console.error("Error creating workshop:", err);
    res.status(500).json({ error: "Failed to create workshop." });
  }
});

// Get all workshops
router.get("/", async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json(workshops);
  } catch (err) {
    console.error("Error fetching workshops:", err);
    res.status(500).json({ error: "Failed to fetch workshops." });
  }
});

// Add a student to a workshop
router.post("/students", async (req, res) => {
  try {
    const { name, email, notes } = req.body;
    const workshop = await Workshop.findOne();

    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found." });
    }

    if (workshop.students.length >= workshop.capacity) {
      return res.status(400).json({ error: "The class is full!" });
    }

    workshop.students.push({ name, email, notes });
    await workshop.save();
    res.status(201).json(workshop);
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Failed to add student." });
  }
});

module.exports = router;
