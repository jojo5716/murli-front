import React from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-simpletabs';
import 'react-simpletabs/dist/react-simpletabs.min.css';
import reducers from '../../../reducers/';
import BoxChart from '../../components/BoxChart';
import BoxContent from '../../components/BoxContent';

import { formatDevicesPagesIfNeeded } from '../../../actions/';
import { getSectionsVisits } from '../../../helpers/pages';
import Loader from '../../components/Loader';
import EmptyData from '../../components/EmptyData';
import GoogleChart from '../../components/charts/GoogleChart';


class PerPagesDevice extends React.Component {

    refreshData() {
        this.props.dispatch(formatDevicesPagesIfNeeded());
    }

    componentDidMount() {
        this.refreshData();
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.navigationPages !== this.props.navigationPages) || (
            prevProps.navigationPages.length === 0 && this.props.navigationPages.length === 0)) {
            this.refreshData();
        }
    }

    renderTabs(totalPerSection) {
        return (
            <Tabs>
                <Tabs.Panel title='Availability pages'>
                    { this.renderAvailabilityDetailPages(totalPerSection.availability) }
                </Tabs.Panel>
                <Tabs.Panel title='Content pages'>
                    { this.renderAvailabilityDetailPages(totalPerSection.content) }
                </Tabs.Panel>
                <Tabs.Panel title='Non availability pages'>
                    { this.renderAvailabilityDetailPages(totalPerSection.noAvailability) }
                </Tabs.Panel>
                <Tabs.Panel title='Booking pages'>
                    { this.renderAvailabilityDetailPages(totalPerSection.booking) }
                </Tabs.Panel>
            </Tabs>
        );
    }

    renderChartDevices(device, devices) {
        const header = [['Device', 'Visits']];

       _.forEach(Object.keys(devices), (os) => {
           header.push([os, devices[os]]);
       });

        return (
            <GoogleChart
                data={header}
                hAxis={device}
                chartType="ColumnChart"
                titleChart={device}
            />
        );
    }

    renderAvailabilityDetailPages(devices) {
        return (
            <div className="row">
                <div className="col-md-12">
                    { (Object.keys(devices.devices).map((device) => {
                        return (
                            <div className="col-md-4">
                                <BoxContent title={device} subtitle="Pages per section">
                                    {this.renderChartDevices(device, devices.devices[device])}
                                </BoxContent>
                            </div>
                        );
                    }))}
                </div>
            </div>
        );
    }

    renderContentDetailPages2() {
        const urls = this.props.devicesPagesData.content.urls;

        return (
            <table className="table rs-table table-striped table-hover table-b-t">
                <thead>
                <tr>
                    <th>URL</th>
                    <th>Nº visits</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(urls).map((url, index) =>
                    <tr key={index}>
                        <td>{url}</td>
                        <td>{urls[url]}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    renderHeader(totalPerSection) {
        const totalAllSections = Object.values(totalPerSection).reduce((a, b) => a + b.total, 0);
        const availabilityPercent = (totalPerSection.availability.total * 100) / totalAllSections;
        const noAvailabilityPercent = (totalPerSection.noAvailability.total * 100) / totalAllSections;
        const contentPercent = (totalPerSection.content.total * 100) / totalAllSections;
        const bookingPercent = (totalPerSection.booking.total * 100) / totalAllSections;

        return (
            <div className="col-lg-12">
                <div className="col-md-3">
                    <BoxChart
                        content={totalPerSection.availability.total}
                        title="All availability pages"
                        percent={availabilityPercent.toFixed(2)}
                        type="red"
                    />
                </div>
                <div className="col-md-3">
                    <BoxChart
                        content={totalPerSection.noAvailability.total}
                        title="All no availability pages"
                        percent={noAvailabilityPercent.toFixed(2)}
                        type="red"
                    />
                </div>
                <div className="col-md-3">
                    <BoxChart
                        content={totalPerSection.content.total}
                        title="All content pages"
                        percent={contentPercent.toFixed(2)}
                        type="red"
                    />
                </div>
                <div className="col-md-3">
                    <BoxChart
                        content={totalPerSection.booking.total}
                        title="All booking confirmation"
                        percent={bookingPercent.toFixed(2)}
                        type={totalPerSection.booking ? 'green' : 'red'}
                        textContent="Bookings"
                    />
                </div>
            </div>
        );
    }

    renderPage() {
        const totalPerSection = getSectionsVisits(this.props.devicesPagesData);

        return (
            <div className="container-fluid">
                <div className="row">
                    { this.renderHeader(totalPerSection) }
                    <div className="col-md-12">
                        <BoxContent title="Detail pages" subtitle="Pages per section">
                            {this.renderTabs(totalPerSection)}
                        </BoxContent>

                    </div>
                </div>
            </div>
        );
    }

    render() {
        const loading = this.props.loadingComponents;
        const pagesData = this.props.devicesPagesData;
        const havePagesData = Object.keys(pagesData).length > 0;

        if (loading) {
            return <Loader/>;
        }

        if (this.props.navigationPages.length > 0 && havePagesData) {
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
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        navigationPages: reducers(state).getPages.navigationPages,
        loadingComponents: reducers(state).components.loading,
        devicesPagesData: reducers(state).devices.devicesPagesData
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PerPagesDevice);
