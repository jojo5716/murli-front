import { combineReducers } from 'redux';

import { getDates } from './dates';
import { getPages } from './pages';
import { getProjects } from './project';

const rootReducer = combineReducers({
    getDates,
    getPages,
    getProjects
});

export default rootReducer;
