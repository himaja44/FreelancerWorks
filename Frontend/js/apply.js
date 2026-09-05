// ==========================================
// AUTHENTICATION
// ==========================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// ==========================================
// GET USER
// ==========================================

const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);

document.getElementById("navUser").textContent =
    user.email || "User";


// ==========================================
// LOGOUT
// ==========================================

document.getElementById("logout").addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    }
);


// ==========================================
// GET JOB ID FROM URL
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const jobId =
    params.get("id");

console.log(
    "APPLICATION JOB ID:",
    jobId
);


// ==========================================
// CHECK JOB ID
// ==========================================

if (!jobId) {

    document.getElementById(
        "jobTitle"
    ).textContent =
        "Job ID is missing.";

}


// ==========================================
// FORM ELEMENT
// ==========================================

const applicationForm =
    document.getElementById(
        "applicationForm"
    );


// ==========================================
// LOAD JOB DETAILS
// ==========================================

async function loadJobDetails() {

    if (!jobId) {
        return;
    }

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/jobs/${jobId}`
            );


        const data =
            await response.json();


        console.log(
            "JOB RESPONSE:",
            data
        );


        if (!response.ok) {

            document.getElementById(
                "jobTitle"
            ).textContent =
                data.message ||
                "Unable to load job.";

            return;

        }


        document.getElementById(
            "jobTitle"
        ).textContent =
            data.job.title;

    }

    catch (error) {

        console.log(
            "Job loading error:",
            error
        );


        document.getElementById(
            "jobTitle"
        ).textContent =
            "Unable to load job details.";

    }

}


// ==========================================
// AUTO-FILL USER DETAILS
// ==========================================

if (user.name) {

    document.getElementById(
        "name"
    ).value =
        user.name;

}


if (user.email) {

    document.getElementById(
        "email"
    ).value =
        user.email;

}


if (user.phone_number) {

    document.getElementById(
        "phone"
    ).value =
        user.phone_number;

}


// ==========================================
// SUBMIT APPLICATION
// ==========================================

applicationForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ==================================
        // CHECK JOB ID
        // ==================================

        if (!jobId) {

            showToast(
                "Job ID is missing.",
                "error"
            );

            return;

        }


        // ==================================
        // GET FORM VALUES
        // ==================================

        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const expectedSalary =
            document.getElementById(
                "expected_salary"
            ).value;


        const coverLetter =
            document.getElementById(
                "cover_letter"
            ).value.trim();


        const resumeInput =
            document.getElementById(
                "resume"
            );


        // ==================================
        // VALIDATION
        // ==================================

        if (
            !name ||
            !email ||
            !phone ||
            !expectedSalary ||
            !coverLetter
        ) {

            showToast(
                "Please fill all required fields.",
                "warning"
            );

            return;

        }


        // ==================================
        // PHONE VALIDATION
        // ==================================

        if (
            !/^[0-9]{10}$/.test(phone)
        ) {

            showToast(
                "Please enter a valid 10-digit phone number.",
                "warning"
            );

            return;

        }


        // ==================================
        // RESUME NAME
        // ==================================

        let resumeName = null;


        if (
            resumeInput.files.length > 0
        ) {

            resumeName =
                resumeInput.files[0].name;

        }


        // ==================================
        // APPLICATION DATA
        // ==================================

        const applicationData = {

            job_id: Number(jobId),

            name: name,

            email: email,

            phone: phone,

            expected_salary:
                Number(expectedSalary),

            cover_letter:
                coverLetter,

            resume:
                resumeName

        };


        console.log(
            "APPLICATION DATA:",
            applicationData
        );


        // ==================================
        // SUBMIT BUTTON
        // ==================================

        const submitButton =
            document.getElementById(
                "submitApplication"
            );


        submitButton.disabled =
            true;


        submitButton.textContent =
            "Submitting...";


        // ==================================
        // SEND TO BACKEND
        // ==================================

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/applications",
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


            // ==================================
            // BACKEND ERROR
            // ==================================

            if (!response.ok) {

                showToast(
                    data.message ||
                    "Failed to submit application.",
                    "error"
                );


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    "Submit Application";


                return;

            }


            // ==================================
            // SUCCESS
            // ==================================

            showToast(
                "Application submitted successfully!",
                "success"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "applications.html";

                },
                1200
            );

        }


        // ==================================
        // NETWORK / SERVER ERROR
        // ==================================

        catch (error) {

            console.log(
                "Application error:",
                error
            );


            showToast(
                "Unable to connect to the server.",
                "error"
            );


            submitButton.disabled =
                false;


            submitButton.textContent =
                "Submit Application";

        }

    }
);


// ==========================================
// START
// ==========================================

loadJobDetails();