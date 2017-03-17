import React from 'react';
import { connect } from 'react-redux';
import reducers from '../../reducers/';

import {
    generateColorsToPie,
    devicePercentTraffic,
    getAllDevices,
    getVisitFromPages,
    getOSNameFromPages
} from '../../helpers/devices';

// Charts components
import Pie from '../charts/Pie';
import Bar from '../charts/Bar';

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
        })
    }

    generateOSTable(pages) {
        return Object.keys(pages).map((browserName, index) => {
            const osData = pages[browserName].os;

            return (
                <div className="panel panel-plain" key={index}>
					<div className="panel-heading">
						<h3 className="panel-title">{browserName}</h3>
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
                                )
                            })}
                            </tbody>
                        </table>
					</div>
				</div>
            );
        })
    }


    generateBookingTable(pages) {
        return Object.keys(pages).map((browserName, index) => {
            const osData = pages[browserName].os;

            return (
                <div className="panel panel-plain" key={index}>
					<div className="panel-heading">
						<h3 className="panel-title">{browserName}</h3>
						<div className="panel-toolbar v-centered" >
							<span className="fa fa-twitter text-info"/>
						</div>
					</div>
					<div className="panel-body rs-col-stacked full-width-on-mobile border-items borderless m-a-0">
                        <ul className="list-group m-b-0">
    						{Object.keys(osData.names).map((osName, index) => {
                                const bookings = osData.names[osName].bookings;
                                return bookings.length > 0 ?
                                    (
                                        <li className="list-group-item" key={index}>
                                            {osName}
                                            <span className="label label-success m-a-0 p-x pull-right">
                                            {bookings.length}
                                            </span>
                                        </li>
                                    )
                                : null;
                            })}
                        </ul>
					</div>
				</div>
            );
        })
    }

    render() {
        const pages = this.props.pages || [];
        const pieData = getAllDevices(pages);
        console.log(pieData);

        const visits = getVisitFromPages(pieData);
        const osNames = getOSNameFromPages(pieData);
        const deviceNames = Object.keys(pieData);
        const pieDataPercent = devicePercentTraffic(pieData, visits);

        const colors = generateColorsToPie(Object.keys(pages).length);
        const percentTableBrowsers = this.generateBrowserTable(pieDataPercent);
        const percentTableOSs = this.generateOSTable(pieData);
        const bookingTableOSs = this.generateBookingTable(pieData);

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-6'>
                        <div className="stacked-item panel panel-plain">
                            <div className="panel-heading borderless">
                                <h3 className="panel-title">Device by Type</h3>
                                <div className="panel-toolbar v-centered" >
                                    <p className="subtitle text-uppercase m-a-0">All pages</p>
                                </div>
                            </div>
                            <div className="panel-body">
                                <Pie
                                devices={deviceNames}
                                visits={visits}
                                colors={colors}/>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                            <div className="stacked-item panel panel-plain">
                                <div className="panel-heading borderless">
                                    <h3 className="panel-title">Top browser devices</h3>
                                    <div className="panel-toolbar v-centered" >
                                        <p className="subtitle text-uppercase m-a-0">All pages</p>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <Bar data={osNames}/>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="stacked-item panel panel-plain">
                            <div className="panel-heading borderless">
                                <h3 className="panel-title">% Visits by browser</h3>
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

                        <div className="stacked-item panel panel-plain">
                            <div className="panel-heading borderless">
                                <h3 className="panel-title">Bookings by device os</h3>
                                <div className="panel-toolbar v-centered" >
                                    <p className="subtitle text-uppercase m-a-0">All pages</p>
                                </div>
                            </div>
                            <div className="panel-body">
                                { bookingTableOSs }
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
}

const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).changeDates.checkIn,
        checkOut: reducers(state).changeDates.checkOut,
        pages: reducers(state).getPages.pages
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardDevice);
