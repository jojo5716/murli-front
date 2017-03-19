
export function groupBySections(navigationPages) {
    const pagesData = {
        availability: { urls: {}, total: 0, previousURL: {} },
        availabilityDestination: { urls: {}, total: 0, previousURL: {} },
        content: { urls: {}, total: 0, previousURL: {} },
        noAvailability: { urls: {}, total: 0, previousURL: {} },
        booking: { urls: {}, total: 0, previousURL: {} }
    };

    for (let navigationIndex = 0; navigationIndex < navigationPages.length; navigationIndex += 1) {
        const pages = navigationPages[navigationIndex].pages;

        for (let i = 0; i < pages.length; i += 1) {
            // Each page data
            groupBySection(pages[i], pagesData);

    }

    }

    return pagesData;
}

function groupBySection(page, pagesData) {

    const pagesDataCloned = Object.assign({}, pagesData);
    const url = page.url;
    const previousURL = page.previousURL;

    const isAvailability = url.indexOf('bookcore/availability/rooms') !== -1;
    const isAvailabilityDestination = url.indexOf('availability/hotels') !== -1;
    const isNonAvailability = url.indexOf('bookcore/no-availability') !== -1;
    const isBookingComplete = url.indexOf('booking/confirmation') !== -1;

    let sectionName = 'content';

    if (isAvailability) {
        sectionName = 'availability';
    } else if (isAvailabilityDestination) {
        sectionName = 'availabilityDestination';
    } else if (isNonAvailability) {
        sectionName = 'noAvailability';
    } else if (isBookingComplete) {
        sectionName = 'booking';
    }

    if (!pagesDataCloned[sectionName].urls[url]) {
        pagesDataCloned[sectionName].urls[url] = 0;
    }

    if (!pagesDataCloned[sectionName].previousURL[previousURL]) {
        pagesDataCloned[sectionName].previousURL[previousURL] = 0;
    }

    pagesDataCloned[sectionName].urls[url] += 1;
    pagesDataCloned[sectionName].total += 1;
    pagesDataCloned[sectionName].previousURL[previousURL] += 1;

    return pagesDataCloned;
}
