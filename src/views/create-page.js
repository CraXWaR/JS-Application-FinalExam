import { createJob } from "../api/jobs.js";
import { html } from "../lib.js";

const createTemp = (onSubmit) => html`
<section id="create">
    <div class="form">
    <h2>Create Offer</h2>
    <form @submit=${onSubmit} class="create-form">
        <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        />
        <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        />
        <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        />
        <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
        ></textarea>
        <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
        ></textarea>
        <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>
`;

export function createView(ctx) {
    
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
       
        if (job.title == '' || job.imageUrl == '' || job.category == '' || job.description == '' || job.requirements == '' || job.salary == '') {
            console.log(job);
            return alert('All field are required!');
        }

        await createJob(job);
        e.target.reset();
        ctx.page.redirect('/dashboard');
    }
    ctx.render(createTemp(onSubmit));
}