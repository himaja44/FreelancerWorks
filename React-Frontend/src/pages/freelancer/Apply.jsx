import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/apply.css";


function Apply() {

    const navigate = useNavigate();

    const { id } = useParams();


    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        expected_salary: "",

        resume: null,

        cover_letter: ""

    });


    // ==========================================
    // GET LOGGED-IN USER
    // ==========================================

    useEffect(() => {

        const storedUser =
            JSON.parse(
                localStorage.getItem("user") || "{}"
            );


        setFormData(prev => ({

            ...prev,

            name: storedUser.name || "",

            email: storedUser.email || "",

            phone: storedUser.phone_number || ""

        }));

    }, []);


    // ==========================================
    // LOAD JOB
    // ==========================================

    useEffect(() => {

        async function loadJob() {

            try {

                setLoading(true);

                setError("");


                const response =
                    await fetch(
                        `http://localhost:5000/api/jobs/${id}`
                    );


                const data =
                    await response.json();


                console.log(
                    "APPLY JOB RESPONSE:",
                    data
                );


                if (!response.ok) {

                    setError(
                        data.message ||
                        "Job not found."
                    );

                    return;

                }


                setJob(
                    data.job || data
                );

            }

            catch (error) {

                console.log(
                    "Load job error:",
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


        loadJob();

    }, [id]);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    function handleChange(event) {

        const {
            name,
            value,
            files
        } = event.target;


        setFormData(prev => ({

            ...prev,

            [name]:
                files
                    ? files[0]
                    : value

        }));

    }


    // ==========================================
    // SUBMIT APPLICATION
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();


        setError("");

        setSuccess("");


        // ======================================
        // BASIC VALIDATION
        // ======================================

        if (!formData.name.trim()) {

            setError(
                "Please enter your full name."
            );

            return;

        }


        if (!formData.email.trim()) {

            setError(
                "Please enter your email."
            );

            return;

        }


        if (!formData.phone.trim()) {

            setError(
                "Please enter your phone number."
            );

            return;

        }


        if (!formData.expected_salary) {

            setError(
                "Please enter your expected salary."
            );

            return;

        }


        // ======================================
        // RESUME VALIDATION
        // ======================================

        if (!formData.resume) {

            setError(
                "Please upload your resume."
            );

            return;

        }


        const allowedTypes = [

            "application/pdf",

            "application/msword",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        ];


        if (
            !allowedTypes.includes(
                formData.resume.type
            )
        ) {

            setError(
                "Only PDF, DOC and DOCX files are allowed."
            );

            return;

        }


        // Maximum 5MB

        if (
            formData.resume.size >
            5 * 1024 * 1024
        ) {

            setError(
                "Resume must be less than 5MB."
            );

            return;

        }


        if (!formData.cover_letter.trim()) {

            setError(
                "Please enter a cover letter."
            );

            return;

        }


        // ======================================
        // GET TOKEN
        // ======================================

        const token =
            localStorage.getItem("token");


        if (!token) {

            navigate("/login");

            return;

        }


        try {

            setSubmitting(true);


            // ==================================
            // CREATE FORMDATA
            // ==================================

            const data =
                new FormData();


            data.append(
                "job_id",
                id
            );


            data.append(
                "name",
                formData.name.trim()
            );


            data.append(
                "email",
                formData.email.trim()
            );


            data.append(
                "phone",
                formData.phone.trim()
            );


            data.append(
                "expected_salary",
                formData.expected_salary
            );


            data.append(
                "cover_letter",
                formData.cover_letter.trim()
            );


            data.append(
                "resume",
                formData.resume
            );


            // ==================================
            // SEND APPLICATION
            // ==================================

            const response =
                await fetch(
                    "http://localhost:5000/api/applications",
                    {

                        method: "POST",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        },

                        body: data

                    }
                );


            const responseData =
                await response.json();


            console.log(
                "APPLICATION RESPONSE:",
                responseData
            );


            // ==================================
            // ERROR
            // ==================================

            if (!response.ok) {

                setError(
                    responseData.message ||
                    "Failed to submit application."
                );

                return;

            }


            // ==================================
            // SUCCESS
            // ==================================

            setSuccess(
                responseData.message ||
                "Application submitted successfully."
            );


            // ==================================
            // REDIRECT
            // ==================================

            setTimeout(() => {

                navigate("/applications");

            }, 1200);

        }

        catch (error) {

            console.log(
                "Application error:",
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
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="apply-page">

                <div className="apply-loading">

                    Loading application...

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR - JOB NOT FOUND
    // ==========================================

    if (!job) {

        return (

            <div className="apply-page">

                <div className="apply-error-page">

                    <h1>
                        Unable to Load Job
                    </h1>


                    <p>
                        {error || "Job not found."}
                    </p>


                    <button
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        ← Back to Jobs
                    </button>

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="apply-page">


            {/* =====================================
                NAVBAR
            ===================================== */}

            <header className="apply-navbar">


                <div
                    className="apply-logo"
                    onClick={() =>
                        navigate(
                            "/freelancer-dashboard"
                        )
                    }
                >

                    Freelancer
                    <span>Works</span>

                </div>


                <nav>

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

                </nav>


                <button
                    className="apply-logout"
                    onClick={() => {

                        localStorage.removeItem(
                            "token"
                        );

                        localStorage.removeItem(
                            "user"
                        );

                        navigate("/login");

                    }}
                >
                    Logout
                </button>

            </header>



            {/* =====================================
                MAIN
            ===================================== */}

            <main className="apply-main">


                <div className="apply-header">

                    <p>
                        JOB APPLICATION
                    </p>


                    <h1>
                        Apply for this position
                    </h1>


                    <h2>
                        {job.title}
                    </h2>

                </div>



                {/* =================================
                    FORM CARD
                ================================= */}

                <div className="apply-card">


                    {/* ERROR */}

                    {error && (

                        <div className="apply-message error">

                            {error}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="apply-message success">

                            {success}

                        </div>

                    )}



                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* FULL NAME */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>


                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your full name"
                            />

                        </div>



                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email
                            </label>


                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your email"
                            />

                        </div>



                        {/* PHONE */}

                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>


                            <input
                                type="tel"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter 10-digit phone number"
                            />

                        </div>



                        {/* EXPECTED SALARY */}

                        <div className="form-group">

                            <label>
                                Expected Salary
                            </label>


                            <input
                                type="number"
                                name="expected_salary"
                                value={
                                    formData.expected_salary
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter expected salary"
                            />

                        </div>



                        {/* RESUME */}

                        <div className="form-group">

                            <label htmlFor="resume">
                                Resume <span>*</span>
                            </label>


                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={
                                    handleChange
                                }
                            />


                            <small>
                                PDF, DOC or DOCX — maximum 5MB
                            </small>

                        </div>



                        {/* COVER LETTER */}

                        <div className="form-group">

                            <label>
                                Cover Letter
                            </label>


                            <textarea
                                name="cover_letter"
                                value={
                                    formData.cover_letter
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Tell the client why you are suitable for this job..."
                                rows="7"
                            />

                        </div>



                        {/* ACTIONS */}

                        <div className="apply-actions">

                            <button
                                type="submit"
                                className="submit-application"
                                disabled={submitting}
                            >

                                {
                                    submitting
                                        ? "Submitting..."
                                        : "Submit Application"
                                }

                            </button>


                            <button
                                type="button"
                                className="cancel-application"
                                onClick={() =>
                                    navigate(
                                        `/jobs/${id}`
                                    )
                                }
                            >
                                Cancel
                            </button>

                        </div>


                    </form>

                </div>

            </main>

        </div>

    );

}


export default Apply;