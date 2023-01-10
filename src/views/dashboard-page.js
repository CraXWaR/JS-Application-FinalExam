import { getJobs } from "../api/jobs.js";
import { html } from "../lib.js";

const dashboardTemp = (jobs) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
    ${jobs.length == 0 ? html`<h2>No offers yet.</h2>`
        : jobs.map(jobsCard)}
</section>`;

const jobsCard = (job) => html`
<div class="offer">
    <img src=${job.imageUrl} alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${job.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
    <a class="details-btn" href="/dashboard/${job._id}">Details</a>
</div>`

export async function dashboardView(ctx) {
    const jobs = await getJobs();

    ctx.render(dashboardTemp(jobs))
}