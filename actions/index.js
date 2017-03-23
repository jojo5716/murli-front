import { changeCheckIn, changeCheckOut } from './dates';
import { changeProjectSelected, fetchAllProjectsIfNeeded } from './project';
import { fetchPagesIfNeeded, formatDevicesIfNeeded, formatDevicesPagesIfNeeded, loadingDevices } from '../modules/containers/Devices/actions';
import { loadingComponents, loadedComponents } from './components';

module.exports = {
    // Dates
    changeCheckIn,
    changeCheckOut,

    // Projects
    changeProjectSelected,
    fetchAllProjectsIfNeeded,

    // Devices
    fetchPagesIfNeeded,
    formatDevicesIfNeeded,
    formatDevicesPagesIfNeeded,
    loadingDevices,

    // Components
    loadingComponents,
    loadedComponents
};
