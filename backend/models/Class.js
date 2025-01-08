const mongoose = require("mongoose");

// Define the Class Schema
const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the class (e.g., "Vinyasa Flow")
  time: { type: String, required: true }, // Time of the class (e.g., "08:00 AM")
  capacity: { type: Number, default: 20 }, // Maximum number of students allowed
  instructor: { type: String }, // Name of the instructor
  createdAt: { type: Date, default: Date.now }, // When the class was created
});

// Create the Class model
const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
