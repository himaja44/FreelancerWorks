import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import "./applications.css";


function Applications() {

    const token =
        localStorage.getItem("token");

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadApplications();

    }, []);


    async function loadApplications() {

        if (!token) {

            setError(
                "Please login to view your applications."
            );

            setLoading(false);

            return;

        }


        try {

            const response =
                await fetch(
                    "https://freelancerworks-production.up.railway.app/api/applications/my",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to load applications."
                );

            }


            setApplications(
                data.applications || []
            );

        }
        catch (error) {

            console.log(
                "Applications error:",
                error
            );

            setError(
                error.message ||
                "Unable to load applications."
            );

        }
        finally {

            setLoading(false);

        }

    }


    function getStatusClass(status) {

        if (
            status?.toLowerCase() ===
            "accepted"
        ) {

            return "accepted";

        }


        if (
            status?.toLowerCase() ===
            "rejected"
        ) {

            return "rejected";

        }


        return "pending";

    }


    return (

        <>

            <Navbar />


            <main className="applications-page">


                <section className="applications-header">

                    <p className="applications-label">
                        FREELANCER WORKSPACE
                    </p>


                    <h1>
                        My Applications
                    </h1>


                    <p>
                        Track the jobs you have
                        applied for and check your
                        application status.
                    </p>

                </section>


                {loading && (

                    <div className="applications-message">

                        Loading applications...

                    </div>

                )}


                {error && (

                    <div className="applications-message error">

                        {error}

                    </div>

                )}


                {!loading &&
                 !error &&
                 applications.length === 0 && (

                    <div className="applications-message">

                        <h2>
                            No Applications Yet
                        </h2>

                        <p>
                            You haven't applied
                            for any jobs yet.
                        </p>


                        <Link
                            to="/jobs"
                            className="view-job-button"
                        >
                            Find Jobs →
                        </Link>

                    </div>

                )}


                {!loading &&
                 !error &&
                 applications.length > 0 && (

                    <section className="applications-list">

                        {applications.map(
                            (application) => (

                                <div
                                    className="application-card"
                                    key={application.id}
                                >

                                    <div className="application-top">

                                        <div>

                                            <p className="application-category">
                                                {application.category}
                                            </p>


                                            <h2>
                                                {application.title}
                                            </h2>


                                            <p className="application-type">
                                                {application.job_type}
                                            </p>

                                        </div>


                                        <span
                                            className={
                                                `status-badge ${
                                                    getStatusClass(
                                                        application.status
                                                    )
                                                }`
                                            }
                                        >
                                            {application.status}
                                        </span>

                                    </div>


                                    <div className="application-details">

                                        <div>

                                            <span>
                                                Applied On
                                            </span>

                                            <strong>
                                                {new Date(
                                                    application.created_at
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
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Expected Salary
                                            </span>

                                            <strong>
                                                ₹
                                                {Number(
                                                    application.expected_salary
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Job Budget
                                            </span>

                                            <strong>
                                                ₹
                                                {Number(
                                                    application.budget_min
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                                {" - "}
                                                ₹
                                                {Number(
                                                    application.budget_max
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="cover-letter">

                                        <h3>
                                            Cover Letter
                                        </h3>

                                        <p>
                                            {
                                                application.cover_letter
                                            }
                                        </p>

                                    </div>


                                    <div className="application-footer">

                                        <span>
                                            Application #{application.id}
                                        </span>


                                        <Link
                                            to={`/jobs/${application.job_id}`}
                                            className="view-job-button"
                                        >
                                            View Job →
                                        </Link>

                                    </div>

                                </div>

                            )
                        )}

                    </section>

                )}

            </main>

        </>

    );

}


export default Applications;