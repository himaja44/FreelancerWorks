import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "",
        terms: false
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        // Remove error when user starts correcting field
        setErrors({
            ...errors,
            [name]: ""
        });

    }


    // ==========================================
    // VALIDATION
    // ==========================================

    function validateForm() {

        const newErrors = {};

        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;
        const phone = formData.phone.trim();
        const role = formData.role;


        // Name

        if (!name) {

            newErrors.name =
                "Please enter your name.";

        }


        // Email

        if (!email) {

            newErrors.email =
                "Please enter your email.";

        } else {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                newErrors.email =
                    "Please enter a valid email address.";

            }

        }


        // Password

        if (password.length < 6) {

            newErrors.password =
                "Password must contain at least 6 characters.";

        }


        // Confirm Password

        if (!confirmPassword) {

            newErrors.confirmPassword =
                "Please confirm your password.";

        } else if (password !== confirmPassword) {

            newErrors.confirmPassword =
                "Passwords do not match.";

        }


        // Phone

        if (!phone) {

            newErrors.phone =
                "Please enter your phone number.";

        } else if (!/^\d{10}$/.test(phone)) {

            newErrors.phone =
                "Phone number must contain exactly 10 digits.";

        }


        // Role

        if (!role) {

            newErrors.role =
                "Please select your role.";

        }


        // Terms

        if (!formData.terms) {

            newErrors.terms =
                "Please accept the terms and conditions.";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }


    // ==========================================
    // SUBMIT REGISTRATION
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();

        setSuccess("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);


        try {

            const response = await fetch(
                "http://localhost:5000/api/users/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: formData.name.trim(),

                        email: formData.email.trim(),

                        password: formData.password,

                        phone: formData.phone.trim(),

                        role: formData.role

                    })
                }
            );


            const data = await response.json();


            console.log(
                "REGISTER RESPONSE:",
                data
            );


            // ==================================
            // BACKEND ERROR
            // ==================================

            if (!response.ok) {

                setErrors({
                    submit:
                        data.message ||
                        "Registration failed."
                });

                return;
            }


            // ==================================
            // SUCCESS
            // ==================================

            setSuccess(
                data.message ||
                "Registration successful!"
            );


            // Clear form

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                role: "",
                terms: false
            });


            // Redirect to login

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        }

        catch (error) {

            console.log(
                "Registration error:",
                error
            );

            setErrors({
                submit:
                    "Unable to connect to the server. Please make sure the backend is running."
            });

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div className="register-page">


            <div className="register-container">


                {/* ==================================
                    LEFT INFORMATION SECTION
                ================================== */}

                <section className="register-info">

                    <p className="register-label">
                        JOIN FREELANCER WORKS
                    </p>


                    <h1>
                        Turn your skills
                        <br />
                        into opportunities.
                    </h1>


                    <p className="register-description">

                        Create your account and connect
                        with clients looking for talented
                        freelancers.

                    </p>


                    <div className="benefits">


                        <div className="benefit">

                            <span className="benefit-icon">
                                ✓
                            </span>

                            <div>

                                <h3>
                                    Find quality opportunities
                                </h3>

                                <p>
                                    Discover jobs that match
                                    your skills and experience.
                                </p>

                            </div>

                        </div>


                        <div className="benefit">

                            <span className="benefit-icon">
                                ✓
                            </span>

                            <div>

                                <h3>
                                    Build your profile
                                </h3>

                                <p>
                                    Showcase your skills,
                                    experience and projects.
                                </p>

                            </div>

                        </div>


                        <div className="benefit">

                            <span className="benefit-icon">
                                ✓
                            </span>

                            <div>

                                <h3>
                                    Grow your career
                                </h3>

                                <p>
                                    Work with clients and
                                    build your professional
                                    network.
                                </p>

                            </div>

                        </div>


                    </div>

                </section>


                {/* ==================================
                    REGISTER CARD
                ================================== */}

                <section className="register-card">


                    <div className="register-brand">

                        <div className="register-logo">
                            Freelancer <span>Works</span>
                        </div>

                        <p>
                            Create your account
                        </p>

                    </div>


                    <div className="form-heading">

                        <h2>
                            Get started today
                        </h2>

                        <p>
                            Join our growing freelance community.
                        </p>

                    </div>


                    {/* SUCCESS MESSAGE */}

                    {success && (

                        <div className="register-success">

                            <span>✓</span>

                            {success}

                        </div>

                    )}


                    {/* ERROR MESSAGE */}

                    {errors.submit && (

                        <div className="register-error">

                            <span>⚠</span>

                            <p>
                                {errors.submit}
                            </p>

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="register-form"
                    >


                        {/* FULL NAME */}

                        <div className="register-form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <small>
                                    {errors.name}
                                </small>
                            )}

                        </div>


                        {/* EMAIL */}

                        <div className="register-form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {errors.email && (
                                <small>
                                    {errors.email}
                                </small>
                            )}

                        </div>


                        {/* PASSWORD */}

                        <div className="register-form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            {errors.password && (
                                <small>
                                    {errors.password}
                                </small>
                            )}

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="register-form-group">

                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            {errors.confirmPassword && (
                                <small>
                                    {errors.confirmPassword}
                                </small>
                            )}

                        </div>


                        {/* PHONE */}

                        <div className="register-form-group">

                            <label htmlFor="phone">
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                inputMode="numeric"
                                maxLength="10"
                                placeholder="Enter your 10-digit phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            {errors.phone && (
                                <small>
                                    {errors.phone}
                                </small>
                            )}

                        </div>


                        {/* ROLE */}

                        <div className="register-form-group">

                            <label htmlFor="role">
                                I want to
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select your role
                                </option>

                                <option value="freelancer">
                                    Work as a Freelancer
                                </option>

                                <option value="client">
                                    Hire Freelancers
                                </option>

                            </select>


                            {errors.role && (
                                <small>
                                    {errors.role}
                                </small>
                            )}

                        </div>


                        {/* TERMS */}

                        <div className="terms">

                            <label>

                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                />

                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        onClick={(event) =>
                                            event.preventDefault()
                                        }
                                    >
                                        Terms & Conditions
                                    </a>
                                </span>

                            </label>


                            {errors.terms && (
                                <small>
                                    {errors.terms}
                                </small>
                            )}

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"
                            }

                        </button>


                    </form>


                    {/* LOGIN */}

                    <div className="login-text">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Login
                        </button>

                    </div>


                    {/* BACK HOME */}

                    <button
                        type="button"
                        className="register-back-home"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        ← Back to Home
                    </button>


                </section>

            </div>

        </div>

    );

}

export default Register;