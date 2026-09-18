const express = require("express");

const router = express.Router();

const applicationController =
    require("../controllers/applicationControllers");

const authMiddleware =
    require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");    


// ==========================================
// CREATE APPLICATION
// ==========================================

router.post(
    "/",
    authMiddleware,
    upload.single("resume"),
    applicationController.createApplication
);


// ==========================================
// GET MY APPLICATIONS - FREELANCER
// ==========================================

router.get(
    "/my",
    authMiddleware,
    applicationController.getMyApplications
);


// ==========================================
// GET APPLICANTS FOR CLIENT JOB
// ==========================================

router.get(
    "/job/:jobId",
    authMiddleware,
    applicationController.getApplicantsByJob
);


// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

router.put(
    "/:id/status",
    authMiddleware,
    applicationController.updateApplicationStatus
);


module.exports = router;