import _ from 'lodash';

module.exports = {
    usersWithBookings,
    formatBookings
};

function usersWithBookings(navigationPages) {
    const bookings = [];

    _.forEach(navigationPages, (navPage) => {
        if (navPage.bookings.length > 0) {

            _.forEach(navPage.bookings, (booking) => {
                if (booking.rooms) {
                    bookings.push(navPage);
                }
            });
        }
    });

    return bookings;
}

function formatBookings(userBookings) {
    const countriesRegistered = [];
    const bookings = {
        totalAmount: 0,
        totalBookings: 0,
        totalRooms: 0,
        totalCountries: 0
    };

    _.forEach(userBookings, (navPage) => {
        const country = navPage.user.country;

        if (navPage.bookings) {
            bookings.totalBookings += navPage.bookings.length || 0;

            _.forEach(navPage.bookings, (booking) => {
                let totalAmounts = 0;
                const rooms = booking.rooms || [];

                bookings.totalRooms += rooms.length;

                _.forEach(rooms, (room) => {
                    totalAmounts += room.amount;
                });

                bookings.totalAmount += totalAmounts ;

                if (!(countriesRegistered.includes(country))) {
                    countriesRegistered.push(country);
                    bookings.totalCountries += 1;
                }
            });
        }
    });

    return bookings;
}
