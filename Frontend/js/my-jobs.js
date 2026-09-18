// ==========================================
// AUTHENTICATION
// ==========================================

const token = localStorage.getItem("token");


// ==========================================
// CHECK TOKEN
// ==========================================

if (!token) {

    window.location.href = "login.html";

}


// ==========================================
// GET USER
// ==========================================

const user =
    JSON.parse(
        localStorage.getItem("user") || "{}"
    );


const navUser =
    document.getElementById("navUser");


if (navUser) {

    navUser.textContent =
        user.email || "Client";

}


// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById("logout");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href =
                "login.html";

        }
    );

}


// ==========================================
// JOB CONTAINER
// ==========================================

const jobsContainer =
    document.getElementById(
        "jobsContainer"
    );


// ==========================================
// LOAD MY JOBS
// ==========================================

async function loadMyJobs() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/jobs/my",
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
            "MY JOBS RESPONSE:",
            data
        );


        // ==================================
        // TOKEN INVALID
        // ==================================

        if (
            response.status === 401
        ) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            showToast(
                "Your session has expired. Please login again."
            );

            window.location.href =
                "login.html";

            return;

        }


        // ==================================
        // OTHER ERROR
        // ==================================

        if (!response.ok) {

            jobsContainer.innerHTML = `

                <div class="my-jobs-empty">

                    <h2>
                        Unable to Load Jobs
                    </h2>

                    <p>
                        ${
                            data.message ||
                            "Something went wrong."
                        }
                    </p>

                </div>

            `;

            return;

        }


        const jobs =
            data.jobs || [];


        displayJobs(jobs);


    }
    catch (error) {

        console.log(
            "My jobs error:",
            error
        );


        jobsContainer.innerHTML = `

            <div class="my-jobs-empty">

                <h2>
                    Server Connection Error
                </h2>

                <p>
                    Unable to connect to the server.
                </p>

            </div>

        `;

    }

}


// ==========================================
// DISPLAY JOBS
// ==========================================

function displayJobs(jobs) {

    jobsContainer.innerHTML = "";


    // ======================================
    // NO JOBS
    // ======================================

    if (jobs.length === 0) {

        jobsContainer.innerHTML = `

            <div class="my-jobs-empty">

                <h2>
                    No Jobs Posted Yet
                </h2>

                <p>
                    You haven't posted any jobs.
                    Create your first job and start
                    finding talented freelancers.
                </p>

                <br>

                <a
                    href="post-job.html"
                    class="view-details-button"
                >
                    Post a Job →
                </a>

            </div>

        `;

        return;

    }


    // ======================================
    // CREATE JOB CARDS
    // ======================================

    jobs.forEach(
        function (job) {

            const skills =
                job.skills
                    ? job.skills
                        .split(",")
                        .map(
                            skill =>
                                skill.trim()
                        )
                        .filter(
                            skill =>
                                skill.length > 0
                        )
                    : [];


            const card =
                document.createElement(
                    "div"
                );


            // IMPORTANT:
            // This matches my-jobs.css

            card.className =
                "my-job-card";


            card.innerHTML = `

                <!-- JOB TOP -->

                <div class="my-job-top">

                    <div>

                        <span class="my-job-category">
                            ${
                                job.category ||
                                "General"
                            }
                        </span>


                        <h2 class="my-job-title">
                            ${
                                job.title ||
                                "Untitled Job"
                            }
                        </h2>


                        <p class="my-job-description">
                            ${
                                job.description ||
                                "No description provided."
                            }
                        </p>


                        <!-- SKILLS -->

                        <div class="my-job-skills">

                            ${
                                skills.length > 0

                                ?

                                skills.map(
                                    function (skill) {

                                        return `
                                            <span class="my-job-skill">
                                                ${skill}
                                            </span>
                                        `;

                                    }
                                ).join("")

                                :

                                `
                                    <span class="my-job-skill">
                                        No skills specified
                                    </span>
                                `
                            }

                        </div>

                    </div>


                    <!-- JOB TYPE -->

                    <span class="my-job-type">

                        ${
                            job.job_type ||
                            "Not specified"
                        }

                    </span>

                </div>


                <!-- DIVIDER -->

                <div class="my-job-divider"></div>


                <!-- BOTTOM -->

                <div class="my-job-bottom">


                    <!-- BUDGET -->

                    <div class="my-job-budget">

                        <strong>

                            ₹${
                                Number(
                                    job.budget_min || 0
                                ).toLocaleString(
                                    "en-IN"
                                )
                            }

                            -

                            ₹${
                                Number(
                                    job.budget_max || 0
                                ).toLocaleString(
                                    "en-IN"
                                )
                            }

                        </strong>


                        <span>
                            Fixed Price
                        </span>

                    </div>


                    <!-- ACTIONS -->

                    <div class="my-job-actions">


                        <!-- VIEW DETAILS -->

                        <button
                            class="view-details-button"
                            data-id="${job.id}"
                        >
                            View Details →
                        </button>


                        <!-- VIEW APPLICANTS -->

                        <button
                            class="view-applicants-button"
                            data-id="${job.id}"
                        >
                            View Applicants
                        </button>


                        <!-- DELETE -->

                        <button
                            class="delete-button"
                            data-id="${job.id}"
                        >
                            Delete
                        </button>


                    </div>

                </div>

            `;


            jobsContainer.appendChild(
                card
            );

        }
    );


    addJobEvents();

}


