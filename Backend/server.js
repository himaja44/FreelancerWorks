const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./db");

const savedJobRoutes =
    require("./routes/savedJobRoutes");

const profileRoutes =
    require("./routes/profileRoutes");

const userRoutes =
    require("./routes/userRoutes");

const jobRoutes =
    require("./routes/jobRoutes");

const applicationRoutes =
    require("./routes/applicationRoutes");


const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());


// Serve uploaded files
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
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
        message: "Freelancer Works backend is running"
    });

});

app.get("/api/db-test", function (req, res) {

    db.query("SELECT 1 AS test", function (error, results) {

        if (error) {
            console.log("DATABASE TEST ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Database connection failed",
                error: error.message
            });
        }

        res.json({
            success: true,
            message: "Database connection is working",
            result: results
        });
    });

});

app.listen(PORT, function () {

    console.log(
        `Freelancer Works backend running on http://localhost:${PORT}`
    );

});