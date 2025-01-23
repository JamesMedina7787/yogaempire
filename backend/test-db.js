require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .query("SELECT 1 + 1 AS result")
  .then((res) => {
    console.log("Database connection successful!");
    console.log("Query result:", res.rows[0]);
    pool.end();
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    pool.end();
  });
