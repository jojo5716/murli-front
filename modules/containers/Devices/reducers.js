import { actions } from '../../../actions/constants';

const initialState = {
    loadingDevices: true,
    loadingDevicesPages: true,
    devicesData: [],
    devicesPagesData: []
};

export function devices(state = initialState, action = {}) {
    switch (action.type) {
        case actions.LOADING_DEVICES:
            return Object.assign({}, state, {
                loadingDevices: action.payload.loadingDevices
            });

        case actions.LOADED_DEVICES:

            return Object.assign({}, state, {
                devicesData: action.payload.devicesData
            });

        case actions.LOADING_DEVICES_PAGES:
            return Object.assign({}, state, {
                devicesPagesData: [],
                loadingDevicesPages: true
            });

        case actions.LOADED_DEVICES_PAGES:
            return Object.assign({}, state, {
                devicesPagesData: action.payload.devicesPagesData,
                loadingDevicesPages: false
            });
        default:
            return state;
    }
}
