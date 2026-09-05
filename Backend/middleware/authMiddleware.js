const jwt = require("jsonwebtoken");


const verifyToken = function (req, res, next) {

    try {

        

        const authHeader =
            req.headers.authorization;




        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied. No token provided."

            });

        }


        //bearer token

        const token =
            authHeader.split(" ")[1];


        // Check  the token

        if (!token) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied. Invalid token."

            });

        }


        // Verify the Jwt

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Store user information

        req.user = decoded;


        // Continue to next function

        next();

    }

    catch (error) {

        console.log(error.message);

        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token."

        });

    }

};


module.exports = verifyToken;