// CHANGE TO

const API_URL = "https://freelancerworks-production.up.railway.app/api";


// Get all jobs

export async function getJobs() {

    const response = await fetch(
        `${API_URL}/jobs`
    );


    if (!response.ok) {

        throw new Error(
            "Failed to load jobs"
        );

    }


    const data =
        await response.json();


    return data.jobs;

}