const express = require("express");
const pool = require("../db"); // Import the PostgreSQL connection
const router = express.Router();

// Route to get all workshops
router.get("/", async (req, res) => {
  try {
    const workshops = await pool.query("SELECT * FROM workshops");
    res.status(200).json(workshops.rows);
  } catch (err) {
    console.error("Error fetching workshops:", err.message);
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

// Route to add a new workshop
router.post("/", async (req, res) => {
  const { name, description, date } = req.body;
  try {
    const newWorkshop = await pool.query(
      "INSERT INTO workshops (name, description, date) VALUES ($1, $2, $3) RETURNING *",
      [name, description, date]
    );
    res.status(201).json(newWorkshop.rows[0]);
  } catch (err) {
    console.error("Error creating workshop:", err.message);
    res.status(500).json({ error: "Failed to create workshop" });
  }
});

// Route to add a student to a workshop
router.post("/:id/students", async (req, res) => {
  const { id } = req.params;
  const { name, email, notes } = req.body;

  try {
    // Check if the workshop exists
    const workshop = await pool.query("SELECT * FROM workshops WHERE id = $1", [id]);
    if (workshop.rows.length === 0) {
      return res.status(404).json({ error: "Workshop not found." });
    }

    // Add student to the workshop (this assumes you have a "students" table or JSON column)
    const updatedWorkshop = await pool.query(
      "UPDATE workshops SET students = array_append(students, $1) WHERE id = $2 RETURNING *",
      [`{"name": "${name}", "email": "${email}", "notes": "${notes}"}`, id]
    );

    res.status(201).json(updatedWorkshop.rows[0]);
  } catch (err) {
    console.error("Error adding student:", err.message);
    res.status(500).json({ error: "Failed to add student." });
  }
});

module.exports = router;
