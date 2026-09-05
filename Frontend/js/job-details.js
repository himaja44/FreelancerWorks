const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);

document.getElementById("navUser").textContent =
    user.email || "User";

document.getElementById("logout").addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        showToast(
            "Logged out successfully.",
            "success"
        );

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);

    }
);

const params =
    new URLSearchParams(window.location.search);

const jobId =
    params.get("id");

console.log("JOB ID FROM URL:", jobId);

const jobDetails =
    document.getElementById("jobDetails");


async function loadJob() {

    if (!jobId) {

        jobDetails.innerHTML = `
            <div class="job-details-container">
                <p>Job ID is missing.</p>
            </div>
        `;

        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/jobs/${jobId}`
        );

        const data =
            await response.json();

        console.log("JOB RESPONSE:", data);

        if (!response.ok) {

            jobDetails.innerHTML = `
                <div class="job-details-container">
                    <p>${data.message}</p>
                </div>
            `;

            return;
        }

        const job = data.job;

        const skills =
            job.skills
                ? job.skills.split(",")
                : [];


        jobDetails.innerHTML = `

            <div class="job-details-container">

                <section class="job-details-header">

                    <span class="job-details-category">
                        ${job.category}
                    </span>

                    <h1>
                        ${job.title}
                    </h1>

                    <span class="job-details-type">
                        ${job.job_type}
                    </span>

                </section>


                <section class="job-details-content">

                    <div class="job-description-card">

                        <h2>
                            Job Description
                        </h2>

                        <p>
                            ${job.description || "No description provided."}
                        </p>


                        <h2 class="details-heading">
                            Requirements
                        </h2>

                        <p>
                            ${job.requirements || "No requirements provided."}
                        </p>


                        <h2 class="details-heading">
                            Responsibilities
                        </h2>

                        <p>
                            ${job.responsibilities || "No responsibilities provided."}
                        </p>


                        <h2 class="details-heading">
                            Required Skills
                        </h2>

                        <div class="details-skills">

                            ${skills.map(function (skill) {

                                return `
                                    <span>
                                        ${skill.trim()}
                                    </span>
                                `;

                            }).join("")}

                        </div>

                    </div>

                </section>

            </div>

        `;


       document.getElementById(
    "applyButton"
).addEventListener(
    "click",
    function () {

        window.location.href =
            `apply.html?id=${jobId}`;

    }
);


        document.getElementById(
            "saveJobButton"
        ).addEventListener(
            "click",
            function () {

                showToast(
                    "Job saved successfully.",
                    "success"
                );

            }
        );

    }

    catch (error) {

        console.log(
            "Job details error:",
            error
        );

        jobDetails.innerHTML = `
            <div class="job-details-container">
                <p>
                    Unable to load job details.
                </p>
            </div>
        `;

    }

}


loadJob();