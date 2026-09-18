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

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://himaja44.github.io"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

// Static uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/users", userRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/saved-jobs", savedJobRoutes);

app.use("/api/profile", profileRoutes);

// Home route
app.get("/", function (req, res) {
  res.json({
    message: "Freelancer Works backend is running"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});