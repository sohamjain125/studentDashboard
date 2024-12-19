const express = require("express");
const cors = require("cors"); // Import CORS package
const supabase = require("./supabaseClient");
require("dotenv").config();
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  })
);

app.use(express.json());

// API Endpoints
app.get("/students", async (req, res) => {
  const { data, error } = await supabase.from("students").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post("/students", async (req, res) => {
  console.log("Received data:", req.body); // Check received data
  const { name, cohort, courses, status, datejoin } = req.body;

  // Validate required fields
  if (
    !name ||
    !cohort ||
    !Array.isArray(courses) ||
    typeof status !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid or missing fields" });
  }

  try {
    const { error } = await supabase
      .from("students")
      .insert([{ name, cohort, courses, status, datejoin }]);
    if (error) throw error;
    res.json({ message: "Student added successfully" });
  } catch (err) {
    console.error("Error inserting student:", err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Student deleted successfully" });
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, cohort, courses, status } = req.body;
  const { error } = await supabase
    .from("students")
    .update({ name, cohort, courses, status })
    .eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Student updated successfully" });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
