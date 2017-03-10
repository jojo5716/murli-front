import moment from 'moment';
import { dateFormat } from '../config';

import { actions } from '../actions/constants';
import { getDateFormat } from '../helpers/dates';

const today = moment();
const oneMonthAgo = moment(today).subtract(1, 'months');

const initialStateCheckIn = { date: today.format(dateFormat) };
const initialStateCheckOut = { date: oneMonthAgo.format(dateFormat) };

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
