const db = require("../db");


// ==========================================
// GET ALL JOBS
// ==========================================

exports.getAllJobs = function (req, res) {

    const sql = `
        SELECT
            id,
            title,
            description,
            category,
            skills,
            requirements,
            responsibilities,
            budget_min,
            budget_max,
            job_type,
            client_id,
            created_at
        FROM jobs
        ORDER BY created_at DESC
    `;

    db.query(
        sql,
        function (error, results) {

            if (error) {

                console.log(
                    "Get all jobs error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Unable to load jobs."
                });

            }

            return res.status(200).json({
                success: true,
                jobs: results
            });

        }
    );

};



// ==========================================
// GET MY JOBS
// ==========================================

exports.getMyJobs = async function (req, res) {

    try {

        const clientId = req.user.id;

        console.log(
            "GET MY JOBS - CLIENT ID:",
            clientId
        );


        const [jobs] =
            await db.promise().query(
                `
                SELECT
                    id,
                    title,
                    description,
                    category,
                    skills,
                    requirements,
                    responsibilities,
                    budget_min,
                    budget_max,
                    job_type,
                    client_id,
                    created_at
                FROM jobs
                WHERE client_id = ?
                ORDER BY created_at DESC
                `,
                [clientId]
            );


        return res.status(200).json({

            success: true,

            jobs: jobs

        });

    }

    catch (error) {

        console.log(
            "Get my jobs error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch your jobs."

        });

    }

};



// ==========================================
// GET SINGLE JOB
// ==========================================

exports.getJobById = async function (req, res) {

    try {

        const jobId =
            req.params.id;


        const [rows] =
            await db.promise().query(
                `
                SELECT
                    id,
                    title,
                    description,
                    category,
                    skills,
                    requirements,
                    responsibilities,
                    budget_min,
                    budget_max,
                    job_type,
                    client_id,
                    created_at
                FROM jobs
                WHERE id = ?
                `,
                [jobId]
            );


        if (rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found."

            });

        }


        return res.status(200).json({

            success: true,

            job: rows[0]

        });


    }

    catch (error) {

        console.log(
            "Get job error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch job."

        });

    }

};



// ==========================================
// CREATE JOB
// ==========================================

exports.createJob = async function (req, res) {

    try {

        const {

            title,
            description,
            category,
            skills,
            requirements,
            responsibilities,
            budget_min,
            budget_max,
            job_type

        } = req.body;


        // ==================================
        // VALIDATION
        // ==================================

        if (
            !title ||
            !description ||
            !category ||
            !skills ||
            !requirements ||
            !responsibilities ||
            !budget_min ||
            !budget_max ||
            !job_type
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All required fields must be filled."

            });

        }


        // ==================================
        // GET LOGGED-IN CLIENT ID
        // ==================================

        const clientId =
            req.user.id;


        console.log(
            "CLIENT ID:",
            clientId
        );


        // ==================================
        // CHECK BUDGET
        // ==================================

        if (
            Number(budget_min) <= 0 ||
            Number(budget_max) <= 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Budget must be greater than zero."

            });

        }


        if (
            Number(budget_max) <
            Number(budget_min)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Maximum budget cannot be less than minimum budget."

            });

        }


        // ==================================
        // INSERT JOB
        // ==================================

        const [result] =
            await db.promise().query(
                `
                INSERT INTO jobs
                (
                    title,
                    description,
                    category,
                    skills,
                    requirements,
                    responsibilities,
                    budget_min,
                    budget_max,
                    job_type,
                    client_id
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [

                    title,
                    description,
                    category,
                    skills,
                    requirements,
                    responsibilities,
                    Number(budget_min),
                    Number(budget_max),
                    job_type,
                    clientId

                ]
            );


        // ==================================
        // SUCCESS
        // ==================================

        return res.status(201).json({

            success: true,

            message:
                "Job posted successfully.",

            jobId:
                result.insertId

        });


    }

    catch (error) {

        console.log(
            "Create job error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to create job."

        });

    }

};



// ==========================================
// DELETE MY JOB
// ==========================================

exports.deleteJob = async function (req, res) {

    try {

        const jobId =
            req.params.id;


        const clientId =
            req.user.id;


        console.log(
            "DELETE JOB:",
            jobId,
            "CLIENT:",
            clientId
        );


        // ==================================
        // CHECK JOB OWNERSHIP
        // ==================================

        const [jobs] =
            await db.promise().query(
                `
                SELECT id
                FROM jobs
                WHERE id = ?
                AND client_id = ?
                `,
                [
                    jobId,
                    clientId
                ]
            );


        if (jobs.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Job not found or you are not the owner."

            });

        }


        // ==================================
        // DELETE JOB
        // ==================================

        await db.promise().query(
            `
            DELETE FROM jobs
            WHERE id = ?
            AND client_id = ?
            `,
            [
                jobId,
                clientId
            ]
        );


        return res.status(200).json({

            success: true,

            message:
                "Job deleted successfully."

        });

    }

    catch (error) {

        console.log(
            "Delete job error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete job."

        });

    }

};