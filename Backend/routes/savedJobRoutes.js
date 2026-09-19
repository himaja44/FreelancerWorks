const express = require("express");

const router = express.Router();


const savedJobController =
    require("../controllers/savedJobControllers");


const authMiddleware =
    require("../middleware/authMiddleware");


// Save job

router.post(
    "/",
    authMiddleware,
    savedJobController.saveJob
);


// Get saved jobs

router.get(
    "/",
    authMiddleware,
    savedJobController.getSavedJobs
);


// Remove saved job

router.delete(
    "/:jobId",
    authMiddleware,
    savedJobController.removeSavedJob
);


module.exports = router;