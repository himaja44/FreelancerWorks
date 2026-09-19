const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");


// ======================================================
// REGISTER USER
// ======================================================

exports.registerUser = async function (req, res) {

    try {

        const {
            name,
            email,
            password,
            phone,
            role
        } = req.body;


        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !role
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required."

            });

        }


        // Check role
        if (
            role !== "freelancer" &&
            role !== "client"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid role."

            });

        }


        // Check password length
        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must contain at least 6 characters."

            });

        }


        // Check if email already exists
        const checkEmailSql =
            "SELECT id FROM users WHERE email = ?";


        db.query(
            checkEmailSql,
            [email.trim()],
            async function (error, results) {

                if (error) {

                    console.log(
                        "REGISTER DATABASE ERROR:",
                        error
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error."

                    });

                }


                // Email already exists
                if (results.length > 0) {

                    return res.status(409).json({

                        success: false,

                        message:
                            "Email already registered."

                    });

                }


                // Hash password
                const hashedPassword =
                    await bcrypt.hash(
                        password,
                        10
                    );


                // Insert user
                const insertSql = `
                    INSERT INTO users
                    (name, email, password, phone_number, role)
                    VALUES (?, ?, ?, ?, ?)
                `;


                db.query(
                    insertSql,

                    [
                        name,
                        email.trim(),
                        hashedPassword,
                        phone,
                        role
                    ],

                    function (
                        insertError,
                        result
                    ) {

                        if (insertError) {

                            console.log(
                                "REGISTER INSERT ERROR:",
                                insertError
                            );

                            return res.status(500).json({

                                success: false,

                                message:
                                    "Unable to create account."

                            });

                        }


                        return res.status(201).json({

                            success: true,

                            message:
                                "Registration successful!",

                            userId:
                                result.insertId

                        });

                    }
                );

            }
        );

    }

    catch (error) {

        console.log(
            "REGISTER SERVER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong."

        });

    }

};


// ======================================================
// LOGIN USER
// ======================================================

exports.loginUser = async function (req, res) {

    console.log("LOGIN API CALLED");


    try {

        const {
            email,
            password
        } = req.body;


        // Check required fields
        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required."

            });

        }


        // Find user
        const sql =
            "SELECT * FROM users WHERE email = ?";


        db.query(
            sql,
            [email.trim()],
            async function (error, results) {

                // Database error
                if (error) {

                    console.log(
                        "LOGIN DATABASE ERROR:",
                        error.code,
                        error.message
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error."

                    });

                }


                // User not found
                if (
                    !results ||
                    results.length === 0
                ) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Invalid email or password."

                    });

                }


                const user = results[0];


                console.log(
                    "LOGIN USER FOUND:",
                    user.email
                );


                // Check password
                const passwordMatch =
                    await bcrypt.compare(
                        password,
                        user.password
                    );


                console.log(
                    "PASSWORD MATCH RESULT:",
                    passwordMatch
                );


                // Incorrect password
                if (!passwordMatch) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Invalid email or password."

                    });

                }


                // Create JWT token
                const token =
                    jwt.sign(

                        {
                            id: user.id,

                            email: user.email,

                            name: user.name,

                            phone_number:
                                user.phone_number,

                            role: user.role
                        },

                        process.env.JWT_SECRET,

                        {
                            expiresIn: "30min"
                        }

                    );


                // Login successful
                return res.status(200).json({

                    success: true,

                    message:
                        "Login successful!",

                    token: token,

                    user: {

                        id: user.id,

                        name: user.name,

                        email: user.email,

                        phone_number:
                            user.phone_number,

                        role: user.role

                    }

                });

            }
        );

    }

    catch (error) {

        console.log(
            "LOGIN SERVER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong."

        });

    }

};


// ======================================================
// GET USER PROFILE
// ======================================================

exports.getProfile = function (req, res) {

    // User ID comes from JWT
    const userId = req.user.id;


    const sql = `
        SELECT
            id,
            name,
            email,
            phone_number,
            role
        FROM users
        WHERE id = ?
    `;


    db.query(
        sql,
        [userId],
        function (error, results) {

            // Database error
            if (error) {

                console.log(
                    "PROFILE DATABASE ERROR:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error."

                });

            }


            // User not found
            if (results.length === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found."

                });

            }


            const user = results[0];


            return res.status(200).json({

                success: true,

                message:
                    "Profile retrieved successfully.",

                user: {

                    id: user.id,

                    name: user.name,

                    email: user.email,

                    phone_number:
                        user.phone_number,

                    role: user.role

                }

            });

        }
    );

};