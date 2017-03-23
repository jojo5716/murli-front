import 'isomorphic-fetch';
import { actions } from '../../../actions/constants';
import { replaceParams } from '../../../helpers/apiURL';
import { apiURL } from '../../../config';

import { groupPagesByDevices } from '../../../helpers/devices';
import { groupBySections } from '../../../helpers/pages';
import { loadingComponents, loadedComponents } from '../../../actions/components';

// Actions
function changePages(navigationPages) {
    return {
        type: actions.CHANGE_PAGES,
        payload: {
            navigationPages
        }
    };
}

function loadingDevices(loadingDevices = true) {
    return {
        type: actions.LOADING_DEVICES,
        payload: {
            loadingDevices
        }
    };
}

function loadedDevices(devicesData) {

    return {
        type: actions.LOADED_DEVICES,
        payload: {
            devicesData
        }
    };
}

function loadedDevicesPages(devicesPagesData) {

    return {
        type: actions.LOADED_DEVICES_PAGES,
        payload: {
            devicesPagesData
        }
    };
}

// Actions

// Devices
const formatDevices = state => (dispatch) => {
    const pages = state.getPages.navigationPages;

    if (state.getProjects.projectSelected) {
        if (pages.length > 0) {
            new Promise(groupPagesByDevices.bind(this, pages))

            .then(devicesData => {
                dispatch(loadedDevices(devicesData));
            })
            .then(() => {
                dispatch(loadingDevices(false));
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
};

const shouldFormatDevices = state => {
    let shouldFormat = false;

    if (state.getPages.navigationPages) {
        shouldFormat = true;
    }

    return shouldFormat;
};

const formatDevicesIfNeeded = () => (dispatch, getState) => {
    const state = getState();

    if (shouldFormatDevices(state)) {
        return dispatch(formatDevices(state));
    }
};
// Devices

// Pages
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
    dispatch(loadingComponents());

    if (state.getProjects.projectSelected) {
        const url = replaceParams(apiURL.getPagesByDate, [checkIn, checkOut, state.getProjects.projectSelected]);

        return fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json => dispatch(changePages(json.navigationPages)))
        .then(dispatch(loadedComponents()));
    }
};

const fetchPagesIfNeeded = () => (dispatch, getState) => {
    const state = getState();

    if (shouldFetchPages(state)) {
        return dispatch(fetchPages(state));
    }
};
// Pages

// Devices per page
const formatDevicesPages = (state) => (dispatch) => {
    const pages = state.getPages.navigationPages;

    if (state.getProjects.projectSelected) {
        if (pages.length > 0) {
            new Promise(groupBySections.bind(this, pages)).then(devicesPagesData => {
                dispatch(loadedDevicesPages(devicesPagesData));
            }).catch(err => {
                console.log(err);
            });
        }
    }

};

const shouldFormatDevicesPages = (state) => {
    let shouldFormat = false;

    if (state.devices.devicesPagesData) {
        shouldFormat = true;
    }

    return shouldFormat;
};

const formatDevicesPagesIfNeeded = () => (dispatch, getState) => {
    const state = getState();

    if (shouldFormatDevicesPages(state)) {
        return dispatch(formatDevicesPages(state));
    }
};
// Devices per page

module.exports = {
    changePages,
    loadingDevices,
    loadedDevices,
    fetchPagesIfNeeded,
    formatDevicesIfNeeded,
    formatDevicesPagesIfNeeded,
    shouldFetchPages
};
