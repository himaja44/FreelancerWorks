const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./db");

const userRoutes =
    require("./routes/userRoutes");

const jobRoutes =
    require("./routes/jobRoutes");

const applicationRoutes =
    require("./routes/applicationRoutes");

const savedJobRoutes =
    require("./routes/savedJobRoutes");

const profileRoutes =
    require("./routes/profileRoutes");


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://himaja44.github.io"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/jobs",
    jobRoutes
);

app.use(
    "/api/applications",
    applicationRoutes
);

app.use(
    "/api/saved-jobs",
    savedJobRoutes
);

app.use(
    "/api/profile",
    profileRoutes
);


app.get("/", function (req, res) {

    res.json({

        message:
            "Freelancer Works backend is running"

    });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});