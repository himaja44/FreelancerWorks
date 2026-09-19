const express = require("express");

const router = express.Router();

const jobController =
    require("../controllers/jobControllers");

const authMiddleware =
    require("../middleware/authMiddleware");


// ==========================================
// GET ALL JOBS
// ==========================================

router.get(
    "/",
    jobController.getAllJobs
);


// ==========================================
// GET MY JOBS
// IMPORTANT: THIS MUST COME BEFORE /:id
// ==========================================

router.get(
    "/my-jobs",
    authMiddleware,
    jobController.getMyJobs
);


// ==========================================
// GET SINGLE JOB
// ==========================================

router.get(
    "/:id",
    jobController.getJobById
);


// ==========================================
// CREATE JOB
// ==========================================

router.post(
    "/",
    authMiddleware,
    jobController.createJob
);


// ==========================================
// DELETE JOB
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    jobController.deleteJob
);


module.exports = router;