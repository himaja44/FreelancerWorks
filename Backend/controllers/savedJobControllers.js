const db = require("../db");


// ==========================================
// SAVE JOB
// ==========================================

exports.saveJob = async function (req, res) {

    try {

        const userId = req.user.id;

        const { job_id } = req.body;


        if (!job_id) {

            return res.status(400).json({

                success: false,

                message: "Job ID is required."

            });

        }


        // Check job exists

        const [job] =
            await db.promise().query(
                `
                SELECT id
                FROM jobs
                WHERE id = ?
                `,
                [job_id]
            );


        if (job.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Job not found."

            });

        }


        // Check if already saved

        const [existing] =
            await db.promise().query(
                `
                SELECT id
                FROM saved_jobs
                WHERE freelancer_id = ?
                AND job_id = ?
                `,
                [
                    userId,
                    job_id
                ]
            );


        if (existing.length > 0) {

            return res.status(409).json({

                success: false,

                message: "Job is already saved."

            });

        }


        // Save job

        await db.promise().query(
            `
            INSERT INTO saved_jobs
            (
                freelancer_id,
                job_id
            )
            VALUES (?, ?)
            `,
            [
                userId,
                job_id
            ]
        );


        return res.status(201).json({

            success: true,

            message: "Job saved successfully."

        });

    }

    catch (error) {

        console.log(
            "Save job error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Unable to save job."

        });

    }

};



// ==========================================
// REMOVE SAVED JOB
// ==========================================

exports.removeSavedJob = async function (req, res) {

    try {

        const userId =
            req.user.id;

        const jobId =
            req.params.jobId;


        await db.promise().query(
            `
            DELETE FROM saved_jobs
            WHERE freelancer_id = ?
            AND job_id = ?
            `,
            [
                userId,
                jobId
            ]
        );


        return res.status(200).json({

            success: true,

            message:
                "Job removed from saved jobs."

        });

    }

    catch (error) {

        console.log(
            "Remove saved job error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to remove saved job."

        });

    }

};



// ==========================================
// GET SAVED JOBS
// ==========================================

exports.getSavedJobs = async function (req, res) {

    try {

        const userId =
            req.user.id;


        const [jobs] =
            await db.promise().query(
                `
                SELECT

                    s.id AS saved_id,

                    s.created_at AS saved_at,

                    j.id,

                    j.title,

                    j.description,

                    j.category,

                    j.skills,

                    j.requirements,

                    j.responsibilities,

                    j.budget_min,

                    j.budget_max,

                    j.job_type,

                    j.created_at

                FROM saved_jobs s

                INNER JOIN jobs j
                    ON s.job_id = j.id

                WHERE s.freelancer_id = ?

                ORDER BY s.created_at DESC
                `,
                [userId]
            );


        return res.status(200).json({

            success: true,

            jobs: jobs

        });

    }

    catch (error) {

        console.log(
            "Get saved jobs error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch saved jobs."

        });

    }

};