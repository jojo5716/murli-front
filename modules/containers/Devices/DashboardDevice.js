import React from 'react';
import { connect } from 'react-redux';
import reducers from '../../../reducers/';

import {
    generateColorsToPie,
    devicePercentTraffic,
    groupPagesByDevices,
    getVisitFromPages,
    getOSNameFromPages
} from '../../../helpers/devices';

import { formatDevicesIfNeeded } from '../../../actions/';

// Charts modules
import Pie from '../../components/charts/Pie';
import Bar from '../../components/charts/Bar';
import Loader from '../../components/Loader';
import EmptyData from '../../components/EmptyData';

class DashboardDevice extends React.Component {

    generateBrowserTable(pages) {
        return Object.keys(pages).map((page, index) => {
            const browser = pages[page];

            return (
                <tr key={index}>
                    <td>{browser.name}</td>
                    <td>{browser.visits}</td>
                    <td>
                        <span className="label label-success m-a-0 p-x pull-right">
                            {browser.percent}%
                        </span>
                    </td>
                </tr>
            );
        });
    }

    generateOSTable(pages) {
        return Object.keys(pages).map((browserName, index) => {
            const osData = pages[browserName].os;

            return (
                <div className="panel panel-plain" key={index}>
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {browserName}
                        </h3>
                        <div className="panel-toolbar v-centered" >
                            <span className="fa fa-twitter text-info"/>
                        </div>
                    </div>
                    <div className="panel-body rs-col-stacked full-width-on-mobile border-items borderless m-a-0">
                        <table className="table rs-table table-striped table-hover table-b-t">
                            <thead>
                            <tr>
                                <th>Browser name</th>
                                <th># Visits</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(osData.names).map((osName, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{osName}</td>
                                        <td>
                                            <span className="label label-success m-a-0 p-x pull-right">
                                                {osData.names[osName].visits}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        });
    }

    renderPage(devicesData) {
        // Devices browsers
        const deviceNames = Object.keys(devicesData);
        const colors = generateColorsToPie(Object.keys(devicesData).length);
        const visits = getVisitFromPages(devicesData);

        // Top OS names
        const osVisits = getOSNameFromPages(devicesData);

        const pieDataPercent = devicePercentTraffic(devicesData, visits);
        const percentTableBrowsers = this.generateBrowserTable(pieDataPercent);
        const percentTableOSs = this.generateOSTable(devicesData);

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-6'>
                        <Pie
                            title="% Visits vy device type"
                            subtitle="All pages"
                            devices={deviceNames}
                            visits={visits}
                            colors={colors}/>
                    </div>

                    <div className='col-md-6'>
                        <Bar
                            title="% Top Os"
                            subtitle="All pages"
                            data={osVisits} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="stacked-item panel panel-plain">
                            <div className="panel-heading borderless">
                                <h3 className="panel-title">Detail top browser visits</h3>
                                <div className="panel-toolbar v-centered" >
                                    <p className="subtitle text-uppercase m-a-0">All pages</p>
                                </div>
                            </div>
                            <div className="panel-body">
                                <table className="table rs-table table-striped table-hover table-b-t">
                                    <thead>
                                    <tr>
                                        <th>Browser name</th>
                                        <th># Devices</th>
                                        <th>%</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { percentTableBrowsers }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="stacked-item panel panel-plain">
                            <div className="panel-heading borderless">
                                <h3 className="panel-title">No. Visits by OS</h3>
                                <div className="panel-toolbar v-centered" >
                                    <p className="subtitle text-uppercase m-a-0">All pages</p>
                                </div>
                            </div>
                            <div className="panel-body">
                                { percentTableOSs }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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

    refreshData() {
        this.props.dispatch(formatDevicesIfNeeded());
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
        devicesData: reducers(state).devices.devicesData
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardDevice);
