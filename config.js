// General constants
export const dateFormat = 'YYYY-MM-DD';
export const hourMightnight = 'T00:00:00.000Z';
export const hourEndDay = 'T23:59:59.599Z';

// API URLs
const url = 'http://qa.roiback.com:8000';
export const apiURL = {
    base: url,
    getAllPages: `${url}/pages`,
    getPagesByDate: `${url}/pages/createAt/{0}/{1}`,
    getProjects: `${url}/projects`
};
