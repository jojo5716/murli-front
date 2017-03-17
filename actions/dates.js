import 'isomorphic-fetch';

import { actions } from './constants';
import { replaceParams } from '../helpers/apiURL';
import { apiURL } from '../config';

function changeCheckIn(date) {
    return {
        type: actions.CHANGE_CHECKING,
        payload: {
            date
        }
    };
}

function changeCheckOut(date) {
    return {
        type: actions.CHANGE_CHECKOUT,
        payload: {
            date
        }
    };
}

module.exports = {
    changeCheckIn,
    changeCheckOut
};
