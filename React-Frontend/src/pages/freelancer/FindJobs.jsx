import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/find-jobs.css";


function FindJobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    const [savedJobs, setSavedJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // SEARCH & FILTER STATES
    // ==========================================

    const [searchTerm, setSearchTerm] =
        useState("");

    const [categoryFilter, setCategoryFilter] =
        useState("all");

    const [jobTypeFilter, setJobTypeFilter] =
        useState("all");


    // ==========================================
    // LOAD ALL JOBS
    // ==========================================

    useEffect(() => {

        async function loadJobs() {

            try {

                setLoading(true);

                setError("");


                const response = await fetch(
"https://freelancerworks-production.up.railway.app/api/jobs/"
                );


                const data =
                    await response.json();


                console.log(
                    "ALL JOBS RESPONSE:",
                    data
                );


                if (!response.ok) {

                    setError(
                        data.message ||
                        "Unable to load jobs."
                    );

                    return;

                }


                setJobs(
                    Array.isArray(data)
                        ? data
                        : data.jobs || []
                );

            }

            catch (error) {

                console.log(
                    "Find Jobs error:",
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

    }, []);


    // ==========================================
    // LOAD SAVED JOBS
    // ==========================================

    useEffect(() => {

        async function loadSavedJobs() {

            const token =
                localStorage.getItem("token");


            if (!token) {
                return;
            }


            try {

                const response =
                    await fetch(
                       "https://freelancerworks-production.up.railway.app/api/saved-jobs",
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
                    "SAVED JOBS RESPONSE:",
                    data
                );


                if (!response.ok) {
                    return;
                }


                const saved =
                    data.jobs || [];


                setSavedJobs(
                    saved.map(job =>
                        Number(
                            job.id ||
                            job.job_id
                        )
                    )
                );

            }

            catch (error) {

                console.log(
                    "Load saved jobs error:",
                    error
                );

            }

        }


        loadSavedJobs();

    }, []);


    // ==========================================
    // SAVE / UNSAVE JOB
    // ==========================================

    async function toggleSaveJob(jobId) {

        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        const isSaved =
            savedJobs.includes(
                Number(jobId)
            );


        try {

            if (isSaved) {

                const response =
                    await fetch(
                        "https://freelancerworks-production.up.railway.app/api/saved-jobs/${jobId}",
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

                    alert(
                        data.message ||
                        "Unable to remove saved job."
                    );

                    return;

                }


                setSavedJobs(
                    previous =>
                        previous.filter(
                            id =>
                                id !==
                                Number(jobId)
                        )
                );

            }

            else {

                const response =
                    await fetch(
                       "https://freelancerworks-production.up.railway.app/api/saved-jobs",
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({
                                    job_id: jobId
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message ||
                        "Unable to save job."
                    );

                    return;

                }


                setSavedJobs(
                    previous => [

                        ...previous,

                        Number(jobId)

                    ]
                );

            }

        }

        catch (error) {

            console.log(
                "Save job error:",
                error
            );


            alert(
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
    // GET CATEGORIES
    // ==========================================

    const categories = [
        ...new Set(
            jobs
                .map(job =>
                    job.category
                )
                .filter(Boolean)
        )
    ];


    // ==========================================
    // GET JOB TYPES
    // ==========================================

    const jobTypes = [
        ...new Set(
            jobs
                .map(job =>
                    job.job_type
                )
                .filter(Boolean)
        )
    ];


    // ==========================================
    // FILTER JOBS
    // ==========================================

    const filteredJobs =
        jobs.filter(job => {

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            const title =
                (job.title || "")
                    .toLowerCase();


            const description =
                (job.description || "")
                    .toLowerCase();


            const category =
                (job.category || "")
                    .toLowerCase();


            const jobType =
                (job.job_type || "")
                    .toLowerCase();


            const matchesSearch =
                !search ||
                title.includes(search) ||
                description.includes(search) ||
                category.includes(search);


            const matchesCategory =
                categoryFilter === "all" ||
                category ===
                categoryFilter.toLowerCase();


            const matchesJobType =
                jobTypeFilter === "all" ||
                jobType ===
                jobTypeFilter.toLowerCase();


            return (
                matchesSearch &&
                matchesCategory &&
                matchesJobType
            );

        });


    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    function clearFilters() {

        setSearchTerm("");

        setCategoryFilter("all");

        setJobTypeFilter("all");

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="find-jobs-page">

                <div className="find-jobs-loading">

                    Loading available jobs...

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="find-jobs-page">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="find-jobs-navbar">


                {/* LOGO */}

                <div
                    className="find-jobs-logo"
                    onClick={() =>
                        navigate(
                            "/freelancer-dashboard"
                        )
                    }
                >

                    Freelancer
                    <span>Works</span>

                </div>


                {/* NAVIGATION */}

                <nav className="find-jobs-nav">

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
                        className="active"
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
                        onClick={() =>
                            navigate(
                                "/saved-jobs"
                            )
                        }
                    >
                        Saved Jobs
                    </button>

                </nav>


                {/* USER */}

                <div className="find-jobs-user">

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

            <main className="find-jobs-main">


                {/* =================================
                    INTRO
                ================================= */}

                <section className="find-jobs-intro">

                    <p className="find-jobs-label">
                        FIND OPPORTUNITIES
                    </p>


                    <h1>
                        Find Jobs
                    </h1>


                    <p>
                        Explore freelance opportunities
                        and find the right job for your skills.
                    </p>

                </section>



                {/* =================================
                    SEARCH & FILTERS
                ================================= */}

                {!error && jobs.length > 0 && (

                    <section className="job-search-section">


                        {/* SEARCH */}

                        <div className="job-search-box">

                            <span className="search-icon">
                                🔍
                            </span>


                            <input
                                type="text"
                                placeholder="Search jobs by title or description..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                            />

                        </div>


                        {/* FILTERS */}

                        <div className="job-filter-row">


                            <select
                                value={categoryFilter}
                                onChange={(event) =>
                                    setCategoryFilter(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="all">
                                    All Categories
                                </option>


                                {categories.map(
                                    category => (

                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>

                                    )
                                )}

                            </select>



                            <select
                                value={jobTypeFilter}
                                onChange={(event) =>
                                    setJobTypeFilter(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="all">
                                    All Job Types
                                </option>


                                {jobTypes.map(
                                    type => (

                                        <option
                                            key={type}
                                            value={type}
                                        >
                                            {type}
                                        </option>

                                    )
                                )}

                            </select>



                            <button
                                className="clear-filters-button"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>

                        </div>

                    </section>

                )}



                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="find-jobs-error">

                        {error}

                    </div>

                )}



                {/* =================================
                    JOB COUNT
                ================================= */}

                {!error && (

                    <div className="find-jobs-heading">

                        <span>
                            AVAILABLE JOBS
                        </span>


                        <strong>

                            {filteredJobs.length}{" "}

                            {filteredJobs.length === 1
                                ? "Job"
                                : "Jobs"}

                        </strong>

                    </div>

                )}



                {/* =================================
                    NO JOBS
                ================================= */}

                {!error &&
                 jobs.length === 0 && (

                    <section className="no-jobs-found">

                        <div className="no-jobs-icon">
                            🔍
                        </div>


                        <h2>
                            No Jobs Available
                        </h2>


                        <p>
                            There are no jobs available
                            right now. Please check again later.
                        </p>

                    </section>

                )}



                {/* =================================
                    NO SEARCH RESULTS
                ================================= */}

                {!error &&
                 jobs.length > 0 &&
                 filteredJobs.length === 0 && (

                    <section className="no-jobs-found">

                        <div className="no-jobs-icon">
                            🔎
                        </div>


                        <h2>
                            No Matching Jobs
                        </h2>


                        <p>
                            We couldn't find any jobs
                            matching your search or filters.
                        </p>


                        <button
                            className="clear-filters-button"
                            onClick={clearFilters}
                        >
                            Clear Search & Filters
                        </button>

                    </section>

                )}



                {/* =================================
                    JOB LIST
                ================================= */}

                {filteredJobs.length > 0 && (

                    <section className="find-jobs-list">

                        {filteredJobs.map(job => {

                            const isSaved =
                                savedJobs.includes(
                                    Number(job.id)
                                );


                            return (

                                <article
                                    className="find-job-card"
                                    key={job.id}
                                >


                                    {/* TOP */}

                                    <div className="find-job-top">


                                        <div>

                                            <p className="find-job-category">

                                                {
                                                    job.category ||
                                                    "General"
                                                }

                                            </p>


                                            <h2>
                                                {job.title}
                                            </h2>


                                            <p className="find-job-type">

                                                Job Type:{" "}

                                                {
                                                    job.job_type ||
                                                    "Remote"
                                                }

                                            </p>

                                        </div>


                                        <span className="find-job-status">
                                            Open
                                        </span>


                                    </div>



                                    {/* DESCRIPTION */}

                                    <p className="find-job-description">

                                        {
                                            job.description ||
                                            "No description available."
                                        }

                                    </p>



                                    {/* DETAILS */}

                                    <div className="find-job-details">


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

                                    <div className="find-job-actions">


                                        <button
                                            className={
                                                isSaved
                                                    ? "save-job-button saved"
                                                    : "save-job-button"
                                            }
                                            onClick={() =>
                                                toggleSaveJob(
                                                    job.id
                                                )
                                            }
                                        >

                                            {isSaved
                                                ? "♥ Saved"
                                                : "♡ Save Job"}

                                        </button>


                                        <button
                                            className="view-job-button"
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

                            );

                        })}

                    </section>

                )}

            </main>

        </div>

    );

}


export default FindJobs;