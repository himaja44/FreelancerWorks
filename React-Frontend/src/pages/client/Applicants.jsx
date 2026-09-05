import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/applicants.css";


function Applicants() {

    const navigate = useNavigate();

    const { jobId } = useParams();


    // ==========================================
    // STATE
    // ==========================================

    const [user, setUser] = useState({});

    const [job, setJob] = useState(null);

    const [applicants, setApplicants] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD USER
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

            navigate("/jobs");

        }

    }, [navigate]);


    // ==========================================
    // LOAD APPLICANTS
    // ==========================================

    useEffect(() => {

        async function loadApplicants() {

            const token =
                localStorage.getItem("token");


            if (!token || !jobId) {

                return;

            }


            try {

                setLoading(true);

                setError("");


                // Get job details

                const jobResponse =
                    await fetch(
                        `http://localhost:5000/api/jobs/${jobId}`,
                        {
                            headers: {
                                "Authorization":
                                    `Bearer ${token}`
                            }
                        }
                    );


                const jobData =
                    await jobResponse.json();


                console.log(
                    "JOB RESPONSE:",
                    jobData
                );


                if (jobResponse.ok) {

                    setJob(jobData.job);

                }


                // ==================================
                // GET APPLICANTS
                // ==================================

                const response =
                    await fetch(
                        `http://localhost:5000/api/applications/job/${jobId}`,
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
                    "APPLICANTS RESPONSE:",
                    data
                );


                if (!response.ok) {

                    setError(
                        data.message ||
                        "Unable to load applicants."
                    );

                    return;

                }


                setApplicants(
                    data.applications || []
                );

            }

            catch (error) {

                console.log(
                    "Applicants error:",
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


        loadApplicants();

    }, [jobId]);


    // ==========================================
    // UPDATE APPLICATION STATUS
    // ==========================================

    async function updateStatus(
        applicationId,
        status
    ) {

        const token =
            localStorage.getItem("token");


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/applications/${applicationId}/status`,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify({
                                status: status
                            })

                    }
                );


            const data =
                await response.json();


            console.log(
                "STATUS RESPONSE:",
                data
            );


            if (!response.ok) {

                setError(
                    data.message ||
                    "Unable to update application."
                );

                return;

            }


            // Update UI immediately

            setApplicants(
                previousApplicants =>
                    previousApplicants.map(
                        applicant =>

                            applicant.id ===
                            applicationId

                                ? {
                                    ...applicant,
                                    status: status
                                }

                                : applicant
                    )
            );

        }

        catch (error) {

            console.log(
                "Status update error:",
                error
            );


            setError(
                "Unable to connect to server."
            );

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
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="applicants-page">

                <div className="applicants-loading">

                    Loading applicants...

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="applicants-page">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="applicants-navbar">


                <div
                    className="applicants-logo"
                    onClick={() =>
                        navigate(
                            "/client-dashboard"
                        )
                    }
                >

                    Freelancer
                    <span>Works</span>

                </div>


                <nav className="applicants-nav">

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
                        onClick={() =>
                            navigate(
                                "/my-jobs"
                            )
                        }
                    >
                        My Jobs
                    </button>

                </nav>


                <div className="applicants-user">

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

            <main className="applicants-main">


                <section className="applicants-intro">

                    <p>
                        CLIENT WORKSPACE
                    </p>


                    <h1>
                        Applicants
                    </h1>


                    <span>
                        Applicants for{" "}
                        {job?.title || "this job"}
                    </span>

                </section>



                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="applicants-error">

                        {error}

                    </div>

                )}



                {/* =================================
                    NO APPLICANTS
                ================================= */}

                {!error &&
                applicants.length === 0 && (

                    <section className="no-applicants">

                        <h2>
                            No Applicants Yet
                        </h2>


                        <p>
                            No freelancers have
                            applied for this job yet.
                        </p>

                    </section>

                )}



                {/* =================================
                    APPLICANTS
                ================================= */}

                {applicants.length > 0 && (

                    <section className="applicants-list">


                        <div className="applicants-count">

                            <span>
                                APPLICANTS
                            </span>


                            <strong>
                                {applicants.length}{" "}
                                {applicants.length === 1
                                    ? "Applicant"
                                    : "Applicants"}
                            </strong>

                        </div>



                        {applicants.map(
                            applicant => (

                                <article
                                    className="applicant-card"
                                    key={applicant.id}
                                >


                                    {/* HEADER */}

                                    <div className="applicant-header">

                                        <div>

                                            <h2>
                                                {
                                                    applicant.name
                                                }
                                            </h2>


                                            <p>
                                                {
                                                    applicant.email
                                                }
                                            </p>

                                        </div>


                                        <span
                                            className={
                                                `application-status ${
                                                    (
                                                        applicant.status ||
                                                        "pending"
                                                    )
                                                        .toLowerCase()
                                                }`
                                            }
                                        >
                                            {
                                                applicant.status ||
                                                "Pending"
                                            }
                                        </span>

                                    </div>



                                    {/* DETAILS */}

                                    <div className="applicant-details">


                                        <div>

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {
                                                    applicant.phone
                                                }
                                            </strong>

                                        </div>



                                        <div>

                                            <span>
                                                Expected Salary
                                            </span>

                                            <strong>
                                                ₹
                                                {
                                                    Number(
                                                        applicant.expected_salary
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )
                                                }
                                            </strong>

                                        </div>



                                        <div>

                                            <span>
                                                Applied On
                                            </span>

                                            <strong>

                                                {
                                                    applicant.created_at
                                                        ? new Date(
                                                            applicant.created_at
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day:
                                                                    "2-digit",
                                                                month:
                                                                    "short",
                                                                year:
                                                                    "numeric"
                                                            }
                                                        )
                                                        : "-"
                                                }

                                            </strong>

                                        </div>


                                    </div>



                                    {/* RESUME */}

                                    <div className="applicant-resume">

                                        <h3>
                                            Resume
                                        </h3>


                                        {applicant.resume ? (

                                            <a
                                                href={
                                                    applicant.resume.startsWith("http")
                                                        ? applicant.resume
                                                        : `http://localhost:5000${applicant.resume}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-resume-button"
                                            >
                                                📄 View Resume
                                            </a>

                                        ) : (

                                            <p>
                                                No resume uploaded.
                                            </p>

                                        )}

                                    </div>



                                    {/* COVER LETTER */}

                                    <div className="cover-letter">

                                        <h3>
                                            Cover Letter
                                        </h3>


                                        <p>
                                            {
                                                applicant.cover_letter
                                            }
                                        </p>

                                    </div>



                                    {/* ACTIONS */}

                                    {
                                        (
                                            applicant.status ||
                                            "Pending"
                                        ).toLowerCase()
                                        === "pending"
                                        && (

                                            <div className="applicant-actions">


                                                <button
                                                    className="accept-button"
                                                    onClick={() =>
                                                        updateStatus(
                                                            applicant.id,
                                                            "Accepted"
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </button>


                                                <button
                                                    className="reject-button"
                                                    onClick={() =>
                                                        updateStatus(
                                                            applicant.id,
                                                            "Rejected"
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>


                                            </div>

                                        )
                                    }


                                </article>

                            )
                        )}

                    </section>

                )}

            </main>

        </div>

    );

}


export default Applicants;