import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import { getJobs } from "../../services/api";

import "./Jobs.css";


function Jobs() {

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadJobs();

    }, []);


    async function loadJobs() {

        try {

            setLoading(true);

            const data =
                await getJobs();

            setJobs(data);

        }
        catch (error) {

            console.log(
                "Jobs error:",
                error
            );

            setError(
                "Unable to load jobs."
            );

        }
        finally {

            setLoading(false);

        }

    }


    return (

        <>

            <Navbar />


            <main className="jobs-page">

                <section className="jobs-header">

                    <p className="jobs-label">
                        FIND YOUR NEXT OPPORTUNITY
                    </p>

                    <h1>
                        Find Jobs
                    </h1>

                    <p className="jobs-description">
                        Discover freelance opportunities
                        that match your skills and experience.
                    </p>

                </section>


                {loading && (

                    <div className="jobs-message">

                        Loading jobs...

                    </div>

                )}


                {error && (

                    <div className="jobs-message error">

                        {error}

                    </div>

                )}


                {!loading &&
                 !error &&
                 jobs.length === 0 && (

                    <div className="jobs-message">

                        No jobs available.

                    </div>

                )}


                {!loading &&
                 !error &&
                 jobs.length > 0 && (

                    <section className="jobs-list">

                        {jobs.map((job) => (

                            <div
                                className="job-card"
                                key={job.id}
                            >

                                <div className="job-card-content">

                                    <p className="job-category">
                                        {job.category}
                                    </p>


                                    <h2>
                                        {job.title}
                                    </h2>


                                    <p className="job-description">
                                        {job.description}
                                    </p>


                                    <div className="job-skills">

                                        {job.skills &&
                                         job.skills
                                            .split(",")
                                            .map(
                                                (
                                                    skill,
                                                    index
                                                ) => (

                                                    <span
                                                        key={index}
                                                    >
                                                        {skill.trim()}
                                                    </span>

                                                )
                                            )}

                                    </div>

                                </div>


                                <div className="job-card-footer">

                                    <div>

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


                                        <p>
                                            {job.job_type}
                                        </p>

                                    </div>

                                <a
    href={`/jobs/${job.id}`}
    className="view-job-button"
>
    View Details →
</a>
                                   

                                </div>

                            </div>

                        ))}

                    </section>

                )}

            </main>

        </>

    );

}


export default Jobs;