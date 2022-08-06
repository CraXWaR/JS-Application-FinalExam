import { del, get, post, put } from "./api.js";

export async function getJobs() {
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function createJob(job) {
    return post('/data/offers', job);
}

export async function getJobDetails(id) {
    return get('/data/offers/' + id);
}

export async function deleteJob(id) {
    return del('/data/offers/' + id)
}

export async function updateJob(id, job) {
    return put('/data/offers/' + id, job);
}