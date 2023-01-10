import { getJobDetails, updateJob } from "../api/jobs.js";
import { html } from "../lib.js";

const editTemp = (job, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Offer</h2>
    <form @submit=${onSubmit} class="edit-form">
        <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        value=${job.title}>
        <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        value=${job.imageUrl}>
        <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        value=${job.category}>
        <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
        >${job.description}</textarea>
        <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
        >${job.requirements}</textarea>
        <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        value=${job.salary}>

        <button type="submit">post</button>
    </form>
    </div>
</section>`;

export async function editView(ctx) {
    const job = await getJobDetails(ctx.params.id);

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const job = {
            title: formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            requirements: formData.get('requirements'),
            salary: formData.get('salary')
        }
        console.log(job);

        if (job.title == '' || job.imageUrl == '' || job.category == '' || job.description == '' || job.requirements == '' || job.salary == '') {
            return alert('All field are required!');
        }

        await updateJob(ctx.params.id, job);
        e.target.reset();
        ctx.page.redirect('/dashboard/' + ctx.params.id);
    }

    ctx.render(editTemp(job, onSubmit));
}