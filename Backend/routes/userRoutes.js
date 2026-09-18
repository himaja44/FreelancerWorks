const express = require("express");

const router = express.Router();




const userController =
    require("../controllers/userControllers");




const verifyToken =
    require("../middleware/authMiddleware");


//testing the route 

router.get(
    "/test",
    function (req, res) {

        res.json({

            success: true,

            message:
                "User route is working!"

        });

    }
);




router.post(
    "/register",
    userController.registerUser
);




router.post(
    "/login",
    userController.loginUser
);




router.get(
    "/profile",
    verifyToken,
    userController.getProfile
);




module.exports = router;