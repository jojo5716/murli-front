import { combineReducers } from 'redux';

import { dateCheckIn, dateCheckOut } from './dates';
import { getPages } from './pages';

const rootReducer = combineReducers({
    dateCheckIn,
    dateCheckOut,
    getPages
});

export default rootReducer;
