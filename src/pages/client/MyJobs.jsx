import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import "../../styles/my-jobs.css";
function MyJobs() {

    const navigate = useNavigate();


    const [user, setUser] = useState({});

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    useEffect(() => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        const storedUser =
            JSON.parse(
                localStorage.getItem("user") || "{}"
            );


        setUser(storedUser);


        if (
            storedUser.role &&
            storedUser.role.toLowerCase() !== "client"
        ) {

            navigate("/freelancer-dashboard");

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
                        "https://freelancerworks-backend.onrender.com/api/jobs/my-jobs",
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
                // AUTH ERROR
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


                // ==================================
                // API ERROR
                // ==================================

                if (!response.ok) {

                    setError(
                        data.message ||
                        "Unable to load jobs."
                    );

                    return;

                }


                // ==================================
                // SUCCESS
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
    // LOGOUT
    // ==========================================

    function handleLogout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    }


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


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this job?"
            );


        if (!confirmed) {

            return;

        }


        try {

            const response =
                await fetch(
                    `https://freelancerworks-backend.onrender.com/api/jobs/${jobId}`,
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


            setJobs(
                previousJobs =>
                    previousJobs.filter(
                        job =>
                            job.id !== jobId
                    )
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

    }


    // ==========================================
    // FORMAT DATE
    // ==========================================

    function formatDate(date) {

        if (!date) {

            return "-";

        }


        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
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


                <div
                    className="my-jobs-logo"
                    onClick={() =>
                        navigate(
                            "/client-dashboard"
                        )
                    }
                >

                    Freelancer<span>Works</span>

                </div>


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
                            navigate("/post-job")
                        }
                    >
                        Post a Job
                    </button>


                    <button
                        className="active"
                        onClick={() =>
                            navigate("/my-jobs")
                        }
                    >
                        My Jobs
                    </button>

                </nav>


                <div className="my-jobs-user">

                    <span>
                        {user.email || "User"}
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

            <main className="my-jobs-main">


                <section className="my-jobs-header">

                    <div>

                        <p>
                            CLIENT WORKSPACE
                        </p>


                        <h1>
                            My Jobs
                        </h1>


                        <span>
                            View and manage the jobs
                            you have posted.
                        </span>

                    </div>


                    <button
                        className="post-new-job-button"
                        onClick={() =>
                            navigate("/post-job")
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
                    LOADING
                ================================= */}

                {loading && (

                    <div className="my-jobs-message">

                        Loading jobs...

                    </div>

                )}


                {/* =================================
                    NO JOBS
                ================================= */}

                {!loading &&
                !error &&
                jobs.length === 0 && (

                    <div className="my-jobs-empty">

                        <h2>
                            No Jobs Yet
                        </h2>


                        <p>
                            You have not posted
                            any jobs yet.
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

                    </div>

                )}


                {/* =================================
                    JOBS
                ================================= */}

                {!loading &&
                !error &&
                jobs.length > 0 && (

                    <section className="my-jobs-list">


                        <div className="my-jobs-count">

                            <div>

                                <p>
                                    YOUR JOBS
                                </p>


                                <strong>
                                    {jobs.length}{" "}
                                    {jobs.length === 1
                                        ? "Job"
                                        : "Jobs"}
                                </strong>

                            </div>

                        </div>


                        {jobs.map(job => (

                            <article
                                className="my-job-card"
                                key={job.id}
                            >


                                <div className="my-job-content">


                                    <p className="my-job-category">
                                        {job.category}
                                    </p>


                                    <h2>
                                        {job.title}
                                    </h2>


                                    <p className="my-job-description">
                                        {job.description}
                                    </p>


                                    {job.skills && (

                                        <div className="my-job-skills">

                                            {job.skills
                                                .split(",")
                                                .map(
                                                    (
                                                        skill,
                                                        index
                                                    ) => (

                                                        <span
                                                            key={
                                                                index
                                                            }
                                                        >
                                                            {
                                                                skill.trim()
                                                            }
                                                        </span>

                                                    )
                                                )}

                                        </div>

                                    )}


                                    <div className="my-job-info">


                                        <div>

                                            <span>
                                                Budget
                                            </span>


                                            <strong>

                                                ₹
                                                {Number(
                                                    job.budget_min
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                                {" - "}

                                                ₹
                                                {Number(
                                                    job.budget_max
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Job Type
                                            </span>


                                            <strong>
                                                {job.job_type}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Posted
                                            </span>


                                            <strong>
                                                {formatDate(
                                                    job.created_at
                                                )}
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* ACTIONS */}

                                <div className="my-job-actions">


                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/applicants/${job.id}`
                                            )
                                        }
                                    >
                                        View Applicants →
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                job.id
                                            )
                                        }
                                    >
                                        Delete Job
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


export default MyJobs;