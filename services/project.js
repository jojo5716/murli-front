import 'isomorphic-fetch';
import { apiURL } from '../config';

function getProjects() {

    return fetch(apiURL.getProjects, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.json());
}

module.exports = {
    getProjects
};
