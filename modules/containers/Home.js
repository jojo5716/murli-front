import React from 'react';
import { connect } from 'react-redux';

import reducers from '../../reducers/';
import Loader from '../components/Loader';
import EmptyData from '../components/EmptyData';
import BoxChart from '../components/BoxChart';

import helperHome from '../../helpers/home';

import Alert from '../components/Alert';

class Home extends React.Component {

    renderBookingData(bookingsInfo) {
        const totalBookings = this.renderBoxChart({
            title: 'Nº Bookings',
            content: bookingsInfo.totalBookings,
            textContent: 'Bookings'
        });

        const totalAmountBookings = this.renderBoxChart({
            title: 'Total booking amounts',
            content: bookingsInfo.totalAmount.toFixed(2),
            textContent: '€'
        });

        const totalRoomsBookings = this.renderBoxChart({
            title: 'Nº Rooms',
            content: bookingsInfo.totalRooms,
            textContent: 'Room type'
        });

        const totalCountriesBooking = this.renderBoxChart({
            title: 'Nº Countries',
            content: bookingsInfo.totalCountries,
            textContent: 'Countries'
        });

        return (
            <div className="row">
                <div className="col-md-3">
                    {totalBookings}
                </div>

                <div className="col-md-3">
                    {totalAmountBookings}
                </div>

                <div className="col-md-3">
                    {totalRoomsBookings}
                </div>

                <div className="col-md-3">
                    {totalCountriesBooking}
                </div>
            </div>
        );
    }

    renderBoxChart(data) {
        return (
            <BoxChart
                content={data.content}
                title={data.title}
                textContent={data.textContent}
                percent="0"
                showPercent={false}
            />
        );
    }

    renderPage() {
        const bookingUsers = helperHome.usersWithBookings(this.props.navigationPages);
        const bookingsInfo = helperHome.formatBookings(bookingUsers);

        return (
            <div className="container-fluid">
                <Alert message="All amounts are expressed in the hotel's default currency (EUR / €)" />
                {this.renderBookingData(bookingsInfo)}
            </div>
        );
    }

    render() {
        const loading = this.props.loadingComponents;

        if (loading) {
            return <Loader />;
        }

        if (this.props.navigationPages.length > 0) {
            return this.renderPage();
        }

        return (
            <EmptyData
                title="No data"
                message="Maybe that range do not have any data"
            />
        );
    }
}


const mapStateToProps = (state) => {
    return {
        navigationPages: reducers(state).getPages.navigationPages,
        loadingComponents: reducers(state).components.loading
    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
