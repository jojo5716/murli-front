import _ from 'lodash';
import { getUserAgentInfo } from './devices';


export function groupBySections(navigationPages, resolve) {
    const devicesPages = {};
    const bookings = [];

    _.forEach(navigationPages, (navPage) => {
        const userAgent = getUserAgentInfo(navPage.user.dataUser.userAgent);

        const browserName = userAgent.browser.name;
        const osName = userAgent.os.name;
        const osVersion = userAgent.os.version;

        initializeDeviceTree(userAgent, devicesPages);
        _.forEach(navPage.pages, (page) => {
            const deviceTree = devicesPages[browserName][osName][osVersion];
            const section = detectSectionForURL(page.url);

            if (section === 'booking') {
                _.forEach(navPage.user.bookings, (booking) => {
                    if (booking.bookingStatus === 'CONF') {
                        if (!bookings.includes(booking.bookingCode)) {
                            groupBySection(page.url, section, deviceTree);
                        }
                        bookings.push(booking.bookingCode);
                    }
                });
            } else {
                groupBySection(page.url, section, deviceTree);
            }
        });
    });

    resolve(devicesPages);
}

function initializeDeviceTree(userAgent, devicesPages) {
    const browserName = userAgent.browser.name;
    const osName = userAgent.os.name;
    const osVersion = userAgent.os.version;

    if (!devicesPages[browserName]) {
        devicesPages[browserName] = {};
    }

    if (!devicesPages[browserName][osName]) {
        devicesPages[browserName][osName] = {};
    }

    if (!devicesPages[browserName][osName][osVersion]) {
        devicesPages[browserName][osName][osVersion] = {};
    }
}

function detectSectionForURL(url) {
    const sections = {
        availability: 'bookcore/availability/rooms',
        availabilityDestination: 'availability/hotels',
        noAvailability: 'bookcore/no-availability',
        booking: 'booking/confirmation'
    };

    let urlSection = 'content';

    Object.keys(sections).map((section) => {
        if (url.indexOf(sections[section]) !== -1) {
            urlSection = section;
        }
    });

    return urlSection;
}


function groupBySection(url, section, devicesPages) {

    if (!devicesPages[section]) {
        devicesPages[section] = {};
    }

    if (!devicesPages[section][url]) {
        devicesPages[section][url] = 0;
    }

    devicesPages[section][url] += 1;

    return devicesPages;
}


export function getSectionsVisits(devicesPages) {
    const sections = {
        content: { devices: {}, total: 0 },
        availability: { devices: {}, total: 0 },
        noAvailability: { devices: {}, total: 0 },
        booking: { devices: {}, total: 0 }
    };

    _.forEach(Object.keys(devicesPages), (device) => {
        _.forEach(Object.keys(devicesPages[device]), (os) => {
            _.forEach(Object.keys(devicesPages[device][os]), (version) => {
                _.forEach(Object.keys(devicesPages[device][os][version]), (section) => {
                    if (!sections[section].devices[device]) {
                        sections[section].devices[device] = {};
                    }

                    if (!sections[section].devices[device][os]) {
                        sections[section].devices[device][os] = 0;
                    }

                    const sectionsDevice = devicesPages[device][os][version][section];
                    const totalURLVisits = Object.values(sectionsDevice).reduce((a, b) => a + b, 0);
                    sections[section].total += totalURLVisits;
                    sections[section].devices[device][os] += totalURLVisits;
                });
            });
        });
    });

    return sections;

}
