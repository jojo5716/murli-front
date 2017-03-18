import 'isomorphic-fetch';

import { actions } from './constants';

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
