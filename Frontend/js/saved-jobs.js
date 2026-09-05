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
// ELEMENT
// ==========================================

const savedJobsContainer =
    document.getElementById(
        "savedJobsContainer"
    );


// ==========================================
// LOAD SAVED JOBS
// ==========================================

async function loadSavedJobs() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/saved-jobs",
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
            "SAVED JOBS RESPONSE:",
            data
        );


        if (!response.ok) {

            savedJobsContainer.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to Load Saved Jobs
                    </h2>

                    <p>
                        ${data.message ||
                        "Something went wrong."}
                    </p>

                </div>

            `;

            return;

        }


        const jobs =
            data.jobs || [];


        displaySavedJobs(
            jobs
        );

    }

    catch (error) {

        console.log(
            "Saved jobs error:",
            error
        );


        savedJobsContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Server Connection Error
                </h2>

                <p>
                    Unable to connect to the server.
                    Please make sure your backend is running.
                </p>

            </div>

        `;

    }

}


// ==========================================
// DISPLAY SAVED JOBS
// ==========================================

function displaySavedJobs(jobs) {

    savedJobsContainer.innerHTML = "";


    if (jobs.length === 0) {

        savedJobsContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ♡
                </div>

                <h2>
                    No Saved Jobs Yet
                </h2>

                <p>
                    You haven't saved any jobs yet.
                    Explore available opportunities
                    and save the ones you want to apply for later.
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


    jobs.forEach(
        function (job) {

            const skills =
                job.skills
                    ? job.skills.split(",")
                    : [];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "saved-job-card";


            card.innerHTML = `

                <div class="saved-job-header">

                    <span class="saved-job-category">
                        ${job.category || "General"}
                    </span>

                    <span class="saved-job-type">
                        ${job.job_type || "Not specified"}
                    </span>

                </div>


                <h2>
                    ${job.title}
                </h2>


                <p class="saved-job-description">
                    ${job.description ||
                    "No description provided."}
                </p>


                <div class="saved-job-skills">

                    ${skills.map(
                        function (skill) {

                            return `
                                <span>
                                    ${skill.trim()}
                                </span>
                            `;

                        }
                    ).join("")}

                </div>


                <div class="saved-job-footer">

                    <div class="saved-job-budget">

                        <strong>
                            ₹${Number(
                                job.budget_min || 0
                            ).toLocaleString("en-IN")}
                            -
                            ₹${Number(
                                job.budget_max || 0
                            ).toLocaleString("en-IN")}
                        </strong>

                        <small>
                            Fixed Price
                        </small>

                    </div>


                    <div class="saved-job-actions">

                        <button
                            class="remove-job-button"
                            data-id="${job.id}"
                        >
                            ♥ Remove
                        </button>

                        <button
                            class="view-job-button"
                            data-id="${job.id}"
                        >
                            View Details →
                        </button>

                    </div>

                </div>

            `;


            savedJobsContainer.appendChild(
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

    // View details

    const viewButtons =
        document.querySelectorAll(
            ".view-job-button"
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


                    window.location.href =
                        `job-details.html?id=${jobId}`;

                }
            );

        }
    );


    // Remove saved job

    const removeButtons =
        document.querySelectorAll(
            ".remove-job-button"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const jobId =
                        this.getAttribute(
                            "data-id"
                        );


                    await removeSavedJob(
                        jobId
                    );

                }
            );

        }
    );

}


// ==========================================
// REMOVE SAVED JOB
// ==========================================

async function removeSavedJob(jobId) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/saved-jobs/${jobId}`,
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
            "REMOVE SAVED JOB:",
            data
        );


        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to remove saved job.",
                "error"
            );

            return;

        }


        showToast(
            "Job removed from saved jobs.",
            "success"
        );


        loadSavedJobs();

    }

    catch (error) {

        console.log(
            "Remove saved job error:",
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

loadSavedJobs();