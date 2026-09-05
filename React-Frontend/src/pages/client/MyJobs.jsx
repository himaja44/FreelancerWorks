import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/my-jobs.css";


function MyJobs() {

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [user, setUser] = useState(null);

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // Job selected for deletion
    const [deleteJob, setDeleteJob] = useState(null);

    // Delete loading state
    const [deleting, setDeleting] = useState(false);


    // ==========================================
    // LOAD USER
    // ==========================================

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        const storedUser =
            JSON.parse(
                localStorage.getItem("user") || "{}"
            );


        // No token
        if (!token) {

            navigate("/login");

            return;

        }


        setUser(storedUser);


        // Only clients can access My Jobs
        if (
            storedUser.role &&
            storedUser.role.toLowerCase() !== "client"
        ) {

            navigate("/jobs");

            return;

        }


    }, [navigate]);


    // ==========================================
    // LOAD MY JOBS
    // ==========================================

    useEffect(() => {

        async function loadJobs() {

            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;

            }


            try {

                setLoading(true);

                setError("");


                const response =
                    await fetch(
                        "http://localhost:5000/api/jobs/my-jobs",
                        {
                            method: "GET",

                            headers: {
                                "Authorization":
                                    `Bearer ${token}`
                            }
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "MY JOBS RESPONSE:",
                    data
                );


                // ==================================
                // TOKEN ERROR
                // ==================================

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    localStorage.removeItem("token");

                    localStorage.removeItem("user");

                    navigate("/login");

                    return;

                }


                if (!response.ok) {

                    setError(
                        data.message ||
                        "Unable to load jobs."
                    );

                    return;

                }


                // ==================================
                // SET JOBS
                // ==================================

                setJobs(
                    data.jobs || []
                );

            }

            catch (error) {

                console.log(
                    "My Jobs error:",
                    error
                );


                setError(
                    "Unable to connect to server."
                );

            }

            finally {

                setLoading(false);

            }

        }


        loadJobs();

    }, [navigate]);


    // ==========================================
    // DELETE JOB
    // ==========================================

    async function handleDelete(jobId) {

        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        try {

            setDeleting(true);

            setError("");


            const response =
                await fetch(
                    `http://localhost:5000/api/jobs/${jobId}`,
                    {
                        method: "DELETE",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            const data =
                await response.json();


            console.log(
                "DELETE JOB RESPONSE:",
                data
            );


            // ==================================
            // TOKEN ERROR
            // ==================================

            if (
                response.status === 401 ||
                response.status === 403
            ) {

                localStorage.removeItem("token");

                localStorage.removeItem("user");

                navigate("/login");

                return;

            }


            if (!response.ok) {

                setError(
                    data.message ||
                    "Unable to delete job."
                );

                return;

            }


            // ==================================
            // REMOVE FROM UI
            // ==================================

            setJobs(
                previousJobs =>
                    previousJobs.filter(
                        job =>
                            job.id !== jobId
                    )
            );


            console.log(
                "Job deleted successfully."
            );

        }

        catch (error) {

            console.log(
                "Delete job error:",
                error
            );


            setError(
                "Unable to connect to server."
            );

        }

        finally {

            setDeleting(false);

        }

    }


    // ==========================================
    // LOGOUT
    // ==========================================

    function handleLogout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    }


    // ==========================================
    // FORMAT DATE
    // ==========================================

    function formatDate(date) {

        if (!date) {

            return "-";

        }


        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="my-jobs-page">

                <div className="loading-state">

                    Loading your jobs...

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="my-jobs-page">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="my-jobs-navbar">


                {/* LOGO */}

                <div
                    className="my-jobs-logo"
                    onClick={() =>
                        navigate(
                            "/client-dashboard"
                        )
                    }
                >

                    Freelancer
                    <span>Works</span>

                </div>


                {/* NAVIGATION */}

                <nav className="my-jobs-nav">

                    <button
                        onClick={() =>
                            navigate(
                                "/client-dashboard"
                            )
                        }
                    >
                        Dashboard
                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/post-job"
                            )
                        }
                    >
                        Post a Job
                    </button>


                    <button
                        className="active"
                        onClick={() =>
                            navigate(
                                "/my-jobs"
                            )
                        }
                    >
                        My Jobs
                    </button>

                </nav>


                {/* USER */}

                <div className="my-jobs-user">

                    <span>
                        {user?.email || "User"}
                    </span>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>



            {/* =====================================
                MAIN
            ===================================== */}

            <main className="my-jobs-main">


                {/* =================================
                    INTRO
                ================================= */}

                <section className="my-jobs-intro">


                    <div>

                        <p className="my-jobs-label">
                            CLIENT WORKSPACE
                        </p>


                        <h1>
                            My Jobs
                        </h1>


                        <p>
                            View and manage the jobs
                            you have posted.
                        </p>

                    </div>


                    {/* POST NEW JOB */}

                    <button
                        className="post-new-job-button"
                        onClick={() =>
                            navigate(
                                "/post-job"
                            )
                        }
                    >
                        + Post a New Job
                    </button>


                </section>



                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="my-jobs-error">

                        {error}

                    </div>

                )}



                {/* =================================
                    JOB COUNT
                ================================= */}

                <div className="jobs-heading">

                    <span>
                        YOUR JOBS
                    </span>


                    <strong>

                        {jobs.length}{" "}

                        {jobs.length === 1
                            ? "Job"
                            : "Jobs"}

                    </strong>

                </div>



                {/* =================================
                    NO JOBS
                ================================= */}

                {jobs.length === 0 && !error && (

                    <section className="no-jobs">

                        <h2>
                            No Jobs Yet
                        </h2>


                        <p>
                            You haven't posted any
                            jobs yet.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/post-job"
                                )
                            }
                        >
                            Post Your First Job →
                        </button>

                    </section>

                )}



                {/* =================================
                    JOB LIST
                ================================= */}

                <section className="jobs-list">

                    {jobs.map(job => (

                        <article
                            className="job-card"
                            key={job.id}
                        >


                            {/* =========================
                                TOP
                            ========================= */}

                            <div className="job-card-top">


                                <div>

                                    <p className="job-category">

                                        {
                                            job.category ||
                                            "General"
                                        }

                                    </p>


                                    <h2>
                                        {job.title}
                                    </h2>


                                    <p className="job-type">

                                        {
                                            job.job_type ||
                                            "Remote"
                                        }

                                    </p>

                                </div>


                                {/* STATUS */}

                                <span className="job-status active">

                                    Active

                                </span>


                            </div>



                            {/* =========================
                                DESCRIPTION
                            ========================= */}

                            <p className="job-description">

                                {
                                    job.description ||
                                    "No description available."
                                }

                            </p>



                            {/* =========================
                                INFORMATION
                            ========================= */}

                            <div className="job-information">


                                <div>

                                    <span>
                                        Budget
                                    </span>


                                    <strong>

                                        ₹
                                        {
                                            Number(
                                                job.budget_min || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        }

                                        {" - "}

                                        ₹
                                        {
                                            Number(
                                                job.budget_max || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        }

                                    </strong>

                                </div>



                                <div>

                                    <span>
                                        Posted
                                    </span>


                                    <strong>
                                        {
                                            formatDate(
                                                job.created_at ||
                                                job.posted_at
                                            )
                                        }
                                    </strong>

                                </div>



                                <div>

                                    <span>
                                        Job ID
                                    </span>


                                    <strong>
                                        #{job.id}
                                    </strong>

                                </div>


                            </div>



                            {/* =========================
                                ACTIONS
                            ========================= */}

                            <div className="job-actions">


                                {/* VIEW DETAILS */}

                                <button
                                    className="view-details-button"
                                    onClick={() =>
                                        navigate(
                                            `/jobs/${job.id}`
                                        )
                                    }
                                >
                                    View Details
                                </button>



                                {/* VIEW APPLICANTS */}

                                <button
                                    className="view-applicants-button"
                                    onClick={() =>
                                        navigate(
                                            `/applicants/${job.id}`
                                        )
                                    }
                                >
                                    View Applicants
                                </button>



                                {/* DELETE */}

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        setDeleteJob(job)
                                    }
                                >
                                    Delete
                                </button>


                            </div>


                        </article>

                    ))}

                </section>

            </main>



            {/* =========================================
                DELETE CONFIRMATION MODAL
            ========================================= */}

            {deleteJob && (

                <div
                    className="delete-modal-overlay"
                    onClick={() => {

                        if (!deleting) {

                            setDeleteJob(null);

                        }

                    }}
                >


                    <div
                        className="delete-modal"
                        onClick={event =>
                            event.stopPropagation()
                        }
                    >


                        {/* ICON */}

                        <div className="delete-modal-icon">

                            ⚠️

                        </div>


                        {/* TITLE */}

                        <h2>
                            Delete Job?
                        </h2>


                        {/* MESSAGE */}

                        <p>

                            Are you sure you want to
                            delete

                            <strong>
                                {" "}
                                "{deleteJob.title}"
                            </strong>

                            ?

                        </p>


                        <p className="delete-warning">

                            This action cannot be
                            undone.

                        </p>


                        {/* BUTTONS */}

                        <div className="delete-modal-actions">


                            {/* CANCEL */}

                            <button
                                className="cancel-delete"
                                disabled={deleting}
                                onClick={() =>
                                    setDeleteJob(null)
                                }
                            >
                                Cancel
                            </button>



                            {/* CONFIRM */}

                            <button
                                className="confirm-delete"
                                disabled={deleting}
                                onClick={() =>
                                    handleDelete(
                                        deleteJob.id
                                    )
                                }
                            >

                                {deleting
                                    ? "Deleting..."
                                    : "Delete Job"}

                            </button>


                        </div>


                    </div>

                </div>

            )}

        </div>

    );

}


export default MyJobs;