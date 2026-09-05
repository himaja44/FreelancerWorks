const token =
    localStorage.getItem("token");


if (!token) {

    window.location.href =
        "login.html";

}


const user =
    JSON.parse(
        localStorage.getItem("user") || "{}"
    );


const navUser =
    document.getElementById("navUser");


if (navUser) {

    navUser.textContent =
        user.email || "User";

}


const applicationsContainer =
    document.getElementById(
        "applicationsContainer"
    );


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
// LOAD APPLICATIONS
// ==========================================

async function loadApplications() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/applications/my",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const data =
            await response.json();


        console.log(
            "APPLICATIONS RESPONSE:",
            data
        );


        if (!response.ok) {

            applicationsContainer.innerHTML = `

                <div class="applications-empty">

                    <div class="empty-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to load applications
                    </h2>

                    <p>
                        ${data.message ||
                        "Something went wrong."}
                    </p>

                </div>

            `;

            return;

        }


        const applications =
            data.applications || [];


        if (applications.length === 0) {

            applicationsContainer.innerHTML = `

                <div class="applications-empty">

                    <div class="empty-icon">
                        📋
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        You haven't applied for any
                        jobs yet. Start exploring
                        opportunities that match
                        your skills.
                    </p>

                    <a
                        href="jobs.html"
                        class="find-jobs-button"
                    >
                        Find Jobs →
                    </a>

                </div>

            `;

            return;

        }


        applicationsContainer.innerHTML = "";


        applications.forEach(
            function (application) {

                const applicationCard =
                    document.createElement(
                        "div"
                    );


                applicationCard.className =
                    "application-card";


                const salary =
                    Number(
                        application.expected_salary
                    ).toLocaleString(
                        "en-IN"
                    );


                const appliedDate =
                    new Date(
                        application.created_at
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    );


                const status =
                    application.status ||
                    "Pending";


                applicationCard.innerHTML = `

                    <div class="application-card-top">

                        <div>

                            <span class="application-category">
                                ${application.category ||
                                "Job"}
                            </span>

                            <h2>
                                ${application.title}
                            </h2>

                            <p class="application-type">
                                ${application.job_type ||
                                "Remote"}
                            </p>

                        </div>


                        <span
                            class="application-status ${status.toLowerCase()}"
                        >
                            ${status}
                        </span>

                    </div>


                    <div class="application-details">

                        <div class="application-detail">

                            <span>
                                Applied On
                            </span>

                            <strong>
                                ${appliedDate}
                            </strong>

                        </div>


                        <div class="application-detail">

                            <span>
                                Expected Salary
                            </span>

                            <strong>
                                ₹${salary}
                            </strong>

                        </div>


                        <div class="application-detail">

                            <span>
                                Job Budget
                            </span>

                            <strong>
                                ₹${Number(
                                    application.budget_min
                                ).toLocaleString("en-IN")}
                                -
                                ₹${Number(
                                    application.budget_max
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>

                    </div>


                    <div class="application-cover-letter">

                        <h3>
                            Cover Letter
                        </h3>

                        <p>
                            ${application.cover_letter}
                        </p>

                    </div>


                  <div class="application-card-footer">

                        <span>
                            Application #${application.job_id}
                        </span>


                        <button
                            class="view-job-button"
                            data-job-id="${application.job_id}"
                        >
                            View Job →
                        </button>

                    </div> 

                `;


                applicationsContainer.appendChild(
                    applicationCard
                );

            }
        );


        addViewJobEvents();

    }

    catch (error) {

        console.log(
            "Applications error:",
            error
        );


        applicationsContainer.innerHTML = `

            <div class="applications-empty">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to connect to server
                </h2>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

            </div>

        `;

    }

}


// ==========================================
// VIEW JOB
// ==========================================

function addViewJobEvents() {

    const buttons =
        document.querySelectorAll(
            ".view-job-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const jobId =
                        this.getAttribute(
                            "data-job-id"
                        );


                    window.location.href =
                        `job-details.html?id=${jobId}`;

                }
            );

        }
    );

}


loadApplications();