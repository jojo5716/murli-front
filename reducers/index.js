import { combineReducers } from 'redux';

import { getDates } from './dates';
import { getPages } from './pages';
import { getProjects } from './project';
import { components } from './components';

const rootReducer = combineReducers({
    getDates,
    getPages,
    getProjects,
    components
});

export default rootReducer;
