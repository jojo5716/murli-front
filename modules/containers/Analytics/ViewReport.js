import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Tabs from 'react-simpletabs';

import reducers from '../../../reducers/';
import { retreiveReportsIfNeeded, saveDataFromReport } from '../../../actions/';
import Loader from '../../components/Loader';
import Analytics from '../../components/Analytics';
import Alert from '../../components/Alert';
import { formatMetrics, formatDimensions, overviewData, AnalyticsCharts, getMetricsName, getChartData } from '../../../helpers/analytics';
import BoxContent from '../../components/BoxContent';
import Bar from '../../components/charts/Bar';


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

    renderTotalData(name, dataArray, icon) {
        const iconClass = `fa ${icon}`;

        return (
            <div className="p-y-xs">
                <label className="f-w-normal">
                    <i className={iconClass} />
                    {name}: {dataArray[0]}
                </label>
                <span className="label label-success m-a-0 p-x pull-right">{dataArray[1]}</span>
            </div>
        );
    }

    renderGlobalData() {
        const overview = overviewData(this.props.reportData);

        return (
            <BoxContent title='Overview of information' subtitle='Analytics report' >
                <div className="panel-body p-t">
                    <div className="p-y-xs">
                        <label className="f-w-normal">
                            <i className="fa fa-newspaper-o" aria-hidden="true" />
                            Rows
                        </label>
                        <span className="label label-success m-a-0 p-x pull-right">{overview.rows}</span>
                    </div>
                    {overview.total.map(total =>
                        this.renderTotalData('Total', total, 'fa-line-chart')
                    )}

                    {overview.maximums.map(maximum =>
                        this.renderTotalData('Maximums', maximum, 'fa-thermometer-full')
                    )}
                    {overview.minimums.map(minimum =>
                        this.renderTotalData('Minimums', minimum, 'fa-thermometer-empty')
                    )}
                </div>
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
                    {rows.map((row, index) =>
                        <tr key={`detail-column-${index}`}>
                            {this.renderDetailData(row, index)}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderDetailData(row, index) {
        const html = [<td>{index}</td>];

        _.forEach(row.dimensions, (dimension) => {
            html.push(
                <td className="text-center">{dimension}</td>
            );
        });

        _.forEach(row.metrics[0].values, (metric) => {
            html.push(
                <td className="text-center">{metric}</td>
            );
        });

        return html;
    }

    renderHeaderDetail() {
        const html = [<td>#</td>];
        const data = this.props.reportData;
        const report = data.result.reports[0];
        const dimensions = report.columnHeader.dimensions;

        _.forEach(dimensions, (dimension) => {
            html.push(
                <th className="text-center">{dimension}</th>
            );
        });

        const metrics = report.columnHeader.metricHeader.metricHeaderEntries;
        _.forEach(metrics, (metric) => {
            html.push(
                <th className="text-center">{metric.name} ({metric.type})</th>
            );
        });

        return html;
    }

    renderCharts() {
        const dataFormatted = AnalyticsCharts(this.props.reportData);
        const metricsName = getMetricsName(this.props.reportData);
        const metricsChartData = getChartData(metricsName, dataFormatted);
        console.log(dataFormatted);
        console.log(metricsChartData);

        return Object.keys(dataFormatted).map((dimensionName) => {
            return (
                <BoxContent title={dimensionName}>
                    {metricsName.map((metric) => {
                        return (
                            <div className="col-md-6">
                                <Bar
                                    data={{}}
                                    label={metric}
                                    labelsArray={Object.keys(dataFormatted[dimensionName])}
                                    dataArray={metricsChartData[dimensionName][metric]}
                                />
                            </div>
                        );
                    })}
                </BoxContent>
            );
        });
    }

    reportData() {

        return (
            <div className="col-md-12">
                <Tabs>
                    <Tabs.Panel title='Detail metrics'>
                        <div className="col-md-8">
                            <BoxContent title='Detail information' subtitle='Analytics report' >
                                {this.renderDetailReport()}
                            </BoxContent>
                        </div>

                        <div className="col-md-4">
                            {this.renderGlobalData()}
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel title='Dimensions charts'>
                        {this.renderCharts()}
                    </Tabs.Panel>
                </Tabs>
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
