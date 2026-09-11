import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";


function Login() {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // ==========================================
    // LOGIN
    // ==========================================

    async function handleLogin(event) {

        event.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/users/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                email:
                                    email.trim(),

                                password:
                                    password

                            })
                    }
                );


            const data =
                await response.json();


            console.log(
                "LOGIN RESPONSE:",
                data
            );


            if (!response.ok) {

                setError(
                    data.message ||
                    "Invalid email or password."
                );

                return;

            }


            // ==================================
            // SAVE LOGIN DETAILS
            // ==================================

            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // ==================================
            // REDIRECT BASED ON ROLE
            // ==================================

            if (
                data.user.role ===
                "freelancer"
            ) {

                navigate(
                    "/freelancer-dashboard"
                );

            }

            else if (
                data.user.role ===
                "client"
            ) {

                navigate(
                    "/client-dashboard"
                );

            }

            else {

                setError(
                    "Invalid user role."
                );

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


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <main className="login-page">


            {/* =====================================
                LOGIN CARD
            ===================================== */}

            <section className="login-card">


                {/* =================================
                    BRAND
                ================================= */}

                <div className="login-brand">

                    <div className="login-logo">

                        Freelancer
                        <span>
                            Works
                        </span>

                    </div>


                    <p>
                        Welcome back
                    </p>

                </div>


                {/* =================================
                    HEADING
                ================================= */}

                <div className="login-heading">

                    <h1>
                        Login to your account
                    </h1>


                    <p>
                        Continue your journey with
                        FreelancerWorks.
                    </p>

                </div>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="login-error">

                        <span>
                            ⚠
                        </span>


                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* =================================
                    FORM
                ================================= */}

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >


                    {/* EMAIL */}

                    <div className="login-form-group">

                        <label htmlFor="email">
                            Email Address
                        </label>


                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={
                                (event) =>
                                    setEmail(
                                        event.target.value
                                    )
                            }
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
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
                            value={password}
                            onChange={
                                (event) =>
                                    setPassword(
                                        event.target.value
                                    )
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
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


                {/* =================================
                    REGISTER
                ================================= */}

                <div className="register-section">

                    <span>
                        Don't have an account?
                    </span>


                    <Link
                        to="/register"
                        className="register-link"
                    >
                        Create an account
                    </Link>

                </div>


                {/* =================================
                    BACK HOME
                ================================= */}

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to Home
                </Link>


            </section>

        </main>

    );

}


export default Login;