const API_URL = "http://localhost:5000/api";


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