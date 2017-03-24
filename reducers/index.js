import { combineReducers } from 'redux';

import { getDates } from './dates';
import { getPages } from './pages';
import { getProjects } from './project';
import { components } from './components';

import { devices } from './devices';

const rootReducer = combineReducers({
    getDates,
    getPages,
    getProjects,
    components,
    devices
});

export default rootReducer;
