// ==========================================
// AUTHENTICATION
// ==========================================

const token =
    localStorage.getItem("token");


if (!token) {

    window.location.href =
        "login.html";

}


// ==========================================
// LOAD PROFILE
// ==========================================

async function loadClientProfile() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        console.log(
            "CLIENT PROFILE:",
            data
        );


        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to load profile.",
                "error"
            );

            return;

        }


        const user =
            data.user;


        // Check role

        if (
            user.role.toLowerCase() !==
            "client"
        ) {

            showToast(
                "This page is only available for clients.",
                "error"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                1000
            );


            return;

        }


        // Navbar

        document.getElementById(
            "navUser"
        ).textContent =
            user.email || "Client";


        // Welcome

        document.getElementById(
            "welcomeMessage"
        ).textContent =
            `Welcome, ${user.name || "Client"}!`;


        // Account

        document.getElementById(
            "userName"
        ).textContent =
            user.name || "Not available";


        document.getElementById(
            "userEmail"
        ).textContent =
            user.email || "Not available";


        document.getElementById(
            "userPhone"
        ).textContent =
            user.phone_number ||
            "Not available";


        document.getElementById(
            "userRole"
        ).textContent =
            user.role || "Client";

    }

    catch (error) {

        console.log(
            "Client profile error:",
            error
        );


        showToast(
            "Unable to connect to server.",
            "error"
        );

    }

}


// ==========================================
// LOGOUT
// ==========================================

document.getElementById(
    "logout"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );


        window.location.href =
            "login.html";

    }
);


// ==========================================
// START
// ==========================================

loadClientProfile();