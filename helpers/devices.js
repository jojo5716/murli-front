import parser  from 'user-agent-parser';

import { generateColor } from './utils';

export function generateColorsToPie(length) {
    const colors = [];

    for (let i = 0; i < length; i += 1) {
        colors.push(generateColor());
    }

    return colors;
}

export function devicePercentTraffic(pages, visits) {
    const data = [];
    const total = visits.reduce((a, b) =>  a + b, 0);

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

export function getAllDevices(pages) {
    const devices = {};

    for (let i = 0; i < pages.length; i += 1) {
        const user = pages[i].user || {};
        const userAgentData = parser(user.dataUser.userAgent);

        const deviceBrowserName = userAgentData.browser.name || 'Unknown';
        const deviceBrowserVersion = userAgentData.browser.version || '0.0.0';
        const deviceOSName = userAgentData.os.name;
        const deviceOSVersion = userAgentData.os.version;

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

        if(!devices[deviceBrowserName].os.names[deviceOSName]) {
            devices[deviceBrowserName].os.names[deviceOSName] = {
                versions: new Set(),
                visits: 0,
                bookings: []
            };
        }

        devices[deviceBrowserName].browser.visits += 1;
        devices[deviceBrowserName].os.names[deviceOSName].visits += 1;
        devices[deviceBrowserName].os.names[deviceOSName].versions.add(deviceOSVersion);

        if (user.bookings.length > 0) {
            devices[deviceBrowserName].os.names[deviceOSName].bookings.push(user.bookings);
        }

    }
    return devices;
}

export function getVisitFromPages(pages) {
    const visits = [];
    for (const page in pages) {
        visits.push(pages[page].browser.visits);
    }
    return visits;
}

export function getOSNameFromPages(pages) {
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
