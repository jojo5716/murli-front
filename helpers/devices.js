import parser from 'user-agent-parser';

import { generateColor } from './utils';

module.exports = {
    generateColorsToPie,
    devicePercentTraffic,
    groupPagesByDevices,
    getVisitFromPages,
    getOSNameFromPages
};


/**
 * Generate colors hexadecimals
 *
 * @param {int} length
 * @returns {array} colors
 */
function generateColorsToPie(length) {
    const colors = [];

    for (let i = 0; i < length; i += 1) {
        colors.push(generateColor());
    }

    return colors;
}

/**
 * Generate object with visits and percent by devices
 *
 * @param {Array} pages
 * @param {Array} visits
 * @returns {Array} percent of visits by devices
 */
function devicePercentTraffic(pages, visits) {
    const data = [];
    const total = visits.reduce((a, b) => a + b, 0);

    for (const name in pages) {
        const device = pages[name];
        const valueInPercent = (device.browser.visits * 100) / total;

        data.push({
            name,
            visits: device.browser.visits,
            percent: parseFloat(valueInPercent).toFixed(2)
        });
    }

    return data;
}

function groupPagesByDevices(navigationPages = []) {
    const devices = {};

    for (let navigationIndex = 0; navigationIndex < navigationPages.length; navigationIndex += 1) {
        const navigationPage = navigationPages[navigationIndex];
        const pages = navigationPage.pages;
        const user = navigationPage.user;

        for (let i = 0; i < pages.length; i += 1) {
            const userAgentData = parser(user.dataUser.userAgent);
            const deviceBrowserName = userAgentData.browser.name || 'Unknown';
            const deviceOSName = userAgentData.os.name || 'Unknown';
            const deviceOSVersion = userAgentData.os.version || 'Unknown';

            if (!devices[deviceBrowserName]) {
                devices[deviceBrowserName] = {
                    browser: {
                        visits: 0
                    },
                    os: {
                        names: {}
                    }
                };
            }

            if (!devices[deviceBrowserName].os.names[deviceOSName]) {
                devices[deviceBrowserName].os.names[deviceOSName] = {
                    versions: new Set(),
                    visits: 0,
                    bookings: []
                };
            }

            devices[deviceBrowserName].browser.visits += 1;
            devices[deviceBrowserName].os.names[deviceOSName].visits += 1;
            devices[deviceBrowserName].os.names[deviceOSName].versions.add(deviceOSVersion);

            if (navigationPage.bookings.length > 0) {
                devices[deviceBrowserName].os.names[deviceOSName].bookings.push(navigationPage.bookings);
            }
        }
    }

    return devices;
}

function getVisitFromPages(pages) {
    const visits = [];
    for (const page in pages) {
        visits.push(pages[page].browser.visits);
    }
    return visits;
}

function getOSNameFromPages(pages) {
    const osNames = {};

    for (const page in pages) {
        const names = pages[page].os.names;

        for (const osName in names) {
            if (!osNames[osName]) {
                osNames[osName] = 0;
            }
            osNames[osName] += names[osName].visits;
        }
    }
    return osNames;
}
