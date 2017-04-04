import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import reducers from '../../reducers/';
import Loader from '../components/Loader';
import EmptyData from '../components/EmptyData';
import BoxChart from '../components/BoxChart';
import {
    usersWithBookings,
    formatBookings,
    bookingsDayChart,
    chartMetric,
    roomsTable
} from '../../helpers/home';
import GoogleChart from '../components/charts/GoogleChart';
import BoxContent from '../components/BoxContent';
import Alert from '../components/Alert';
import Collapser from '../components/Collapser';

class Home extends React.Component {

    renderHeader(bookingsInfo) {
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
            content: Object.keys(bookingsInfo.rooms).length,
            textContent: 'Room type'
        });

        const totalCountriesBooking = this.renderBoxChart({
            title: 'Nº Countries',
            content: Object.keys(bookingsInfo.countries).length,
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

    renderRoomsChart(bookingsInfo) {
        const header = ['Rooms', 'Quantity', { role: 'annotation' }];
        const chartData = chartMetric(header, bookingsInfo, 'rooms', true);

        const optionals = {
            hAxis: 'Rooms code',
            chartType: 'ColumnChart',
            titleChart: 'Reserved rooms'
        };

        return this.renderMetricChart(chartData, optionals);
    }

    renderCountriesChart(bookingsInfo) {
        const header = ['Country', 'Bookings', { role: 'annotation' }];
        const chartData = chartMetric(header, bookingsInfo, 'countries', true);

        const optionals = {
            hAxis: 'Country code',
            chartType: 'ColumnChart',
            titleChart: 'Bookings per country'
        };

        return this.renderMetricChart(chartData, optionals);
    }

    renderBoardsChart(bookingsInfo) {
        const header = ['Board', 'Bookings', 'Total'];
        const chartData = chartMetric(header, bookingsInfo, 'boards');

        const optionals = {
            hAxis: 'Board code',
            chartType: 'BubbleChart',
            titleChart: 'Bookings per boards'
        };

        return this.renderMetricChart(chartData, optionals);
    }

    renderRatesChart(bookingsInfo) {
        const header = ['Rate', 'Bookings', 'Total'];
        const chartData = chartMetric(header, bookingsInfo, 'rates');

        const optionals = {
            hAxis: 'Rate code',
            chartType: 'BubbleChart',
            titleChart: 'Bookings per rates'
        };

        return this.renderMetricChart(chartData, optionals);
    }

    renderOccupanciesChart(bookingsInfo) {
        const header = ['Rate', 'Bookings', 'Total'];
        const chartData = chartMetric(header, bookingsInfo, 'occupancies');

        const optionals = {
            hAxis: 'Occupancy code',
            chartType: 'BubbleChart',
            titleChart: 'Bookings per occupancies'
        };

        return this.renderMetricChart(chartData, optionals);
    }

    renderBookingsDayChart(bookingsInfo) {
        const header = ['Day', 'Bookings', 'Total'];
        const chartData = bookingsDayChart(header, bookingsInfo);

        const optionals = {
            hAxis: 'Day',
            chartType: 'BubbleChart',
            titleChart: 'Bookings per day'
        };

        return this.renderMetricChart(chartData, optionals);
    }

    renderMetricChart(chartData, args) {
        return (
            <GoogleChart
                data={chartData}
                hAxis={args.hAxis}
                chartType={args.chartType}
                titleChart={args.titleChart}
            />
        );
    }

    renderTableBookings(bookingUsers) {
        const html = [];

        _.forEach(bookingUsers, (page) => {
            _.forEach(page.user.bookings, (booking) => {
                const rooms = roomsTable(booking);
                const titleCollapser = `${booking.bookingCode} - ${booking.bookingStatus}`;

                html.push(
                    <Collapser title={titleCollapser}>
                        <table className="table rs-table table-striped table-hover table-b-t">
                            <thead>
                                <tr>
                                    <th>Room code</th>
                                    <th>Total</th>
                                    <th>Check in</th>
                                    <th>Check in</th>
                                    <th>Nights</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room, index) =>
                                    <tr key={index}>
                                        {room.map(info =>
                                            <td>{info}</td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Collapser>
                );
            });
        });

        return html;

    }

    renderPage() {
        const bookingUsers = usersWithBookings(this.props.navigationPages);
        const bookingsInfo = formatBookings(bookingUsers);

        return (
            <div className="container-fluid">
                <Alert message="All amounts are expressed in the hotel's default currency (EUR / €)" />

                {this.renderHeader(bookingsInfo)}
                <div className="row">
                    <div className="col-md-6">
                        <BoxContent title="Booking rooms" subtitle="Booking per room">
                            {this.renderRoomsChart(bookingsInfo)}
                        </BoxContent>
                    </div>

                    <div className="col-md-6">
                        <BoxContent title="Booking country" subtitle="Bookings by country">
                            {this.renderCountriesChart(bookingsInfo)}
                        </BoxContent>
                    </div>

                    <div className="col-md-6">
                        <BoxContent title="Booking boards" subtitle="Bookings by boards">
                            {this.renderBoardsChart(bookingsInfo)}
                        </BoxContent>
                    </div>

                    <div className="col-md-6">
                        <BoxContent title="Booking rates" subtitle="Bookings by rates">
                            {this.renderRatesChart(bookingsInfo)}
                        </BoxContent>
                    </div>

                    <div className="col-md-6">
                        <BoxContent title="Booking occupancies" subtitle="Bookings by occupancies">
                            {this.renderOccupanciesChart(bookingsInfo)}
                        </BoxContent>
                    </div>

                    <div className="col-md-6">
                        <BoxContent title="Booking days" subtitle="Bookings by day">
                            {this.renderBookingsDayChart(bookingsInfo)}
                        </BoxContent>
                    </div>

                    <div className="col-md-6">
                        <BoxContent title="Booking days" subtitle="Bookings by day">
                            {this.renderTableBookings(bookingUsers)}
                        </BoxContent>
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
        loadingComponents: reducers(state).components.loading
    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
