const express = require("express");
const Class = require("../models/Class"); // Import the Class model
const router = express.Router();

// Create a new class
router.post("/", async (req, res) => {
  try {
    const newClass = new Class({
      name: req.body.name,
      time: req.body.time,
      capacity: req.body.capacity,
      instructor: req.body.instructor,
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Failed to create class." });
  }
});

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Failed to fetch classes." });
  }
});

// Update a class by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, time: req.body.time, capacity: req.body.capacity },
      { new: true } // Return the updated document
    );

    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found." });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ error: "Failed to update class." });
  }
});

// Delete a class by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found." });
    }

    res.status(200).json({ message: "Class deleted successfully." });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ error: "Failed to delete class." });
  }
});

module.exports = router;
