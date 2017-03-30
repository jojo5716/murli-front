import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import reducers from '../../../reducers/';
import { retreiveReportsIfNeeded, saveDataFromReport } from '../../../actions/';
import Loader from '../../components/Loader';
import Analytics from '../../components/Analytics';
import Alert from '../../components/Alert';
import { formatMetrics, formatDimensions, overviewData } from '../../../helpers/analytics';
import BoxContent from '../../components/BoxContent';

class ViewReport extends Component {

    refreshData() {
        this.props.dispatch(retreiveReportsIfNeeded());
    }

    componentDidMount() {
        this.refreshData();
    }

    onSuccess(response) {
        console.log(response);
        this.props.dispatch(saveDataFromReport(response));
    }

    onFailure() {

    }

    getReport() {
        const report = _.find(this.props.reports, reportObj =>
            reportObj._id === this.props.reportID
        );

        return report;
    }

    renderPage() {
        const clientID = '84342547';
        const report = this.getReport();

        if (report && report.metrics) {
            return (
                <div className="col-md-6">
                    <Analytics
                        clientID={clientID}
                        dispatch={this.props.dispatch}
                        metrics={formatMetrics('expression', report.metrics)}
                        dimensions={formatDimensions('name', report.dimensions)}
                        startDate={this.props.checkIn}
                        endDate={this.props.checkOut}
                        onSuccess={this.onSuccess.bind(this)}
                        onFailure={this.onFailure.bind(this)}
                    />
                    <h1>Report detail</h1>
                </div>
            );
        }

        return null;

    }

    renderGlobalData() {
        const overview = overviewData(this.props.reportData);

        return (
            <BoxContent title='Overview of information' subtitle='Analytics report' >
                <table className="table table-b-t">
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>Rows</th>
                            <th>Maximums</th>
                            <th>Mimimums</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{overview.total}</td>
                            <td>{overview.rows}</td>
                            <td>{overview.maximums}</td>
                            <td>{overview.minimums}</td>
                        </tr>
                    </tbody>
                </table>
            </BoxContent>
        );
    }

    renderDetailReport() {
        const data = this.props.reportData;
        const rows = data.result.reports[0].data.rows;

        return (
            <table className="table table-b-t">
                <thead>
                <tr>
                    {this.renderHeaderDetail()}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {rows.map((row, index) =>
                        <tr key={index}>
                            {this.renderDetailData(row)}
                        </tr>
                    )}
                </tr>
                </tbody>
            </table>
        );
    }

    renderDetailData(row) {
        const html = [];

       _.forEach(row.dimensions, (dimension) => {
           html.push(
                <td>{dimension}</td>
            );
       });

       _.forEach(row.metrics[0].values, (metric) => {
           html.push(
                <td>{metric}</td>
            );
       });

        return html;
    }

    renderHeaderDetail() {
        const html = [];
        const data = this.props.reportData;
        const report = data.result.reports[0];
        const dimensions = report.columnHeader.dimensions;

        _.forEach(dimensions, (dimension) => {
            html.push(
                <th>{dimension}</th>
            );
        });

        const metrics = report.columnHeader.metricHeader.metricHeaderEntries;
        _.forEach(metrics, (metric) => {
            html.push(
                <th>{metric.name} ({metric.type})</th>
            );
        });

        return html;
    }

    reportData() {
        return (
        <div className="col-md-12">
            <div className="col-md-8">
                <BoxContent title='Detail information' subtitle='Analytics report' >
                    {this.renderDetailReport()}
                </BoxContent>
            </div>

            <div className="col-md-4">
                {this.renderGlobalData()}
            </div>
        </div>
        );
    }

    render() {
        const loading = this.props.loadingComponents;

        if (loading) {
            return <Loader />;
        }

        if (Object.keys(this.props.reportData).length === 0) {
            return this.renderPage();
        }

        return this.reportData();

    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        loadingComponents: reducers(state).components.loading,
        reports: reducers(state).analytics.reports,
        reportData: reducers(state).analytics.reportData,
        reportID: ownProps.params.report

    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewReport);
