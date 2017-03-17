import 'isomorphic-fetch';

import { actions } from './constants';
import { replaceParams } from '../helpers/apiURL';
import { apiURL } from '../config';

function changePages(navigationPages) {
    return {
        type: actions.CHANGE_PAGES,
        payload: {
            navigationPages
        }
    };
}

const shouldFetchPages = (state) => {
    let shouldFetch = false;

    if (state.getProjects.projectSelected) {
        shouldFetch = true;
    }

    return shouldFetch;
};

const fetchPages = (state) => (dispatch) => {
    const checkIn = state.getDates.checkIn;
    const checkOut = state.getDates.checkOut;

    if (state.getProjects.projectSelected) {
        const url = replaceParams(apiURL.getPagesByDate, [checkIn, checkOut, state.getProjects.projectSelected]);

        return fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(response => response.json()
            .then(json => dispatch(changePages(json.navigationPages))));
    }

};

const fetchPagesIfNeeded = () => (dispatch, getState) => {
    const state = getState();

    if (shouldFetchPages(state)) {
        return dispatch(fetchPages(state));
    }
};

module.exports = {
    changePages,
    fetchPagesIfNeeded
};
