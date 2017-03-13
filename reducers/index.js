import { combineReducers } from 'redux';

import { dateCheckIn, dateCheckOut } from './dates';
import { getPages } from './pages';
import { loadProjects } from './project';

const rootReducer = combineReducers({
    dateCheckIn,
    dateCheckOut,
    getPages,
    loadProjects
});

export default rootReducer;
