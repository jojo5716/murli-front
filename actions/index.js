import { actions } from './constants';

function changeCheckIn(date) {
    return {
        type: actions.changeCheckIn,
        payload: {
            date
        }
    };
}

function changeCheckOut(date) {
    return {
        type: actions.changeCheckOut,
        payload: {
            date
        }
    };
}

module.exports = {
    changeCheckIn,
    changeCheckOut
};
