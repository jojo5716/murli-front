import React from 'react';
import { connect } from 'react-redux';
import reducers from '../../reducers/';
import Loader from '../components/Loader';
import EmptyData from '../components/EmptyData';
import BoxChart from '../components/BoxChart';
import {
    usersWithBookings,
    formatBookings,
    roomsChart,
    countriesChart,
    boardsChart,
    ratesChart,
    occupanciesChart,
    bookingsDayChart
} from '../../helpers/home';
import GoogleChart from '../components/charts/GoogleChart';


class Home extends React.Component {

    renderHeader(bookingsInfo) {
        return (
            <div className="row">
                <div className="col-md-3">
                    <BoxChart
                        content={bookingsInfo.totalBookings}
                        title="Nº Bookings"
                        textContent="Bookings"
                        percent="0"
                        showPercent={false}
                    />
                </div>

                <div className="col-md-3">
                    <BoxChart
                        content={bookingsInfo.totalAmount.toFixed(2)}
                        title="Total amount Bookings"
                        textContent="€"
                        percent="0"
                        showPercent={false}
                    />
                </div>

                <div className="col-md-3">
                    <BoxChart
                        content={Object.keys(bookingsInfo.rooms).length}
                        title="Nº rooms"
                        textContent="Rooms type"
                        percent="0"
                        showPercent={false}
                    />
                </div>

                <div className="col-md-3">
                    <BoxChart
                        content={Object.keys(bookingsInfo.countries).length}
                        title="Nº countries"
                        textContent="Countries"
                        percent="0"
                        showPercent={false}
                    />
                </div>
            </div>
        );
    }

    renderBookingChart(bookingsInfo) {
        const header = ['Rooms', 'Quantity', { role: 'annotation' }];
        const chartData = roomsChart(header, bookingsInfo);

        return (
            <GoogleChart
                data={chartData}
                hAxis="Rooms code"
                chartType="ColumnChart"
                titleChart="Reserved rooms"
                vAxis="Quantity"
            />
        );
    }

    renderCountriesChart(bookingsInfo) {
        const header = ['Country', 'Bookings', { role: 'annotation' }];
        const chartData = countriesChart(header, bookingsInfo);

        return (
            <GoogleChart
                data={chartData}
                hAxis="Country code"
                vAxis="Booking number"
                chartType="ColumnChart"
                titleChart="Booking per country"
            />
        );
    }

    renderBoardsChart(bookingsInfo) {
        const header = ['Board', 'Bookings', 'Total'];
        const chartData = boardsChart(header, bookingsInfo);

        return (
            <GoogleChart
                data={chartData}
                hAxis="Board code"
                chartType="BubbleChart"
                titleChart="Booking per boards"
            />
        );
    }

    renderRatesChart(bookingsInfo) {
        const header = ['Rate', 'Bookings', 'Total'];
        const chartData = ratesChart(header, bookingsInfo);

        return (
            <GoogleChart
                data={chartData}
                hAxis="Rate code"
                chartType="BubbleChart"
                titleChart="Booking per rates"
            />
        );
    }

    renderOccupanciesChart(bookingsInfo) {
        const header = ['Rate', 'Bookings', 'Total'];
        const chartData = occupanciesChart(header, bookingsInfo);

        return (
            <GoogleChart
                data={chartData}
                hAxis="Occupancy code"
                chartType="BubbleChart"
                titleChart="Booking per occupancies"
            />
        );
    }

    renderBookingsDayChart(bookingsInfo) {
        const header = ['Day', 'Bookings', 'Total'];
        const chartData = bookingsDayChart(header, bookingsInfo);

        return (
            <GoogleChart
                data={chartData}
                hAxis="Day"
                chartType="LineChart"
                titleChart="Booking per day"
            />
        );
    }

    renderPage() {
        const bookingUsers = usersWithBookings(this.props.navigationPages);
        const bookingsInfo = formatBookings(bookingUsers);

        console.log(bookingsInfo);

        return (
            <div className="container-fluid">
                { this.renderHeader(bookingsInfo)}
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-plain panel-rounded">
                            <div className="panel-heading">
                                <h3 className="panel-title">Booking rooms</h3>
                                <p className="subtitle text-uppercase m-t">Total of rooms bookings</p>
                                <div className="panel-toolbar v-centered" >
                                    <ul className="list-inline m-a-0">
                                        <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"/></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="panel-body">
                                { this.renderBookingChart(bookingsInfo)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-plain panel-rounded">
                            <div className="panel-heading">
                                <h3 className="panel-title">Booking country</h3>
                                <p className="subtitle text-uppercase m-t">Bookings by country</p>
                                <div className="panel-toolbar v-centered" >
                                    <ul className="list-inline m-a-0">
                                        <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"/></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="panel-body">
                                { this.renderCountriesChart(bookingsInfo)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-plain panel-rounded">
                            <div className="panel-heading">
                                <h3 className="panel-title">Booking boards</h3>
                                <p className="subtitle text-uppercase m-t">Boards per booking</p>
                                <div className="panel-toolbar v-centered" >
                                    <ul className="list-inline m-a-0">
                                        <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"/></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="panel-body">
                                { this.renderBoardsChart(bookingsInfo)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-plain panel-rounded">
                            <div className="panel-heading">
                                <h3 className="panel-title">Booking rates</h3>
                                <p className="subtitle text-uppercase m-t">Rates per booking</p>
                                <div className="panel-toolbar v-centered" >
                                    <ul className="list-inline m-a-0">
                                        <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"/></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="panel-body">
                                { this.renderRatesChart(bookingsInfo)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-plain panel-rounded">
                            <div className="panel-heading">
                                <h3 className="panel-title">Booking occupancies</h3>
                                <p className="subtitle text-uppercase m-t">Occupancies per booking</p>
                                <div className="panel-toolbar v-centered" >
                                    <ul className="list-inline m-a-0">
                                        <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"/></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="panel-body">
                                { this.renderOccupanciesChart(bookingsInfo)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-plain panel-rounded">
                            <div className="panel-heading">
                                <h3 className="panel-title">Booking per day</h3>
                                <p className="subtitle text-uppercase m-t">Booking per day</p>
                                <div className="panel-toolbar v-centered" >
                                    <ul className="list-inline m-a-0">
                                        <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"/></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="panel-body">
                                { this.renderBookingsDayChart(bookingsInfo)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const loading = this.props.loadingComponents;

        if (loading) {
            return <Loader />;
        }

        if (this.props.navigationPages.length > 0) {
            return this.renderPage(this.props.devicesData);
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
        loadingComponents: reducers(state).components.loading,

    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
