import moment from 'moment';

function getDateFormat(date, hours = 'T00:00:00.000Z') {
    const dateAtMidnight = moment(date, 'YYYY-MM-DD');

    return `${dateAtMidnight.format('YYYY-MM-DD')}${hours}`;
}

module.exports = {
    getDateFormat
};
