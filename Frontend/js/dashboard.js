const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


async function loadProfile() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/profile",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


        const data = await response.json();


        console.log("PROFILE RESPONSE:", data);


        if (response.ok) {

            const user = data.user;


            document.getElementById("welcome").textContent =
                `Welcome, ${user.name || user.email}!`;


            document.getElementById("navUser").textContent =
                user.email;


            document.getElementById("userName").textContent =
                user.name || "Not available";


            document.getElementById("userEmail").textContent =
                user.email || "Not available";


            document.getElementById("userRole").textContent =
                user.role || "Not available";


            document.getElementById("userPhone").textContent =
                user.phone_number || "Not available";

        }

        else {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            showToast(
                "Your login session has expired. Please login again."
            );

           setTimeout(function () {
    window.location.href = "login.html";
}, 1500);

        }

    }

    catch (error) {

        console.log("Profile error:", error);

        document.getElementById("userName").textContent =
            "Unable to load";

        document.getElementById("userEmail").textContent =
            "Unable to load";

        document.getElementById("userRole").textContent =
            "Unable to load";

        document.getElementById("userPhone").textContent =
            "Unable to load";

    }

}


document.getElementById("logout").addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    }
);


loadProfile();