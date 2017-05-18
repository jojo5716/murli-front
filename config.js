// General constants
export const dateFormat = 'YYYY-MM-DD';
export const hourMightnight = 'T00:00:00.000Z';
export const hourEndDay = 'T23:59:59.599Z';

// API URLs
const url = 'http://localhost:8000/api/v1';

export const apiURL = {
    base: url,
    getAllPages: `${url}/pages`,
    getPagesByDate: `${url}/pages/createAt/{0}/{1}/{2}`,
    getProjects: `${url}/projects`,
    createReport: `${url}/analytics/new/report/{0}`,
    getReports: `${url}/analytics/reports/{0}`
};
