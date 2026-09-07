import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/client-dashboard.css";


function ClientDashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [jobs, setJobs] = useState([]);
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


        loadClientJobs(token);

    }, [navigate]);


    // ==========================================
    // LOAD CLIENT JOBS
    // ==========================================

    async function loadClientJobs(token) {

        try {

            const response =
                await fetch(
                    "https://freelancerworks-production.up.railway.app/api/jobs/my-jobs",
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
                "CLIENT DASHBOARD JOBS:",
                data
            );


            if (!response.ok) {

                setError(
                    data.message ||
                    "Unable to load jobs."
                );

                setLoading(false);

                return;

            }


            setJobs(
                data.jobs || []
            );

        }

        catch (error) {

            console.log(
                "Dashboard error:",
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


    // ==========================================
    // LOGOUT
    // ==========================================

    function handleLogout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    }


    // ==========================================
    // CHECK ROLE
    // ==========================================

    if (
        user.role &&
        user.role.toLowerCase() !== "client"
    ) {

        return (

            <div className="dashboard-error">

                <h2>
                    Access Denied
                </h2>

                <p>
                    This page is available only
                    for clients.
                </p>

                <button
                    onClick={() =>
                        navigate("/jobs")
                    }
                >
                    Go to Find Jobs
                </button>

            </div>

        );

    }


    return (

        <div className="client-dashboard">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="client-navbar">

                <div className="client-logo">

                    Freelancer
                    <span>Works</span>

                </div>


                <nav className="client-nav">

                    <button
                        className="active"
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


                <div className="client-user">

                    <span>
                        {user.email || "User"}
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

            <main className="client-dashboard-main">


                <section className="dashboard-intro">

                    <p className="dashboard-label">
                        FREELANCER WORKS
                    </p>


                    <h1>
                        Welcome,{" "}
                        {user.name || "Client"}!
                    </h1>


                    <p>
                        Manage your projects, jobs
                        and applicants from one place.
                    </p>

                </section>



                {/* =====================================
                    ACTION CARDS
                ===================================== */}

                <section className="dashboard-cards">


                    {/* POST JOB */}

                    <div className="dashboard-card">

                        <div className="card-icon">
                            📝
                        </div>


                        <h2>
                            Post a Job
                        </h2>


                        <p>
                            Create a new freelance job
                            and find skilled professionals.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/post-job"
                                )
                            }
                        >
                            Post Job →
                        </button>

                    </div>



                    {/* MY JOBS */}

                    <div className="dashboard-card">

                        <div className="card-icon">
                            💼
                        </div>


                        <h2>
                            My Jobs
                        </h2>


                        <p>
                            View and manage the jobs
                            you have posted.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/my-jobs"
                                )
                            }
                        >
                            Manage Jobs →
                        </button>

                    </div>



                    {/* APPLICANTS */}

                    <div className="dashboard-card">

                        <div className="card-icon">
                            👥
                        </div>


                        <h2>
                            Applicants
                        </h2>


                        <p>
                            Review freelancers who
                            applied to your jobs.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/my-jobs"
                                )
                            }
                        >
                            View Applicants →
                        </button>

                    </div>


                </section>



                {/* =====================================
                    ACCOUNT INFORMATION
                ===================================== */}

                <section className="account-card">

                    <h2>
                        Account Information
                    </h2>


                    <p>
                        Your client account details.
                    </p>


                    <div className="account-details">


                        <div>

                            <span>
                                Name
                            </span>

                            <strong>
                                {user.name || "Not available"}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Email
                            </span>

                            <strong>
                                {user.email || "Not available"}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Role
                            </span>

                            <strong>
                                Client
                            </strong>

                        </div>


                    </div>

                </section>



                {/* =====================================
                    RECENT JOBS
                ===================================== */}

                <section className="recent-jobs">

                    <div className="recent-jobs-heading">

                        <div>

                            <p className="dashboard-label">
                                YOUR ACTIVITY
                            </p>

                            <h2>
                                Recent Jobs
                            </h2>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    "/my-jobs"
                                )
                            }
                        >
                            View All →
                        </button>

                    </div>



                    {loading && (

                        <div className="dashboard-message">

                            Loading your jobs...

                        </div>

                    )}



                    {!loading && error && (

                        <div className="dashboard-message error">

                            {error}

                        </div>

                    )}



                    {!loading &&
                        !error &&
                        jobs.length === 0 && (

                            <div className="dashboard-message">

                                <h3>
                                    No jobs posted yet
                                </h3>

                                <p>
                                    Start by creating
                                    your first freelance job.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/post-job"
                                        )
                                    }
                                >
                                    Post Your First Job
                                </button>

                            </div>

                        )}



                    {!loading &&
                        !error &&
                        jobs.length > 0 && (

                            <div className="recent-job-list">

                                {jobs
                                    .slice(0, 3)
                                    .map((job) => (

                                        <div
                                            className="recent-job"
                                            key={job.id}
                                        >

                                            <div>

                                                <span>
                                                    {job.category}
                                                </span>

                                                <h3>
                                                    {job.title}
                                                </h3>

                                                <p>
                                                    {job.job_type}
                                                </p>

                                            </div>


                                            <button
    onClick={() =>
        navigate(`/jobs/${job.id}`)
    }
>
    View Job →
</button>
                                                View Job →
    

                                        </div>

                                    ))}

                            </div>

                        )}

                </section>


            </main>

        </div>

    );

}


export default ClientDashboard;