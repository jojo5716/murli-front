import moment from 'moment';

import { actions } from '../actions/constants';
import { getDateFormat } from '../helpers/dates';

const today = moment();
const oneMonthAgo = moment(today).subtract(1, 'months');

const initialStateCheckIn = { date: today.format('YYYY-MM-DD') };
const initialStateCheckOut = { date: oneMonthAgo.format('YYYY-MM-DD') };

export function dateCheckIn(state = initialStateCheckIn, action = {}) {
    switch (action.type) {
        case actions.changeCheckIn:
            return { date: action.payload.date };
        default:
            return state;
    }
}

export function dateCheckOut(state = initialStateCheckOut, action = {}) {
    switch (action.type) {
        case actions.changeCheckOut:
            return { date: action.payload.date };
        default:
            return state;
    }
}
