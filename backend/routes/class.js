const express = require("express");
const pool = require("../db"); // Import PostgreSQL connection pool
const router = express.Router();

// Create a new class
router.post("/", async (req, res) => {
  const { name, time, capacity = 20, instructor } = req.body;

  try {
    const newClass = await pool.query(
      "INSERT INTO classes (name, time, capacity, instructor) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, time, capacity, instructor]
    );
    res.status(201).json(newClass.rows[0]);
  } catch (error) {
    console.error("Error creating class:", error.message);
    res.status(500).json({ error: "Failed to create class." });
  }
});

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await pool.query("SELECT * FROM classes");
    res.status(200).json(classes.rows);
  } catch (error) {
    console.error("Error fetching classes:", error.message);
    res.status(500).json({ error: "Failed to fetch classes." });
  }
});

// Update a class by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, time, capacity, instructor } = req.body;

  try {
    const updatedClass = await pool.query(
      "UPDATE classes SET name = $1, time = $2, capacity = $3, instructor = $4 WHERE id = $5 RETURNING *",
      [name, time, capacity, instructor, id]
    );

    if (updatedClass.rows.length === 0) {
      return res.status(404).json({ error: "Class not found." });
    }

    res.status(200).json(updatedClass.rows[0]);
  } catch (error) {
    console.error("Error updating class:", error.message);
    res.status(500).json({ error: "Failed to update class." });
  }
});

// Delete a class by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await pool.query(
      "DELETE FROM classes WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedClass.rows.length === 0) {
      return res.status(404).json({ error: "Class not found." });
    }

    res.status(200).json({ message: "Class deleted successfully." });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    res.status(500).json({ error: "Failed to delete class." });
  }
});

module.exports = router;
