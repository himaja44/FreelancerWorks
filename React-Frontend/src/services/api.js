export async function getJobs() {

    const response = await fetch(
        "http://localhost:5000/api/jobs"
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Unable to load jobs."
        );

    }

    return data.jobs || [];

}