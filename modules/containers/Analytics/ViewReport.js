import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import reducers from '../../../reducers/';
import { retreiveReportsIfNeeded } from '../../../actions/';
import Loader from '../../components/Loader';
import Analytics from '../../components/Analytics';
import Alert from '../../components/Alert';
import { formatMetrics, formatDimensions } from '../../../helpers/analytics';

class ViewReport extends Component {

    refreshData() {
        this.props.dispatch(retreiveReportsIfNeeded());
    }

    componentDidMount() {
        this.refreshData();
    }

    onSuccess(response) {
        console.log(response);
    }

    onFailure() {

    }

    getReport() {
        const report = _.find(this.props.reports, (reportObj) =>
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

    render() {
        const loading = this.props.loadingComponents;

        if (loading) {
            return <Loader />;
        }

        return this.renderPage();
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        loadingComponents: reducers(state).components.loading,
        reports: reducers(state).analytics.reports,
        reportID: ownProps.params.report

    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewReport);
