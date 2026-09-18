const express = require("express");

const router = express.Router();


const profileController =
    require("../controllers/profileControllers");


const authMiddleware =
    require("../middleware/authMiddleware");


// Get profile

router.get(
    "/",
    authMiddleware,
    profileController.getProfile
);


// Update profile

router.put(
    "/",
    authMiddleware,
    profileController.updateProfile
);


module.exports = router;