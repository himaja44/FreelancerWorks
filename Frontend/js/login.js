// ==========================================
// LOGIN PAGE
// ==========================================


// ==========================================
// GET FORM
// ==========================================

const loginForm =
    document.getElementById("loginForm");


// ==========================================
// SUBMIT LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ==================================
        // GET VALUES
        // ==================================

        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        // ==================================
        // BASIC VALIDATION
        // ==================================

        if (!email) {

            showToast(
                "Please enter your email.",
                "error"
            );

            return;

        }


        if (!password) {

            showToast(
                "Please enter your password.",
                "error"
            );

            return;

        }


        // ==================================
        // EMAIL VALIDATION
        // ==================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showToast(
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        // ==================================
        // GET LOGIN BUTTON
        // ==================================

        const loginButton =
            document.getElementById(
                "loginButton"
            );


        if (loginButton) {

            loginButton.disabled = true;

            loginButton.textContent =
                "Logging in...";

        }


        try {

            // ==================================
            // LOGIN API
            // ==================================

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
                                    email,

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


            // ==================================
            // LOGIN FAILED
            // ==================================

            if (!response.ok) {

                showToast(
                    data.message ||
                    "Invalid email or password.",
                    "error"
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }

                return;

            }


            // ==================================
            // CHECK TOKEN
            // ==================================

            if (!data.token) {

                showToast(
                    "Login failed. Token was not received.",
                    "error"
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }

                return;

            }


            // ==================================
            // CHECK USER
            // ==================================

            if (!data.user) {

                showToast(
                    "Login failed. User information was not received.",
                    "error"
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }

                return;

            }


            // ==================================
            // SAVE TOKEN
            // ==================================

            localStorage.setItem(
                "token",
                data.token
            );


            // ==================================
            // SAVE USER
            // ==================================

            localStorage.setItem(
                "user",
                JSON.stringify(
                    data.user
                )
            );


            console.log(
                "LOGGED-IN USER:",
                data.user
            );


            // ==================================
            // SUCCESS MESSAGE
            // ==================================

            showToast(
                "Login successful!",
                "success"
            );


            // ==================================
            // ROLE-BASED REDIRECTION
            // ==================================

            const role =
                (
                    data.user.role ||
                    ""
                ).toLowerCase().trim();


            setTimeout(
                function () {

                    // CLIENT

                    if (
                        role === "client"
                    ) {

                        window.location.href =
                            "client-dashboard.html";

                    }

                    // FREELANCER

                    else {

                        window.location.href =
                            "dashboard.html";

                    }

                },
                800
            );


        }

        catch (error) {

            console.log(
                "Login error:",
                error
            );


            showToast(
                "Unable to connect to server.",
                "error"
            );


            if (loginButton) {

                loginButton.disabled =
                    false;

                loginButton.textContent =
                    "Login";

            }

        }

    }
);