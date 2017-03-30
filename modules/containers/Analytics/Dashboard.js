import React, { Component } from 'react';
import { connect } from 'react-redux';

import reducers from '../../../reducers/';
import { retreiveReportsIfNeeded } from '../../../actions/';
import Loader from '../../components/Loader';
import NavLink from '../../components/NavLink';

class Dashboard extends Component {

    refreshData() {
        this.props.dispatch(retreiveReportsIfNeeded());
    }

    componentDidMount() {
        this.refreshData();
    }

    renderPage() {
        console.log(this.props.reports)
        return (
            <div className="col-md-6">
                {this.props.reports.map(this.renderReport.bind(this))}
            </div>
        );
    }

    renderReport(report, index) {
        const url = `/analytics/report/${report._id}`;

        return (
            <div className="panel panel-plain" key={index}>
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {report.name}
                    </h3>
                    <div className="panel-toolbar v-centered mobile-block" >
                        <ul className="list-inline m-a-0">
                            <li>
                                <NavLink to={url}>
                                    <span className="fa fa-newspaper-o"/>
                                    Go to report
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="panel-body">
                    Metrics <code>{report.metrics}</code>
                    Dimensions <code>{report.dimensions}</code>
                    Filters <code>{report.filters}</code>
                </div>
            </div>
        );
    }
    render() {
        const loading = this.props.loadingComponents;

        if (loading) {
            return <Loader />;
        }

        return this.renderPage();
    }
}


const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        loadingComponents: reducers(state).components.loading,
        reports: reducers(state).analytics.reports
    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
