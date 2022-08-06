import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { logout } from './api/users.js';
import { loginView } from './views/login-page.js';
import { registerView } from './views/register-page.js';
import { dashboardView } from './views/dashboard-page.js';
import { createView } from './views/create-page.js';
import { jobDetails } from './views/offerDetails-page.js';
import { editView } from './views/edit-page.js';

const main = document.querySelector('main');

document.getElementById('logout').addEventListener('click', onLogout);

page(decoratePage);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/dashboard/:id', jobDetails);
page('/edit/:id', editView);

updateNav();
page.start();

function decoratePage(ctx, next) {
    ctx.render = renderMainPage;
    ctx.updateNav = updateNav;

    next();
}

function renderMainPage(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/dashboard')
}