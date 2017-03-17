import moment from 'moment';
import { dateFormat } from '../config';

import { actions } from '../actions/constants';
import initialState from './initialState';


export function getDates(state = initialState.dates, action = {}) {
    switch (action.type) {
        case actions.CHANGE_CHECKING:
            return Object.assign({}, state, {
                checkIn: action.payload.date
            });

        case actions.CHANGE_CHECKOUT:
            return Object.assign({}, state, {
                checkOut: action.payload.date
            });

        default:
            return state;
    }
}
