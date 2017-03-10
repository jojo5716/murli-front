import 'isomorphic-fetch';
import { replaceParams } from '../helpers/apiURL';
import { apiURL } from '../config';

function getPagesByDate(checkIn, checkOut) {
    const url = replaceParams(apiURL.getPagesByDate, [checkIn, checkOut]);

    return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
}

module.exports = {
    getPagesByDate
};
