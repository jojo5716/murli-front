import { changeCheckIn, changeCheckOut } from './dates';
import { changeProjectSelected, fetchAllProjectsIfNeeded } from './project';
import { fetchPagesIfNeeded, formatDevicesIfNeeded, formatDevicesPagesIfNeeded, loadingDevices } from './devices';
import { loadingComponents, loadedComponents } from './components';
import {
    creatingReport,
    createdReport,
    createReportIfNeeded,
    retreiveReports,
    retreiveReportsIfNeeded,
    retreiveDataFromAPI,
    saveDataFromReport
} from './analytics';


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
    loadedComponents,

    // Analytics
    creatingReport,
    createdReport,
    createReportIfNeeded,
    retreiveReports,
    retreiveReportsIfNeeded,
    retreiveDataFromAPI,
    saveDataFromReport
};