// ==========================================
// BUTTON EVENTS
// ==========================================

function addJobEvents() {


    // ======================================
    // VIEW DETAILS
    // ======================================

    const viewButtons =
        document.querySelectorAll(
            ".view-details-button"
        );


    viewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const jobId =
                        this.getAttribute(
                            "data-id"
                        );


                    console.log(
                        "VIEW JOB:",
                        jobId
                    );


                    window.location.href =
                        `job-details.html?id=${jobId}`;

                }
            );

        }
    );


    // ======================================
    // VIEW APPLICANTS
    // ======================================

    const applicantsButtons =
        document.querySelectorAll(
            ".view-applicants-button"
        );


    applicantsButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const jobId =
                        this.getAttribute(
                            "data-id"
                        );


                    console.log(
                        "APPLICANTS JOB ID:",
                        jobId
                    );


                    window.location.href =
                        `applicants.html?jobId=${jobId}`;

                }
            );

        }
    );


    // ======================================
    // DELETE JOB
    // ======================================

    const deleteButtons =
        document.querySelectorAll(
            ".delete-button"
        );


    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const jobId =
                        this.getAttribute(
                            "data-id"
                        );


                    const confirmed =
                        confirm(
                            "Are you sure you want to delete this job?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    await deleteJob(
                        jobId
                    );

                }
            );

        }
    );

}


// ==========================================
// DELETE JOB
// ==========================================

async function deleteJob(jobId) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/jobs/${jobId}`,
                {

                    method: "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        console.log(
            "DELETE JOB RESPONSE:",
            data
        );


        // ==================================
        // TOKEN EXPIRED
        // ==================================

        if (
            response.status === 401
        ) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            showToast(
                "Your session has expired. Please login again."
            );

            window.location.href =
                "login.html";

            return;

        }


        // ==================================
        // DELETE ERROR
        // ==================================

        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to delete job.",
                "error"
            );

            return;

        }


        // ==================================
        // SUCCESS
        // ==================================

        showToast(
            "Job deleted successfully.",
            "success"
        );


        // Reload jobs

        loadMyJobs();

    }


    catch (error) {

        console.log(
            "Delete job error:",
            error
        );


        showToast(
            "Unable to connect to server.",
            "error"
        );

    }

}


// ==========================================
// START
// ==========================================

loadMyJobs();