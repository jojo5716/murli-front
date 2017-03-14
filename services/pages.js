import 'isomorphic-fetch';
import { replaceParams } from '../helpers/apiURL';
import { apiURL } from '../config';

function getPagesByDate(checkIn, checkOut, projectToken) {
    const url = replaceParams(apiURL.getPagesByDate, [checkIn, checkOut, projectToken]);

    return fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => {
        return response.json();
    });
}

module.exports = {
    getPagesByDate
};
