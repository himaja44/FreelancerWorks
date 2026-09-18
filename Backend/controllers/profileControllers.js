const db = require("../db");


// ==========================================
// GET MY PROFILE
// ==========================================

exports.getProfile = async function (req, res) {

    try {

        const userId = req.user.id;


        const [users] =
            await db.promise().query(
                `
                SELECT
                    id,
                    name,
                    email,
                    role,
                    phone_number,
                    professional_title,
                    bio,
                    skills,
                    created_at
                FROM users
                WHERE id = ?
                `,
                [userId]
            );


        if (users.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }


        return res.status(200).json({

            success: true,

            user: users[0]

        });

    }

    catch (error) {

        console.log(
            "Get profile error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Unable to load profile."

        });

    }

};



// ==========================================
// UPDATE MY PROFILE
// ==========================================

exports.updateProfile = async function (req, res) {

    try {

        const userId = req.user.id;


        const {
            name,
            phone_number,
            professional_title,
            bio,
            skills
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!name || !name.trim()) {

            return res.status(400).json({

                success: false,

                message: "Name is required."

            });

        }


        if (
            phone_number &&
            !/^[0-9]{10}$/.test(
                phone_number
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Phone number must contain exactly 10 digits."

            });

        }


        // ==========================================
        // UPDATE PROFILE
        // ==========================================

        await db.promise().query(
            `
            UPDATE users

            SET
                name = ?,
                phone_number = ?,
                professional_title = ?,
                bio = ?,
                skills = ?

            WHERE id = ?
            `,
            [
                name.trim(),
                phone_number || null,
                professional_title
                    ? professional_title.trim()
                    : null,
                bio
                    ? bio.trim()
                    : null,
                skills
                    ? skills.trim()
                    : null,
                userId
            ]
        );


        // ==========================================
        // GET UPDATED USER
        // ==========================================

        const [users] =
            await db.promise().query(
                `
                SELECT
                    id,
                    name,
                    email,
                    role,
                    phone_number,
                    professional_title,
                    bio,
                    skills,
                    created_at
                FROM users
                WHERE id = ?
                `,
                [userId]
            );


        return res.status(200).json({

            success: true,

            message:
                "Profile updated successfully.",

            user: users[0]

        });

    }

    catch (error) {

        console.log(
            "Update profile error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update profile."

        });

    }

};