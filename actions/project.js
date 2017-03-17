import 'isomorphic-fetch';

import { actions } from './constants';
import { apiURL } from '../config';


function changeProjectSelected(payload) {
    return {
        type: actions.CHANGE_PROJECT,
        payload
    };
}

function requestProjects() {
    return {
        type: actions.REQUEST_PROJECTS,
        payload: {
            projects: []
        }
    };
}

function receiveProjects(json) {
    return {
        type: actions.RECEIVE_PROJECTS,
        payload: {
            projects: json,
            receivedAt: Date.now()
        }
    };
}

const fetchProjects = () => (dispatch) => {
    dispatch(requestProjects());

    return fetch(apiURL.getProjects, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveProjects(json.projects)));
};

const shouldFetchProjects = (state) => {
    let shouldFetch = false;
    if (state.getProjects.projects.length === 0) {
        shouldFetch = true;
    }

    return shouldFetch;
};

const fetchAllProjectsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchProjects(getState())) {
        return dispatch(fetchProjects(dispatch));
    }
};

module.exports = {
    changeProjectSelected,
    requestProjects,
    receiveProjects,
    fetchAllProjectsIfNeeded
};
