import _ from 'lodash';


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

function saveRoom(room, bookings) {
    if (!bookings.rooms[room.roomCode]) {
        bookings.rooms[room.roomCode] = { total: 0, quantity: 0 };
    }

    bookings.rooms[room.roomCode].total += room.amount;
    bookings.rooms[room.roomCode].quantity += 1;
}

function saveBoards(room, bookings) {
    if (!bookings.boards[room.boardCode]) {
        bookings.boards[room.boardCode] = { total: 0, quantity: 0 };
    }

    bookings.boards[room.boardCode].total += room.amount;
    bookings.boards[room.boardCode].quantity += 1;
}

function saveRates(room, bookings) {
    if (!bookings.rates[room.rateCode]) {
        bookings.rates[room.rateCode] = { total: 0, quantity: 0 };
    }

    bookings.rates[room.rateCode].total += room.amount;
    bookings.rates[room.rateCode].quantity += 1;
}

function saveCountries(user, room, bookings) {
    if (!bookings.countries[user.country]) {
        bookings.countries[user.country] = { total: 0, quantity: 0 };
    }

    bookings.countries[user.country].total += room.amount;
    bookings.countries[user.country].quantity += 1;
}

function saveOccupancies(room, bookings) {
    if (!bookings.occupancies[room.occupancyCode]) {
        bookings.occupancies[room.occupancyCode] = { total: 0, quantity: 0 };
    }

    bookings.occupancies[room.occupancyCode].total += room.amount;
    bookings.occupancies[room.occupancyCode].quantity += 1;
}

function saveDays(room, bookings) {
    if (!bookings.days[room.checkin]) {
        bookings.days[room.checkin] = { total: 0, quantity: 0 };
    }

    bookings.days[room.checkin].total += room.amount;
    bookings.days[room.checkin].quantity += 1;
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
        days: {}
    };

    _.forEach(navPages, (navPage) => {
        _.forEach(navPage.user.bookings, (booking) => {
            bookings.totalBookings += 1;

            if (booking.rooms) {
                _.forEach(booking.rooms, (room) => {
                    bookings.totalAmount += room.amount;
                    bookings.totalRooms += 1;
                    saveRoom(room, bookings);
                    saveBoards(room, bookings);
                    saveRates(room, bookings);
                    saveOccupancies(room, bookings);
                    saveDays(room, bookings);
                    saveCountries(navPage.user, room, bookings);
                });
            }
        });
    });

    return bookings;
}


export function roomsChart(header, bookingsInfo) {
    const roomData = [header];

    _.forEach(Object.keys(bookingsInfo.rooms), (room) => {
        const roomObj = bookingsInfo.rooms[room];
        const total = `${roomObj.total.toFixed(2)} €`;
        roomData.push([room, roomObj.quantity, total]);
    });

    return roomData;
}

export function countriesChart(header, bookingInfo) {
    const countriesData = [header];

    _.forEach(Object.keys(bookingInfo.countries), (country) => {
        const countryObj = bookingInfo.countries[country];
        const total = `${countryObj.total.toFixed(2)} €`;
        countriesData.push([country, countryObj.quantity, total]);
    });

    return countriesData;
}

export function boardsChart(header, bookingInfo) {
    const boardsData = [header];

    _.forEach(Object.keys(bookingInfo.boards), (board) => {
        const boardObj = bookingInfo.boards[board];
        boardsData.push([board, boardObj.quantity, boardObj.total]);
    });

    return boardsData;
}

export function ratesChart(header, bookingInfo) {
    const ratesData = [header];

    _.forEach(Object.keys(bookingInfo.rates), (rate) => {
        const boardObj = bookingInfo.rates[rate];
        ratesData.push([rate, boardObj.quantity, boardObj.total]);
    });

    return ratesData;
}

export function occupanciesChart(header, bookingInfo) {
    const occupanciesData = [header];

    _.forEach(Object.keys(bookingInfo.occupancies), (occupancy) => {
        const occupancyObj = bookingInfo.occupancies[occupancy];
        occupanciesData.push([occupancy, occupancyObj.quantity, occupancyObj.total]);
    });

    return occupanciesData;
}

export function bookingsDayChart(header, bookingInfo) {
    const occupanciesData = [header];

    _.forEach(Object.keys(bookingInfo.days), (day) => {

        const daybj = bookingInfo.days[day];
        occupanciesData.push([day, daybj.quantity, daybj.total]);
    });

    return occupanciesData;
}
