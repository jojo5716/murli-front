import 'isomorphic-fetch';
import { actions } from './constants';
import { apiURL } from '../config';
import { replaceParams } from '../helpers/apiURL';

import { loadingComponents, loadedComponents } from './components';

// Actions
function creatingReport() {
    return {
        type: actions.ANALYTICS_CREATING_REPORT
    };
}

function createdReport() {
    return {
        type: actions.ANALYTICS_CREATED_REPORT
    };
}


// Actions


// Analytics data
const shouldcreateReport = (state) => {
    let shouldFetch = true;

    return shouldFetch;
};

const createReport = (reportData, state) => (dispatch) => {
    if (state.getProjects.projectSelected) {
        dispatch(loadingComponents());
        const url = replaceParams(apiURL.createReport, [state.getProjects.projectSelected]);

        return fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ reportData }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch(loadedComponents());
                }
            })
            .catch(err => { console.log(err); });

    }
};

const createReportIfNeeded = reportData => (dispatch, getState) => {
    const state = getState();

    if (shouldcreateReport(state)) {
        return dispatch(createReport(reportData, state));
    }
};
//  Analytics data


module.exports = {
    creatingReport,
    createdReport,
    createReportIfNeeded
};
