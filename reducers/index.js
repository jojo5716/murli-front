import { combineReducers } from 'redux';

import { dateCheckIn, dateCheckOut } from './dates';

const rootReducer = combineReducers({
    dateCheckIn,
    dateCheckOut
});

export default rootReducer;
