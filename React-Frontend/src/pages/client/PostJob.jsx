import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/post-job.css";


function PostJob() {

    const navigate = useNavigate();


    // ==========================================
    // USER
    // ==========================================

    const [user, setUser] =
        useState({});


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        category: "",

        skills: "",

        requirements: "",

        responsibilities: "",

        budget_min: "",

        budget_max: "",

        job_type: ""

    });


    // ==========================================
    // SUBMITTING
    // ==========================================

    const [submitting, setSubmitting] =
        useState(false);


    // ==========================================
    // ERROR
    // ==========================================

    const [error, setError] =
        useState("");


    // ==========================================
    // SUCCESS
    // ==========================================

    const [success, setSuccess] =
        useState("");


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


        // Only client can post jobs

        if (
            storedUser.role &&
            storedUser.role.toLowerCase() !== "client"
        ) {

            navigate("/jobs");

        }

    }, [navigate]);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setFormData(
            previousData => ({

                ...previousData,

                [name]: value

            })
        );

    }


    // ==========================================
    // SUBMIT FORM
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();


        setError("");

        setSuccess("");


        // ======================================
        // VALIDATION
        // ======================================

        if (!formData.title.trim()) {

            setError(
                "Please enter a job title."
            );

            return;

        }


        if (!formData.description.trim()) {

            setError(
                "Please enter a job description."
            );

            return;

        }


        if (!formData.category.trim()) {

            setError(
                "Please enter a category."
            );

            return;

        }


        if (!formData.skills.trim()) {

            setError(
                "Please enter the required skills."
            );

            return;

        }


        if (!formData.requirements.trim()) {

            setError(
                "Please enter the requirements."
            );

            return;

        }


        if (!formData.responsibilities.trim()) {

            setError(
                "Please enter the responsibilities."
            );

            return;

        }


        if (!formData.budget_min) {

            setError(
                "Please enter minimum budget."
            );

            return;

        }


        if (!formData.budget_max) {

            setError(
                "Please enter maximum budget."
            );

            return;

        }


        if (
            Number(formData.budget_min) <= 0 ||
            Number(formData.budget_max) <= 0
        ) {

            setError(
                "Budget must be greater than zero."
            );

            return;

        }


        if (
            Number(formData.budget_min) >
            Number(formData.budget_max)
        ) {

            setError(
                "Minimum budget cannot be greater than maximum budget."
            );

            return;

        }


        if (!formData.job_type) {

            setError(
                "Please select a job type."
            );

            return;

        }


        // ======================================
        // TOKEN
        // ======================================

        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        setSubmitting(true);


        try {

            // ==================================
            // API REQUEST
            // ==================================

            const response =
                await fetch(
                    "https://freelancerworks-production.up.railway.app/api/jobs",
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

                                title:
                                    formData.title.trim(),

                                description:
                                    formData.description.trim(),

                                category:
                                    formData.category.trim(),

                                skills:
                                    formData.skills.trim(),

                                requirements:
                                    formData.requirements.trim(),

                                responsibilities:
                                    formData.responsibilities.trim(),

                                budget_min:
                                    Number(
                                        formData.budget_min
                                    ),

                                budget_max:
                                    Number(
                                        formData.budget_max
                                    ),

                                job_type:
                                    formData.job_type

                            })

                    }
                );


            const data =
                await response.json();


            console.log(
                "POST JOB RESPONSE:",
                data
            );


            // ==================================
            // ERROR
            // ==================================

            if (!response.ok) {

                setError(
                    data.message ||
                    "Unable to post job."
                );

                return;

            }


            // ==================================
            // SUCCESS
            // ==================================

            setSuccess(
                "Job posted successfully!"
            );


            // Clear form

            setFormData({

                title: "",

                description: "",

                category: "",

                skills: "",

                requirements: "",

                responsibilities: "",

                budget_min: "",

                budget_max: "",

                job_type: ""

            });


            // Redirect to My Jobs

            setTimeout(
                () => {

                    navigate("/my-jobs");

                },
                1000
            );

        }

        catch (error) {

            console.log(
                "Post job error:",
                error
            );


            setError(
                "Unable to connect to server."
            );

        }

        finally {

            setSubmitting(false);

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


    return (

        <div className="post-job-page">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="post-job-navbar">


                <div
                    className="post-job-logo"
                    onClick={() =>
                        navigate(
                            "/client-dashboard"
                        )
                    }
                >

                    Freelancer
                    <span>Works</span>

                </div>


                <nav className="post-job-nav">


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
                        className="active"
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


                <div className="post-job-user">

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

            <main className="post-job-main">


                <section className="post-job-intro">

                    <p>
                        CLIENT WORKSPACE
                    </p>


                    <h1>
                        Post a Job
                    </h1>


                    <span>
                        Find the right freelancer
                        for your project.
                    </span>

                </section>



                {/* =================================
                    FORM CARD
                ================================= */}

                <section className="post-job-card">


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* =========================
                            BASIC INFORMATION
                        ========================= */}

                        <div className="form-section">

                            <h2>
                                Job Information
                            </h2>

                            <p>
                                Tell freelancers
                                about your project.
                            </p>


                            <div className="form-group">

                                <label>
                                    Job Title
                                </label>


                                <input
                                    type="text"
                                    name="title"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. Frontend Developer"
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Description
                                </label>


                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Describe your project..."
                                    rows="5"
                                />

                            </div>



                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>


                                    <input
                                        type="text"
                                        name="category"
                                        value={
                                            formData.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Web Development"
                                    />

                                </div>



                                <div className="form-group">

                                    <label>
                                        Job Type
                                    </label>


                                    <select
                                        name="job_type"
                                        value={
                                            formData.job_type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="">
                                            Select Job Type
                                        </option>

                                        <option value="Remote">
                                            Remote
                                        </option>

                                        <option value="On-site">
                                            On-site
                                        </option>

                                        <option value="Hybrid">
                                            Hybrid
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>



                        {/* =========================
                            SKILLS
                        ========================= */}

                        <div className="form-section">

                            <h2>
                                Skills & Experience
                            </h2>


                            <div className="form-group">

                                <label>
                                    Required Skills
                                </label>


                                <textarea
                                    name="skills"
                                    value={
                                        formData.skills
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. React, JavaScript, HTML, CSS"
                                    rows="3"
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Requirements
                                </label>


                                <textarea
                                    name="requirements"
                                    value={
                                        formData.requirements
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="What should the freelancer know or have?"
                                    rows="4"
                                />

                            </div>



                            <div className="form-group">

                                <label>
                                    Responsibilities
                                </label>


                                <textarea
                                    name="responsibilities"
                                    value={
                                        formData.responsibilities
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="What will the freelancer be responsible for?"
                                    rows="4"
                                />

                            </div>

                        </div>



                        {/* =========================
                            BUDGET
                        ========================= */}

                        <div className="form-section">

                            <h2>
                                Budget
                            </h2>


                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Minimum Budget
                                    </label>


                                    <input
                                        type="number"
                                        name="budget_min"
                                        value={
                                            formData.budget_min
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="30000"
                                        min="1"
                                    />

                                </div>



                                <div className="form-group">

                                    <label>
                                        Maximum Budget
                                    </label>


                                    <input
                                        type="number"
                                        name="budget_max"
                                        value={
                                            formData.budget_max
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="50000"
                                        min="1"
                                    />

                                </div>

                            </div>

                        </div>



                        {/* =========================
                            MESSAGES
                        ========================= */}

                        {error && (

                            <div className="post-job-error">

                                {error}

                            </div>

                        )}


                        {success && (

                            <div className="post-job-success">

                                {success}

                            </div>

                        )}



                        {/* =========================
                            BUTTONS
                        ========================= */}

                        <div className="post-job-actions">


                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    navigate(
                                        "/my-jobs"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="submit-job-button"
                                disabled={submitting}
                            >

                                {submitting
                                    ? "Posting..."
                                    : "Post Job →"}

                            </button>


                        </div>


                    </form>

                </section>

            </main>

        </div>

    );

}


export default PostJob;