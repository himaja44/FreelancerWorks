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
// ELEMENTS
// ==========================================

const navUser =
    document.getElementById("navUser");

const logout =
    document.getElementById("logout");


const profileView =
    document.getElementById("profileView");

const profileForm =
    document.getElementById("profileForm");


const editButton =
    document.getElementById("editButton");

const cancelButton =
    document.getElementById("cancelButton");


// ==========================================
// LOGOUT
// ==========================================

logout.addEventListener(
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
// LOAD PROFILE
// ==========================================

async function loadProfile() {

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
            "PROFILE RESPONSE:",
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


        displayProfile(
            user
        );

    }

    catch (error) {

        console.log(
            "PROFILE ERROR:",
            error
        );


        showToast(
            "Unable to connect to server.",
            "error"
        );

    }

}


// ==========================================
// DISPLAY PROFILE
// ==========================================

function displayProfile(user) {


    // Navbar

    navUser.textContent =
        user.email || "User";


    // View mode

    document.getElementById(
        "viewName"
    ).textContent =
        user.name || "Not provided";


    document.getElementById(
        "viewEmail"
    ).textContent =
        user.email || "Not provided";


    document.getElementById(
        "viewPhone"
    ).textContent =
        user.phone_number ||
        "Not provided";


    document.getElementById(
        "viewRole"
    ).textContent =
        user.role || "User";


    // Date

    if (user.created_at) {

        const date =
            new Date(
                user.created_at
            );


        document.getElementById(
            "viewCreated"
        ).textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    // Summary

    document.getElementById(
        "summaryRole"
    ).textContent =
        user.role || "User";


    document.getElementById(
        "summaryEmail"
    ).textContent =
        user.email || "";


    // Form values

    document.getElementById(
        "name"
    ).value =
        user.name || "";


    document.getElementById(
        "email"
    ).value =
        user.email || "";


    document.getElementById(
        "phone"
    ).value =
        user.phone_number || "";

}


// ==========================================
// EDIT PROFILE
// ==========================================

editButton.addEventListener(
    "click",
    function () {

        profileView.classList.add(
            "hidden"
        );


        profileForm.classList.remove(
            "hidden"
        );


        editButton.classList.add(
            "hidden"
        );

    }
);


// ==========================================
// CANCEL EDIT
// ==========================================

cancelButton.addEventListener(
    "click",
    function () {

        profileForm.classList.add(
            "hidden"
        );


        profileView.classList.remove(
            "hidden"
        );


        editButton.classList.remove(
            "hidden"
        );


        loadProfile();

    }
);


// ==========================================
// UPDATE PROFILE
// ==========================================

profileForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        // Name validation

        if (!name) {

            showToast(
                "Please enter your name.",
                "error"
            );

            return;

        }


        // Phone validation

        if (
            phone &&
            !/^[0-9]{10}$/.test(
                phone
            )
        ) {

            showToast(
                "Phone number must contain exactly 10 digits.",
                "error"
            );

            return;

        }


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/profile",
                    {
                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify({

                                name: name,

                                phone_number:
                                    phone

                            })

                    }
                );


            const data =
                await response.json();


            console.log(
                "UPDATE PROFILE RESPONSE:",
                data
            );


            if (!response.ok) {

                showToast(
                    data.message ||
                    "Unable to update profile.",
                    "error"
                );

                return;

            }


            // Update local storage

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    ) || "{}"
                );


            currentUser.name =
                data.user.name;


            currentUser.phone_number =
                data.user.phone_number;


            localStorage.setItem(
                "user",
                JSON.stringify(
                    currentUser
                )
            );


            showToast(
                "Profile updated successfully.",
                "success"
            );


            // Return to view mode

            profileForm.classList.add(
                "hidden"
            );


            profileView.classList.remove(
                "hidden"
            );


            editButton.classList.remove(
                "hidden"
            );


            displayProfile(
                data.user
            );

        }

        catch (error) {

            console.log(
                "UPDATE PROFILE ERROR:",
                error
            );


            showToast(
                "Unable to connect to server.",
                "error"
            );

        }

    }
);


// ==========================================
// START
// ==========================================

loadProfile();