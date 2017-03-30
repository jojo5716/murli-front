import { combineReducers } from 'redux';

import { getDates } from './dates';
import { getPages } from './pages';
import { getProjects } from './project';
import { components } from './components';

import { devices } from './devices';
import { analytics } from './analytics';

const rootReducer = combineReducers({
    getDates,
    getPages,
    getProjects,
    components,
    devices,
    analytics
});

export default rootReducer;
