const db = require("../db");


// ==========================================
// CREATE APPLICATION
// ==========================================

exports.createApplication = async function (req, res) {

    try {

        const {
            job_id,
            name,
            email,
            phone,
            expected_salary,
            cover_letter,
        } = req.body;
const resume = req.file
    ? `/uploads/resumes/${req.file.filename}`
    : null;

        if (
            !job_id ||
            !name ||
            !email ||
            !phone ||
            !expected_salary ||
            !cover_letter
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All required fields must be filled."

            });

        }


        const userId =
            req.user.id;


        // Check duplicate application

        const [existing] =
            await db.promise().query(
                `
                SELECT id
                FROM applications
                WHERE job_id = ?
                AND freelancer_id = ?
                `,
                [
                    job_id,
                    userId
                ]
            );


        if (existing.length > 0) {

            return res.status(409).json({

                success: false,

                message:
                    "You have already applied for this job."

            });

        }


        // Check job

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

                message:
                    "Job not found."

            });

        }


        // Insert application

        const [result] =
            await db.promise().query(
                `
                INSERT INTO applications
                (
                    job_id,
                    freelancer_id,
                    name,
                    email,
                    phone,
                    expected_salary,
                    cover_letter,
                    resume
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    job_id,
                    userId,
                    name,
                    email,
                    phone,
                    expected_salary,
                    cover_letter,
                    resume || null
                ]
            );


        return res.status(201).json({

            success: true,

            message:
                "Application submitted successfully.",

            applicationId:
                result.insertId

        });

    }

    catch (error) {

        console.log(
            "Create application error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to submit application."

        });

    }

};



// ==========================================
// GET MY APPLICATIONS
// ==========================================

exports.getMyApplications = async function (req, res) {

    try {

        const userId =
            req.user.id;


        const [applications] =
            await db.promise().query(
                `
                SELECT
                    a.id,
                    a.job_id,
                    a.freelancer_id,
                    a.name,
                    a.email,
                    a.phone,
                    a.expected_salary,
                    a.cover_letter,
                    a.resume,
                    a.status,
                    a.created_at,
                    j.title,
                    j.category,
                    j.job_type,
                    j.budget_min,
                    j.budget_max
                FROM applications a
                INNER JOIN jobs j
                    ON a.job_id = j.id
                WHERE a.freelancer_id = ?
                ORDER BY a.created_at DESC
                `,
                [userId]
            );


        return res.status(200).json({

            success: true,

            applications:
                applications

        });

    }

    catch (error) {

        console.log(
            "Get applications error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error."

        });

    }

};



// ==========================================
// GET APPLICANTS FOR CLIENT JOB
// ==========================================

exports.getApplicantsByJob = async function (req, res) {

    try {

        const jobId =
            req.params.jobId;


        const clientId =
            req.user.id;


        console.log(
            "GET APPLICANTS - JOB:",
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
                SELECT
                    id,
                    title
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
        // GET APPLICANTS
        // ==================================

        const [applications] =
            await db.promise().query(
                `
                SELECT
                    a.id,
                    a.job_id,
                    a.freelancer_id,
                    a.name,
                    a.email,
                    a.phone,
                    a.expected_salary,
                    a.cover_letter,
                    a.resume,
                    a.status,
                    a.created_at,

                    j.title,
                    j.category,
                    j.job_type

                FROM applications a

                INNER JOIN jobs j
                    ON a.job_id = j.id

                WHERE a.job_id = ?

                ORDER BY a.created_at DESC
                `,
                [jobId]
            );


        return res.status(200).json({

            success: true,

            job: jobs[0],

            applications:
                applications

        });

    }

    catch (error) {

        console.log(
            "Get applicants by job error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch applicants."

        });

    }

};
// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

exports.updateApplicationStatus = async function (req, res) {

    try {

        const applicationId =
            req.params.id;

        const { status } =
            req.body;


        // ==================================
        // VALIDATE STATUS
        // ==================================

        if (
            !status ||
            !["Accepted", "Rejected"].includes(status)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid application status."

            });

        }


        // ==================================
        // CHECK APPLICATION
        // ==================================

        const [applications] =
            await db.promise().query(
                `
                SELECT
                    a.id,
                    a.status,
                    j.client_id
                FROM applications a
                INNER JOIN jobs j
                    ON a.job_id = j.id
                WHERE a.id = ?
                `,
                [applicationId]
            );


        if (applications.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Application not found."

            });

        }


        const application =
            applications[0];


        // ==================================
        // CHECK CLIENT
        // ==================================

        if (
            application.client_id !== req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to update this application."

            });

        }


        // ==================================
        // UPDATE STATUS
        // ==================================

        await db.promise().query(
            `
            UPDATE applications
            SET status = ?
            WHERE id = ?
            `,
            [
                status,
                applicationId
            ]
        );


        // ==================================
        // SUCCESS
        // ==================================

        return res.status(200).json({

            success: true,

            message:
                `Application ${status.toLowerCase()} successfully.`,

            status: status

        });

    }

    catch (error) {

        console.log(
            "Update application status error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to update application status."

        });

    }

};