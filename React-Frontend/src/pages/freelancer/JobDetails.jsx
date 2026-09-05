import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import "./job-details.css";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadJob();
    }, [id]);

    async function loadJob() {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:5000/api/jobs/${id}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load job"
                );
            }

            setJob(data.job);

        } catch (error) {

            console.log("Job details error:", error);

            setError(
                error.message || "Unable to load job."
            );

        } finally {

            setLoading(false);
        }
    }

    function formatDate(date) {

        if (!date) {
            return "Not available";
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

    /*
     * Loading state
     */
    if (loading) {

        return (
            <>
                <Navbar />

                <main className="job-details-page">

                    <div className="job-details-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading job details...</p>
                    </div>

                </main>
            </>
        );
    }

    /*
     * Error state
     */
    if (error || !job) {

        return (
            <>
                <Navbar />

                <main className="job-details-page">

                    <div className="job-error-container">

                        <div className="job-error">

                            <div className="job-error-icon">
                                !
                            </div>

                            <h2>
                                Unable to Load Job
                            </h2>

                            <p>
                                {error || "Job not found."}
                            </p>

                            <Link
                                to="/jobs"
                                className="back-jobs-button"
                            >
                                ← Back to Jobs
                            </Link>

                        </div>

                    </div>

                </main>
            </>
        );
    }

    /*
     * Skills
     */
    const skills = job.skills
        ? job.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0)
        : [];

    return (
        <>
            <Navbar />

            <main className="job-details-page">

                <div className="job-details-main">

                    <section className="job-details-card">

                        {/* Header */}
                        <div className="job-details-header">

                            <p className="job-details-category">
                                {job.category}
                            </p>

                            <h1>
                                {job.title}
                            </h1>

                            <p className="job-details-description">
                                {job.description}
                            </p>

                        </div>


                        {/* Skills */}
                        {skills.length > 0 && (

                            <div className="job-section">

                                <h2>
                                    Skills Required
                                </h2>

                                <div className="skills-list">

                                    {skills.map(
                                        (skill, index) => (
                                            <span key={index}>
                                                {skill}
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* Requirements */}
                        {job.requirements && (

                            <div className="job-section">

                                <h2>
                                    Requirements
                                </h2>

                                <p>
                                    {job.requirements}
                                </p>

                            </div>

                        )}


                        {/* Responsibilities */}
                        {job.responsibilities && (

                            <div className="job-section">

                                <h2>
                                    Responsibilities
                                </h2>

                                <p>
                                    {job.responsibilities}
                                </p>

                            </div>

                        )}


                        {/* Job Information */}
                        <div className="job-section">

                            <h2>
                                Job Information
                            </h2>

                            <div className="job-info-grid">

                                <div>
                                    <span>
                                        Budget
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            job.budget_min
                                        ).toLocaleString("en-IN")}

                                        {" - "}

                                        ₹
                                        {Number(
                                            job.budget_max
                                        ).toLocaleString("en-IN")}
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


                        {/* Actions */}
                        <div className="job-details-actions">

                            <Link
                                to={`/apply/${job.id}`}
                                className="apply-button"
                            >
                                Apply Now →
                            </Link>

                            <Link
                                to="/jobs"
                                className="back-jobs-button"
                            >
                                ← Back to Jobs
                            </Link>

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}

export default JobDetails;