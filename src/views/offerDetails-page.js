import { deleteJob, getJobDetails } from "../api/jobs.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemp = (job, owner, onDelete, onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${job.imageUrl} alt="example1" />
        <p id="details-title">${job.title}</p>
        <p id="details-category">
            Category: <span id="categories">${job.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${job.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
            <h4>Description</h4>
            <span>${job.description}</span>
            </div>
            <div id="details-requirements">
            <h4>Requirements</h4>
            <span>${job.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>
        
        ${owner ? html`
        <div id="action-buttons">
            <a href=/edit/${job._id} id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>` : html`
        <div id="action-buttons">
        <!--Bonus - Only for logged-in users ( not authors )-->
            <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>
        </div>`}
        
    </div>
</section>`;

export async function jobDetails(ctx) {
    const job = await getJobDetails(ctx.params.id);
    const userData = getUserData();
    const owner = userData?.id == job._ownerId;

    async function onDelete() {
        const choice = confirm('Are u sure u want to delist this job?');

        if (choice) {
            await deleteJob(ctx.params.id)
            ctx.page.redirect('/dashboard')
        }
    }

    let applications = 0;

    function onApply() {
        applications++
        document.getElementById('apply-btn').style.display = 'none';
        document.getElementById('applications').textContent = applications;
    }

    ctx.render(detailsTemp(job, owner, onDelete, onApply))
}