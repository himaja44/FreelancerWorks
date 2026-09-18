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
// USER
// ==========================================

const storedUser =
    JSON.parse(
        localStorage.getItem("user") || "{}"
    );


document.getElementById(
    "navUser"
).textContent =
    storedUser.email || "Client";


// ==========================================
// LOGOUT
// ==========================================

document.getElementById(
    "logout"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.href =
            "login.html";

    }
);


// ==========================================
// FORM
// ==========================================

const form =
    document.getElementById(
        "postJobForm"
    );


const submitButton =
    document.getElementById(
        "postJobButton"
    );


// ==========================================
// SUBMIT
// ==========================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Get values

        const title =
            document.getElementById(
                "title"
            ).value.trim();


        const description =
            document.getElementById(
                "description"
            ).value.trim();


        const category =
            document.getElementById(
                "category"
            ).value;


        const skills =
            document.getElementById(
                "skills"
            ).value.trim();


        const requirements =
            document.getElementById(
                "requirements"
            ).value.trim();


        const responsibilities =
            document.getElementById(
                "responsibilities"
            ).value.trim();


        const budgetMin =
            document.getElementById(
                "budget_min"
            ).value;


        const budgetMax =
            document.getElementById(
                "budget_max"
            ).value;


        const jobType =
            document.getElementById(
                "job_type"
            ).value;


        // =====================================
        // VALIDATION
        // =====================================

        clearErrors();


        let isValid = true;


        if (title.length < 3) {

            showError(
                "titleError",
                "Job title must contain at least 3 characters."
            );

            isValid = false;

        }


        if (description.length < 20) {

            showError(
                "descriptionError",
                "Description must contain at least 20 characters."
            );

            isValid = false;

        }


        if (!category) {

            showError(
                "categoryError",
                "Please select a category."
            );

            isValid = false;

        }


        if (skills.length < 2) {

            showError(
                "skillsError",
                "Please enter at least one skill."
            );

            isValid = false;

        }


        if (requirements.length < 10) {

            showError(
                "requirementsError",
                "Please provide the job requirements."
            );

            isValid = false;

        }


        if (responsibilities.length < 10) {

            showError(
                "responsibilitiesError",
                "Please provide the responsibilities."
            );

            isValid = false;

        }


        const min =
            Number(budgetMin);


        const max =
            Number(budgetMax);


        if (!budgetMin || min <= 0) {

            showError(
                "budgetMinError",
                "Enter a valid minimum budget."
            );

            isValid = false;

        }


        if (!budgetMax || max <= 0) {

            showError(
                "budgetMaxError",
                "Enter a valid maximum budget."
            );

            isValid = false;

        }


        if (
            budgetMin &&
            budgetMax &&
            max < min
        ) {

            showError(
                "budgetMaxError",
                "Maximum budget must be greater than or equal to minimum budget."
            );

            isValid = false;

        }


        if (!jobType) {

            showError(
                "jobTypeError",
                "Please select a job type."
            );

            isValid = false;

        }


        if (!isValid) {

            return;

        }


        // =====================================
        // DISABLE BUTTON
        // =====================================

        submitButton.disabled = true;

        submitButton.textContent =
            "Posting...";


        try {


            const response =
                await fetch(
                    "http://localhost:5000/api/jobs",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        body: JSON.stringify({

                            title:
                                title,

                            description:
                                description,

                            category:
                                category,

                            skills:
                                skills,

                            requirements:
                                requirements,

                            responsibilities:
                                responsibilities,

                            budget_min:
                                min,

                            budget_max:
                                max,

                            job_type:
                                jobType

                        })

                    }
                );


            const data =
                await response.json();


            console.log(
                "POST JOB RESPONSE:",
                data
            );


            // =================================
            // ERROR
            // =================================

            if (!response.ok) {

                showToast(
                    data.message ||
                    "Unable to post job.",
                    "error"
                );

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Post Job";

                return;

            }


            // =================================
            // SUCCESS
            // =================================

            showToast(
                "Job posted successfully!",
                "success"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "my-jobs.html";

                },
                1200
            );


        }

        catch (error) {

            console.log(
                "Post job error:",
                error
            );


            showToast(
                "Unable to connect to server.",
                "error"
            );


            submitButton.disabled =
                false;


            submitButton.textContent =
                "Post Job";

        }

    }
);


// ==========================================
// ERROR HELPERS
// ==========================================

function showError(
    elementId,
    message
) {

    document.getElementById(
        elementId
    ).textContent =
        message;

}


function clearErrors() {

    const errors =
        document.querySelectorAll(
            ".error-message"
        );


    errors.forEach(
        function (error) {

            error.textContent = "";

        }
    );

}