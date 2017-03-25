import _ from 'lodash';
import moment from 'moment';

function bookingsToJSON(bookings) {
    return _.forEach(bookings, (booking) => {
        const rooms = booking.rooms ? booking.rooms.replace(/&quot;/g,'"') : null;
        booking.rooms = JSON.parse(rooms);
    });
}

export function usersWithBookings(navigationPages) {
    const bookingsRegistered = [];

    const rooms = _.filter(navigationPages, (navPage) => {
        if (navPage.user.bookings.length > 0) {

            const bookings = _.filter(navPage.user.bookings, (booking) => {
                if (booking.bookingStatus === 'CONF' && !(bookingsRegistered.includes(booking.bookingCode))) {
                    bookingsRegistered.push(booking.bookingCode);
                    return booking;
                }
            });

            if (bookings.length > 0) {
                navPage.user.bookings = bookingsToJSON(bookings);
                return navPage;
            }

        }
    });

    return rooms;
}



function saveBookingMetric(metric, key, total, bookings) {
    if (!bookings[metric][key]) {
        bookings[metric][key] = { total: 0, quantity: 0 };
    }

    bookings[metric][key].total += total;
    bookings[metric][key].quantity += 1;
}

export function formatBookings(navPages) {
    const bookings = {
        totalAmount: 0,
        totalBookings: 0,
        totalRooms: 0,
        rooms: {},
        countries: {},
        boards: {},
        occupancies: {},
        rates: {},
        days: {},
        info: []
    };

    _.forEach(navPages, (navPage) => {
        _.forEach(navPage.user.bookings, (booking) => {
            bookings.totalBookings += 1;

            if (booking.rooms) {
                _.forEach(booking.rooms, (room) => {
                    const total = room.amount;
                    const createAt = moment(navPage.user.createAt).format('YYYY-MM-DD');
                    bookings.totalAmount += total;
                    bookings.totalRooms += 1;
                    // saveRoom(room, bookings);
                    saveBookingMetric('rooms', room.roomCode, total, bookings);
                    saveBookingMetric('boards', room.boardCode, total, bookings);
                    saveBookingMetric('rates', room.rateCode, total, bookings);
                    saveBookingMetric('occupancies', room.occupancyCode, total, bookings);

                    saveBookingMetric('days', createAt, total, bookings);
                    saveBookingMetric('countries', navPage.user.country, total, bookings);
                });
            }
        });
    });

    return bookings;
}


export function chartMetric(header, bookingsInfo, metricKey, isAmount = false) {
    const metricData = [header];

    _.forEach(Object.keys(bookingsInfo[metricKey]), (metric) => {
        const metricObj = bookingsInfo[metricKey][metric];
        let total = metricObj.total;

        if (isAmount) {
            total = `${total} €`;
        }
        metricData.push([metric, metricObj.quantity, total]);
    });

    return metricData;
}

export function bookingsDayChart(header, bookingInfo) {
    const bookingDayData = [header];

    const orderedDates = {};
    Object.keys(bookingInfo.days).sort((a, b) => {
        return moment(b, 'DD/MM/YYYY').toDate() - moment(a, 'DD/MM/YYYY').toDate();
    }).forEach((key) => {
        orderedDates[key] = bookingInfo.days[key];
    });

    _.forEach(Object.keys(orderedDates), (day) => {
        const daybj = bookingInfo.days[day];
        bookingDayData.push([day, daybj.quantity, daybj.total]);
    });

    return bookingDayData;
}

export function roomsTable(booking) {
    const rooms = [];
    _.forEach(booking.rooms, (room) => {
        rooms.push([room.roomCode, room.amount, room.checkin, room.checkout, room.nights]);
    });
    return rooms;
}