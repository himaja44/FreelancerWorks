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

const user =
    JSON.parse(
        localStorage.getItem("user") || "{}"
    );


document.getElementById(
    "navUser"
).textContent =
    user.email || "User";


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
// GET JOB ID
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const jobId =
    params.get("jobId");


console.log(
    "APPLICANTS JOB ID:",
    jobId
);


// ==========================================
// ELEMENTS
// ==========================================

const jobTitle =
    document.getElementById(
        "jobTitle"
    );


const applicantsContainer =
    document.getElementById(
        "applicantsContainer"
    );


// ==========================================
// LOAD APPLICANTS
// ==========================================

async function loadApplicants() {

    if (!jobId) {

        applicantsContainer.innerHTML = `

            <div class="empty-state">

                <h2>
                    Job ID is missing
                </h2>

            </div>

        `;

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/applications/job/${jobId}`,
                {

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        console.log(
            "APPLICANTS RESPONSE:",
            data
        );


        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to load applicants.",
                "error"
            );

            return;

        }


        // ==================================
        // JOB TITLE
        // ==================================

        if (data.job) {

            jobTitle.textContent =
                `Applicants for ${data.job.title}`;

        }


        // ==================================
        // NO APPLICANTS
        // ==================================

        if (
            !data.applications ||
            data.applications.length === 0
        ) {

            applicantsContainer.innerHTML = `

                <div class="empty-state">

                    <h2>
                        No Applicants Yet
                    </h2>

                    <p>
                        No freelancers have applied
                        for this job yet.
                    </p>

                </div>

            `;

            return;

        }


        // ==================================
        // DISPLAY APPLICANTS
        // ==================================

        applicantsContainer.innerHTML =
            data.applications
                .map(function (application) {

                    return createApplicantCard(
                        application
                    );

                })
                .join("");


        // ==================================
        // ADD BUTTON EVENTS
        // ==================================

        document
            .querySelectorAll(".accept-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const applicationId =
                            this.dataset.id;

                        updateApplicationStatus(
                            applicationId,
                            "Accepted"
                        );

                    }
                );

            });


        document
            .querySelectorAll(".reject-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const applicationId =
                            this.dataset.id;

                        updateApplicationStatus(
                            applicationId,
                            "Rejected"
                        );

                    }
                );

            });

    }

    catch (error) {

        console.log(
            "Applicants error:",
            error
        );


        showToast(
            "Unable to connect to the server.",
            "error"
        );

    }

}


// ==========================================
// CREATE APPLICANT CARD
// ==========================================

function createApplicantCard(application) {

    const status =
        application.status || "Pending";


    let statusClass =
        "status-pending";


    if (status === "Accepted") {

        statusClass =
            "status-accepted";

    }


    if (status === "Rejected") {

        statusClass =
            "status-rejected";

    }


    return `

        <div
            class="applicant-card"
            data-id="${application.id}"
        >

            <div class="applicant-header">

                <div>

                    <h2>
                        ${application.name}
                    </h2>

                    <p>
                        ${application.email}
                    </p>

                </div>


                <span
                    class="application-status ${statusClass}"
                >
                    ${status}
                </span>

            </div>


            <div class="applicant-details">

                <div>

                    <span>
                        Phone
                    </span>

                    <strong>
                        ${application.phone}
                    </strong>

                </div>


                <div>

                    <span>
                        Expected Salary
                    </span>

                    <strong>
                        ₹${Number(
                            application.expected_salary
                        ).toLocaleString("en-IN")}
                    </strong>

                </div>


                <div>

                    <span>
                        Applied On
                    </span>

                    <strong>
                        ${formatDate(
                            application.created_at
                        )}
                    </strong>

                </div>

            </div>


            <div class="cover-letter">

                <h3>
                    Cover Letter
                </h3>

                <p>
                    ${application.cover_letter}
                </p>

            </div>


            <div class="applicant-actions">

                ${
                    status === "Pending"

                    ?

                    `

                    <button
                        class="accept-button"
                        data-id="${application.id}"
                    >
                        Accept
                    </button>


                    <button
                        class="reject-button"
                        data-id="${application.id}"
                    >
                        Reject
                    </button>

                    `

                    :

                    ""

                }

            </div>

        </div>

    `;

}


// ==========================================
// UPDATE STATUS
// ==========================================

async function updateApplicationStatus(
    applicationId,
    status
) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/applications/${applicationId}/status`,
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

                            status: status

                        })

                }
            );


        const data =
            await response.json();


        console.log(
            "STATUS RESPONSE:",
            data
        );


        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to update application.",
                "error"
            );

            return;

        }


        // ==================================
        // SUCCESS
        // ==================================

        showToast(
            data.message,
            "success"
        );


        // Reload applicants

        setTimeout(
            function () {

                loadApplicants();

            },
            800
        );

    }

    catch (error) {

        console.log(
            "Status update error:",
            error
        );


        showToast(
            "Unable to connect to the server.",
            "error"
        );

    }

}


// ==========================================
// DATE FORMAT
// ==========================================

function formatDate(date) {

    if (!date) {

        return "";

    }


    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// START
// ==========================================

loadApplicants();