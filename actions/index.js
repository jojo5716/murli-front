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

function changePages(pages) {
    return {
        type: actions.changePages,
        payload: {
            pages
        }
    };
}

module.exports = {
    changeCheckIn,
    changeCheckOut,
    changePages
};
