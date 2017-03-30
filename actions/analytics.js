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

function retrievingReports() {
    return {
        type: actions.ANALYTICS_RETRIEVING_REPORTS
    };
}

function retrievedReports() {
    return {
        type: actions.ANALYTICS_RETREIVED_REPORTS
    };
}

function loadReports(reports) {
    return {
        type: actions.ANALYTICS_LOAD_REPORTS,
        payload: {
            reports: reports.reportsProject
        }
    };
}

function fetchingData() {
    return {
        type: actions.ANALYTICS_IS_FETCHING
    };
}

function fetchingDataComplete() {
    return {
        type: actions.ANALYTICS_IS_FETCHING_DONE
    };
}

function saveDataFromReport(data) {
    return {
        type: actions.ANALYTICS_REPORT_DATA,
        payload: {
            reportData: data
        }
    };
}

// Actions

// Analytics data

const retreiveReports = () => (dispatch, getState) => {
    const state = getState();
    const url = replaceParams(apiURL.getReports, [state.getProjects.projectSelected]);
    dispatch(retrievingReports());

    return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then((response) => {
            dispatch(retrievedReports());
            dispatch(loadReports(response));
        })
        .catch(err => { console.log(err); });


};

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
                    dispatch(retreiveReports());
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

const retreiveReportsIfNeeded = () => (dispatch, getState) => {
    const state = getState();

    if (shouldcreateReport(state)) {
        return dispatch(retreiveReports());
    }
};

const getDataFromAPI = (state) => (dispatch) => {
    if (state.getProjects.projectSelected) {
        dispatch(fetchingData());

    }
};


const retreiveDataFromAPI = (data) => (dispatch, getState) => {
    return dispatch(getDataFromAPI());
};

//  Analytics data


module.exports = {
    creatingReport,
    createdReport,
    createReportIfNeeded,
    retrievingReports,
    retrievedReports,
    loadReports,
    retreiveReportsIfNeeded,
    fetchingData,
    fetchingDataComplete,
    retreiveDataFromAPI,
    saveDataFromReport
};
