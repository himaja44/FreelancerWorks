import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/saved-jobs.css";


function SavedJobs() {

    const navigate = useNavigate();

    const [savedJobs, setSavedJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD SAVED JOBS
    // ==========================================

    useEffect(() => {

        async function loadSavedJobs() {

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
                        "http://localhost:5000/api/saved-jobs",
                        {
                            headers: {
                                "Authorization":
                                    `Bearer ${token}`
                            }
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "SAVED JOBS:",
                    data
                );


                if (!response.ok) {

                    setError(
                        data.message ||
                        "Unable to load saved jobs."
                    );

                    return;

                }


                setSavedJobs(
                    data.jobs || []
                );

            }

            catch (error) {

                console.log(
                    "Saved jobs error:",
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


        loadSavedJobs();

    }, [navigate]);


    // ==========================================
    // REMOVE SAVED JOB
    // ==========================================

    async function removeSavedJob(jobId) {

        const token =
            localStorage.getItem("token");


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/saved-jobs/${jobId}`,
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


            if (!response.ok) {

                setError(
                    data.message ||
                    "Unable to remove saved job."
                );

                return;

            }


            // Remove immediately from UI

            setSavedJobs(
                previousJobs =>
                    previousJobs.filter(
                        job =>
                            Number(job.id) !==
                            Number(jobId)
                    )
            );

        }

        catch (error) {

            console.log(
                "Remove saved job error:",
                error
            );


            setError(
                "Unable to connect to server."
            );

        }

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
    // LOGOUT
    // ==========================================

    function handleLogout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="saved-jobs-page">

                <div className="saved-jobs-loading">

                    Loading saved jobs...

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="saved-jobs-page">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="saved-jobs-navbar">


                <div
                    className="saved-jobs-logo"
                    onClick={() =>
                        navigate(
                            "/freelancer-dashboard"
                        )
                    }
                >

                    Freelancer
                    <span>Works</span>

                </div>


                <nav className="saved-jobs-nav">

                    <button
                        onClick={() =>
                            navigate(
                                "/freelancer-dashboard"
                            )
                        }
                    >
                        Dashboard
                    </button>


                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Find Jobs
                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/applications"
                            )
                        }
                    >
                        My Applications
                    </button>


                    <button
                        className="active"
                        onClick={() =>
                            navigate(
                                "/saved-jobs"
                            )
                        }
                    >
                        Saved Jobs
                    </button>

                </nav>


                <div className="saved-jobs-user">

                    <span>
                        {
                            JSON.parse(
                                localStorage.getItem(
                                    "user"
                                ) || "{}"
                            ).email || "User"
                        }
                    </span>


                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>



            {/* =====================================
                MAIN
            ===================================== */}

            <main className="saved-jobs-main">


                {/* =================================
                    INTRO
                ================================= */}

                <section className="saved-jobs-intro">

                    <p>
                        YOUR COLLECTION
                    </p>


                    <h1>
                        Saved Jobs
                    </h1>


                    <span>
                        Keep track of freelance
                        opportunities you're interested in.
                    </span>

                </section>



                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="saved-jobs-error">

                        {error}

                    </div>

                )}



                {/* =================================
                    COUNT
                ================================= */}

                {!error && (

                    <div className="saved-jobs-heading">

                        <span>
                            SAVED OPPORTUNITIES
                        </span>


                        <strong>

                            {savedJobs.length}{" "}

                            {savedJobs.length === 1
                                ? "Job"
                                : "Jobs"}

                        </strong>

                    </div>

                )}



                {/* =================================
                    EMPTY
                ================================= */}

                {savedJobs.length === 0 &&
                !error && (

                    <section className="saved-jobs-empty">

                        <div className="saved-jobs-empty-icon">
                            ♡
                        </div>


                        <h2>
                            No Saved Jobs
                        </h2>


                        <p>
                            You haven't saved any jobs yet.
                            Browse available jobs and save
                            the opportunities you're interested in.
                        </p>


                        <button
                            onClick={() =>
                                navigate("/jobs")
                            }
                        >
                            Find Jobs →
                        </button>

                    </section>

                )}



                {/* =================================
                    SAVED JOBS
                ================================= */}

                {savedJobs.length > 0 && (

                    <section className="saved-jobs-list">

                        {savedJobs.map(job => (

                            <article
                                className="saved-job-card"
                                key={job.id}
                            >


                                {/* TOP */}

                                <div className="saved-job-top">

                                    <div>

                                        <p className="saved-job-category">

                                            {
                                                job.category ||
                                                "General"
                                            }

                                        </p>


                                        <h2>
                                            {job.title}
                                        </h2>


                                        <p className="saved-job-type">

                                            Job Type:{" "}

                                            {
                                                job.job_type ||
                                                "Remote"
                                            }

                                        </p>

                                    </div>


                                    <span className="saved-job-status">
                                        Open
                                    </span>

                                </div>



                                {/* DESCRIPTION */}

                                <p className="saved-job-description">

                                    {
                                        job.description ||
                                        "No description available."
                                    }

                                </p>



                                {/* DETAILS */}

                                <div className="saved-job-details">


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



                                {/* ACTIONS */}

                                <div className="saved-job-actions">


                                    <button
                                        className="remove-saved-button"
                                        onClick={() =>
                                            removeSavedJob(
                                                job.id
                                            )
                                        }
                                    >
                                        ♥ Remove
                                    </button>


                                    <button
                                        className="saved-view-button"
                                        onClick={() =>
                                            navigate(
                                                `/jobs/${job.id}`
                                            )
                                        }
                                    >
                                        View Details →
                                    </button>


                                </div>


                            </article>

                        ))}

                    </section>

                )}

            </main>

        </div>

    );

}


export default SavedJobs;