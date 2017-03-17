import { changeCheckIn, changeCheckOut } from './dates';
import { changeProjectSelected, fetchAllProjectsIfNeeded } from './project';
import { fetchPagesIfNeeded } from './pages';

module.exports = {
    // Dates
    changeCheckIn,
    changeCheckOut,

    // Projects
    changeProjectSelected,
    fetchAllProjectsIfNeeded,

    // Pages
    fetchPagesIfNeeded
};
