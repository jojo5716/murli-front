import _ from 'lodash';

const sankeyData = {
    nodes: [
        [
            {
                id: 'Availability'
            },
            {
                id: 'No availability'
            }
        ],
        [
            {
                id: 'Booking'
            },
            {
                id: 'Exit'
            }
        ]
    ],
    links: []
};

const availabilityPage = 'bookcore/availability/rooms';
const noAvailabilityPage = 'bookcore/no-availability';
const bookingsData = {
    availabilityToBooking: {
        pages: 0,
        bookings: 0
    },
    noAvailabilityToBookin: {
        pages: 0,
        bookings: 0
    },
    availabilityToExit: 0,
    noAvailabilityToExit: 0
};

export function sankeyChart(navigationPages) {

    _.forEach(navigationPages, (navPage) => {
        const withBooking = navPage.bookings.length;
        let availabilityTime = 0;
        let noAvailabilityTime = 0;

        _.forEach(navPage.pages, (page) => {
            if (page.url.indexOf(availabilityPage) !== -1) {
                availabilityTime += 1;
            }

            if (page.url.indexOf(noAvailabilityPage) !== -1) {
                noAvailabilityTime += 1;
            }

        });

        if (noAvailabilityTime > 0) {
            sankeyData.links.push({
                start: 'No availability',
                end: withBooking > 0 ? 'Booking' : 'Exit',
                weight: withBooking > 0 ? withBooking : noAvailabilityTime
            });
        } else if (availabilityTime > 0) {
            sankeyData.links.push({
                start: 'Availability',
                end: withBooking > 0 ? 'Booking' : 'Exit',
                weight: withBooking > 0 ? withBooking : availabilityTime
            });
        }
    });

    return sankeyData;
}
