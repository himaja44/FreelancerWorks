const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./db");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// STATIC UPLOADS FOLDER
// ==========================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==========================================
// ROUTES
// ==========================================

app.use("/api/users", userRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/saved-jobs", savedJobRoutes);

app.use("/api/profile", profileRoutes);

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", function (req, res) {
  res.json({
    message: "Freelancer Works backend is running"
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});