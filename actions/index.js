import { actions } from './constants';

function changeCheckIn(date) {
    return {
        type: actions.changeCheckIn,
        payload: {
            date
        }
    };
}

function changeCheckOut(date) {
    return {
        type: actions.changeCheckOut,
        payload: {
            date
        }
    };
}

function changePages(pages) {
    return {
        type: actions.changePages,
        payload: {
            pages
        }
    };
}

function loadProjects(projects) {
    return {
        type: actions.loadProjects,
        payload: {
            projects
        }
    };
}

function changeProject(projectSelected) {
    return {
        type: actions.changeProject,
        payload: {
            projectSelected
        }
    };
}

function loadingPage(loading = false) {
        return {
            type: actions.loadingPage,
            payload: {
                loading
            }
        };
}

module.exports = {
    changeCheckIn,
    changeCheckOut,
    changePages,
    loadProjects,
    changeProject,
    loadingPage
};
