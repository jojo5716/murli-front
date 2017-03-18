import { changeCheckIn, changeCheckOut } from './dates';
import { changeProjectSelected, fetchAllProjectsIfNeeded } from './project';
import { fetchPagesIfNeeded } from './pages';
import { loadingComponents, loadedComponents } from './components';

module.exports = {
    // Dates
    changeCheckIn,
    changeCheckOut,

    // Projects
    changeProjectSelected,
    fetchAllProjectsIfNeeded,

    // Pages
    fetchPagesIfNeeded,

    // Components
    loadingComponents,
    loadedComponents
};
