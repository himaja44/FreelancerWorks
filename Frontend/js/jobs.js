// ==========================================
// AUTHENTICATION
// ==========================================

const token = localStorage.getItem("token");


if (!token) {

    window.location.href = "login.html";

}


// ==========================================
// USER
// ==========================================

const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);


const navUser =
    document.getElementById("navUser");


if (navUser) {

    navUser.textContent =
        user.email || "User";

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
// ELEMENTS
// ==========================================

const jobsContainer =
    document.getElementById(
        "jobsContainer"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );

/*const  JobTypeFilter= 
     document.getElementById(
        "JobTypeFilter"
     );*/


const searchButton =
    document.getElementById(
        "searchButton"
    );


// ==========================================
// VARIABLES
// ==========================================

let allJobs = [];

let savedJobs = [];


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


        if (response.ok) {

            savedJobs =
                (data.jobs || []).map(
                    function (job) {

                        return Number(
                            job.id
                        );

                    }
                );

        }

    }

    catch (error) {

        console.log(
            "Saved jobs loading error:",
            error
        );

        // Don't stop jobs from loading
        savedJobs = [];

    }

}


// ==========================================
// LOAD ALL JOBS
// ==========================================

async function loadJobs() {

    try {

        jobsContainer.innerHTML = `
            <p class="loading-message">
                Loading jobs...
            </p>
        `;


        const response =
            await fetch(
                "http://localhost:5000/api/jobs"
            );


        const data =
            await response.json();


        console.log(
            "JOBS RESPONSE:",
            data
        );


        if (!response.ok) {

            jobsContainer.innerHTML = `
                <div class="jobs-message">
                    <h3>
                        Unable to load jobs
                    </h3>

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


        allJobs =
            data.jobs || [];


        console.log(
            "ALL JOBS:",
            allJobs
        );


        // Load saved jobs

        await loadSavedJobs();


        // Display jobs

        displayJobs(
            allJobs
        );

    }

    catch (error) {

        console.log(
            "LOAD JOBS ERROR:",
            error
        );


        jobsContainer.innerHTML = `
            <div class="jobs-message">

                <h3>
                    Unable to connect to the server
                </h3>

                <p>
                    Please make sure your backend
                    server is running.
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


    if (!jobs || jobs.length === 0) {

        jobsContainer.innerHTML = `

            <div class="jobs-message">

                <div class="jobs-empty-icon">
                    🔍
                </div>

                <h3>
                    No jobs found
                </h3>

                <p>
                    Try another search or category.
                </p>

                
                   

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


            const jobId =
                Number(job.id);


            const isSaved =
                savedJobs.includes(
                    jobId
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "job-card";


            card.innerHTML = `

                <div class="job-card-header">

                    <span class="job-category">
                        ${job.category || ""}
                    </span>

                    <span class="job-type">
                        ${job.job_type || ""}
                    </span>

                </div>


                <h2>
                    ${job.title || "Untitled Job"}
                </h2>


                <p class="job-description">
                    ${
                        job.description ||
                        "No description available."
                    }
                </p>


                <div class="job-skills">

                    ${
                        skills.map(
                            function (skill) {

                                return `
                                    <span>
                                        ${skill.trim()}
                                    </span>
                                `;

                            }
                        ).join("")
                    }

                </div>


                <div class="job-footer">

                    <div class="job-budget">

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


                    <div class="job-actions">

                        <button
                            class="save-job ${
                                isSaved
                                    ? "saved"
                                    : ""
                            }"
                            data-id="${jobId}"
                        >

                            ${
                                isSaved
                                    ? "♥ Saved"
                                    : "♡ Save"
                            }

                        </button>


                        <button
                            class="view-job"
                            data-id="${jobId}"
                        >
                            View Details →
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
// JOB BUTTON EVENTS
// ==========================================

function addJobEvents() {

    // VIEW DETAILS

    const viewButtons =
        document.querySelectorAll(
            ".view-job"
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
                        "VIEW JOB ID:",
                        jobId
                    );


                    window.location.href =
                        `job-details.html?id=${jobId}`;

                }
            );

        }
    );


    // SAVE JOB

    const saveButtons =
        document.querySelectorAll(
            ".save-job"
        );


    saveButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const jobId =
                        Number(
                            this.getAttribute(
                                "data-id"
                            )
                        );


                    const isSaved =
                        savedJobs.includes(
                            jobId
                        );


                    try {

                        // ==========================
                        // REMOVE SAVED JOB
                        // ==========================

                        if (isSaved) {

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


                            if (!response.ok) {

                                showToast(
                                    data.message ||
                                    "Unable to remove saved job.",
                                    "error"
                                );

                                return;

                            }


                            savedJobs =
                                savedJobs.filter(
                                    function (id) {

                                        return id !== jobId;

                                    }
                                );


                            showToast(
                                "Job removed from saved jobs.",
                                "info"
                            );

                        }


                        // ==========================
                        // SAVE JOB
                        // ==========================

                        else {

                            const response =
                                await fetch(
                                    "http://localhost:5000/api/saved-jobs",
                                    {
                                        method: "POST",

                                        headers: {

                                            "Content-Type":
                                                "application/json",

                                            "Authorization":
                                                `Bearer ${token}`

                                        },

                                        body:
                                            JSON.stringify({
                                                job_id:
                                                    jobId
                                            })

                                    }
                                );


                            const data =
                                await response.json();


                            if (!response.ok) {

                                showToast(
                                    data.message ||
                                    "Unable to save job.",
                                    "error"
                                );

                                return;

                            }


                            savedJobs.push(
                                jobId
                            );


                            showToast(
                                "Job saved successfully.",
                                "success"
                            );

                        }


                        displayJobs(
                            getCurrentFilteredJobs()
                        );

                    }

                    catch (error) {

                        console.log(
                            "SAVE JOB ERROR:",
                            error
                        );


                        showToast(
                            "Unable to connect to server.",
                            "error"
                        );

                    }

                }
            );

        }
    );

}


// ==========================================
// FILTER JOBS
// ==========================================

function getCurrentFilteredJobs() {

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
                .toLowerCase()
                .trim()
            : "";


    return allJobs.filter(
        function (job) {

            const title =
                (job.title || "")
                    .toLowerCase();


            const description =
                (job.description || "")
                    .toLowerCase();


            const jobCategory =
                (job.category || "")
                    .toLowerCase();


            const skills =
                (job.skills || "")
                    .toLowerCase();


            const requirements =
                (job.requirements || "")
                    .toLowerCase();


            const responsibilities =
                (job.responsibilities || "")
                    .toLowerCase();


            const matchesSearch =
                searchText === "" ||

                title.includes(
                    searchText
                ) ||

                description.includes(
                    searchText
                ) ||

                jobCategory.includes(
                    searchText
                ) ||

                skills.includes(
                    searchText
                ) ||

                requirements.includes(
                    searchText
                ) ||

                responsibilities.includes(
                    searchText
                );


            const matchesCategory =
                category === "" ||

                jobCategory === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        }
    );

}


// ==========================================
// SEARCH
// ==========================================

function filterJobs() {

    const filteredJobs =
        getCurrentFilteredJobs();


    displayJobs(
        filteredJobs
    );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        filterJobs
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterJobs
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterJobs
    );

}


// ==========================================
// START
// ==========================================

loadJobs();