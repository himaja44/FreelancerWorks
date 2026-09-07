import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./apply-job.css";

function ApplyJob() {

    const { id } = useParams();

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [job, setJob] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        expected_salary: "",

        cover_letter: "",

        resume: ""

    });


    // ==========================================
    // TOKEN
    // ==========================================

    const token =
        localStorage.getItem("token");


    // ==========================================
    // LOAD USER
    // ==========================================

    useEffect(() => {

        if (!token) {

            navigate("/login");

            return;

        }


        const user =
            JSON.parse(
                localStorage.getItem("user") || "{}"
            );


        setFormData((previous) => ({

            ...previous,

            name: user.name || "",

            email: user.email || "",

            phone:
                user.phone_number || ""

        }));

    }, [navigate, token]);


    // ==========================================
    // LOAD JOB
    // ==========================================

    useEffect(() => {

        async function loadJob() {

            try {

                const response =
                    await fetch(
                       `https://freelancerworks-production.up.railway.app/api/jobs/${id}`
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    setMessage(
                        data.message ||
                        "Unable to load job."
                    );

                    setMessageType("error");

                    setLoading(false);

                    return;

                }


                setJob(data.job);

                setLoading(false);

            }

            catch (error) {

                console.log(
                    "Load job error:",
                    error
                );


                setMessage(
                    "Unable to connect to server."
                );

                setMessageType("error");

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
            value
        } = event.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    }


    // ==========================================
    // HANDLE RESUME
    // ==========================================

    function handleResume(event) {

        const file =
            event.target.files[0];


        if (!file) {

            return;

        }


        setFormData((previous) => ({

            ...previous,

            resume: file.name

        }));

    }


    // ==========================================
    // SUBMIT APPLICATION
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();


        setMessage("");

        setMessageType("");


        // --------------------------------------
        // VALIDATION
        // --------------------------------------

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.expected_salary ||
            !formData.cover_letter
        ) {

            setMessage(
                "Please fill all required fields."
            );

            setMessageType("error");

            return;

        }


        // --------------------------------------
        // PHONE VALIDATION
        // --------------------------------------

        if (
            !/^[0-9]{10}$/.test(
                formData.phone
            )
        ) {

            setMessage(
                "Please enter a valid 10-digit phone number."
            );

            setMessageType("error");

            return;

        }


        setSubmitting(true);


        // --------------------------------------
        // DATA TO BACKEND
        // --------------------------------------

        const applicationData = {

            job_id: Number(id),

            name:
                formData.name,

            email:
                formData.email,

            phone:
                formData.phone,

            expected_salary:
                Number(
                    formData.expected_salary
                ),

            cover_letter:
                formData.cover_letter,

            resume:
                formData.resume || null

        };


        try {

            const response =
                await fetch(
                    "https://freelancerworks-production.up.railway.app/api/applications",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                applicationData
                            )

                    }
                );


            const data =
                await response.json();


            console.log(
                "APPLICATION RESPONSE:",
                data
            );


            if (!response.ok) {

                setMessage(
                    data.message ||
                    "Failed to submit application."
                );

                setMessageType("error");

                setSubmitting(false);

                return;

            }


            // ----------------------------------
            // SUCCESS
            // ----------------------------------

            setMessage(
                "Application submitted successfully!"
            );

            setMessageType("success");


            setTimeout(() => {

                navigate("/applications");

            }, 1200);

        }

        catch (error) {

            console.log(
                "Application error:",
                error
            );


            setMessage(
                "Unable to connect to server."
            );

            setMessageType("error");

            setSubmitting(false);

        }

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page">

                <h2>
                    Loading...
                </h2>

            </div>

        );

    }


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="page">

            <h1>
                Apply for this position
            </h1>


            {job && (

                <p className="job-title">

                    {job.title}

                </p>

            )}


            {/* ================= MESSAGE ================= */}

            {message && (

                <div
                    className={
                        messageType === "success"
                            ? "success-message"
                            : "error-message"
                    }
                >

                    {message}

                </div>

            )}


            {/* ================= FORM ================= */}

            <form
                onSubmit={handleSubmit}
                className="application-form"
            >


                {/* NAME */}

                <div className="form-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                </div>


                {/* PHONE */}

                <div className="form-group">

                    <label>
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                    />

                </div>


                {/* SALARY */}

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
                        onChange={handleChange}
                        placeholder="Enter expected salary"
                    />

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
                        onChange={handleChange}
                        placeholder="Tell the client why you are suitable for this job..."
                        rows="7"
                    />

                </div>


                {/* RESUME */}

                <div className="form-group">

                    <label>
                        Resume
                    </label>

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResume}
                    />

                </div>


                {/* BUTTONS */}

                <div className="form-actions">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/jobs/${id}`
                            )
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={submitting}
                    >

                        {submitting
                            ? "Submitting..."
                            : "Submit Application"
                        }

                    </button>

                </div>


            </form>

        </div>

    );

}


export default ApplyJob;