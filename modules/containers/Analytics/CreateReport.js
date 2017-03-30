import React, { Component } from 'react';
import { connect } from 'react-redux';

import reducers from '../../../reducers/';
import BoxContent from '../../components/BoxContent';
import Loader from '../../components/Loader';

import { createReportIfNeeded } from '../../../actions';

class CreateReport extends Component {

    renderHelpReport() {
        return null;
    }

    renderForm() {
        return (
            <form onSubmit={this.onSubmitform.bind(this)}>
                <div className="form-group">
                    <label>* Report name</label>
                    <input type="text" className="form-control" ref="name" />
                </div>

                <div className="form-group">
                    <label>* Metrics</label>
                    <input type="text" className="form-control" ref="metrics" />
                    <p className="help-block">Example: ga:sessions,ga:bounces</p>
                </div>

                <div className="form-group">
                    <label>Dimensions</label>
                    <input type="text" className="form-control" ref="dimensions" />
                    <p className="help-block">Example: ga:country,ga:deviceCategory</p>
                </div>

                <div className="form-group">
                    <label>Filters</label>
                    <input type="text" className="form-control" ref="filters" />
                    <p className="help-block">Example: ga:pagepath=~availability</p>
                </div>

                <div className="panel-footer">
                    <div className="form-group m-a-0">
                        <button
                            type="submit"
                            className="btn btn-success btn-wide">
                            Create report
                            </button>
                    </div>
                </div>
            </form>

        );
    }

    onSubmitform(event) {
        event.preventDefault();
        const reportData = {
            name: this.refs.name.value,
            metrics: this.refs.metrics.value,
            dimensions: this.refs.dimensions.value,
            filters: this.refs.filters.value
        };
        this.props.dispatch(createReportIfNeeded(reportData));
    }

    render() {
        const loading = this.props.loadingComponents || this.props.creatingReport;

        if (loading) {
            return <Loader />;
        }

        return (
            <div className="row">
                <div className="col-md-6 panel-body">
                    <BoxContent title='Create new report' subtitle='Analytics report' >
                        {this.renderForm()}
                    </BoxContent>
                </div>

                {this.renderHelpReport()}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        loadingComponents: reducers(state).components.loading,
        creatingReport: reducers(state).analytics.isCreatingReport
    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateReport);
