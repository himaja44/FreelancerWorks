import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!email.trim()) {

            setError("Please enter your email.");

            return;
        }


        if (!password) {

            setError("Please enter your password.");

            return;
        }


        // Correct email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email.trim())) {

            setError("Please enter a valid email address.");

            return;
        }


        setLoading(true);


        try {

            // ==========================================
            // LOGIN API
            // ==========================================

            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password
                    })
                }
            );


            const data = await response.json();


            console.log(
                "LOGIN RESPONSE:",
                data
            );


            // ==========================================
            // LOGIN FAILED
            // ==========================================

            if (!response.ok) {

                setError(
                    data.message ||
                    "Invalid email or password."
                );

                return;
            }


            // ==========================================
            // CHECK TOKEN
            // ==========================================

            if (!data.token) {

                setError(
                    "Login failed. Token was not received."
                );

                return;
            }


            // ==========================================
            // CHECK USER
            // ==========================================

            if (!data.user) {

                setError(
                    "Login failed. User information was not received."
                );

                return;
            }


            // ==========================================
            // SAVE TOKEN
            // ==========================================

            localStorage.setItem(
                "token",
                data.token
            );


            // ==========================================
            // SAVE USER
            // ==========================================

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            console.log(
                "LOGGED-IN USER:",
                data.user
            );


            // ==========================================
            // GET USER ROLE
            // ==========================================

            const role =
                (data.user.role || "")
                    .toLowerCase()
                    .trim();


            // ==========================================
            // REDIRECT
            // ==========================================

            if (role === "client") {

                navigate("/client-dashboard");

            } else {

                navigate("/jobs");

            }

        }

        catch (error) {

            console.log(
                "Login error:",
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


    return (

        <div className="login-page">

            <div className="login-card">


                {/* ==================================
                    BRAND
                ================================== */}

                <div className="login-brand">

                    <div className="login-logo">
                        Freelancer <span>Works</span>
                    </div>

                    <p>
                        Welcome back
                    </p>

                </div>


                {/* ==================================
                    TITLE
                ================================== */}

                <div className="login-heading">

                    <h1>
                        Login to your account
                    </h1>

                    <p>
                        Continue your journey with FreelancerWorks.
                    </p>

                </div>


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="login-error">

                        <span>⚠</span>

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >


                    {/* EMAIL */}

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="login-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                </form>


                {/* ==================================
                    REGISTER
                ================================== */}

                <div className="register-section">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        type="button"
                        className="register-link"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create an account
                    </button>

                </div>


                {/* ==================================
                    BACK HOME
                ================================== */}

                <button
                    type="button"
                    className="back-home"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    ← Back to Home
                </button>


            </div>

        </div>

    );

}

export default Login;