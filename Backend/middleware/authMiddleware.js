const jwt = require("jsonwebtoken");


function verifyToken(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;


        // Check Authorization header
        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied. No token provided."

            });

        }


        // Check Bearer format
        if (
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid authorization format."

            });

        }


        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({

                success: false,

                message:
                    "Access denied. Token missing."

            });

        }


        // Verify JWT
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // Store decoded user information
        req.user = decoded;


        console.log(
            "AUTHENTICATED USER:",
            {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            }
        );


        next();

    }

    catch (error) {

        console.log(
            "AUTH MIDDLEWARE ERROR:",
            error.message
        );


        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token."

        });

    }

}


module.exports = verifyToken;