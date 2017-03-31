import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';

import reducers from '../../reducers/';

import {
    changeCheckIn,
    changeCheckOut,
    changeProjectSelected,
    fetchAllProjectsIfNeeded,
    fetchPagesIfNeeded
} from '../../actions/';

import { hourMightnight, dateFormat, hourEndDay } from '../../config';


class BreadCrumb extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchAllProjectsIfNeeded());
    }

    onChangeCheckIn(value) {
        const date = moment(value).format(dateFormat);
        this.props.dispatch(changeCheckIn(date));
        this.props.dispatch(fetchPagesIfNeeded());
    }

    onChangeCheckOut(value) {
        const date = moment(value).format(dateFormat);
        this.props.dispatch(changeCheckOut(date));
        this.props.dispatch(fetchPagesIfNeeded());
    }

    onChangeProject(event) {
        this.props.dispatch(changeProjectSelected({
            projectSelected: event.target.value
        }));
    }

    renderProjectsOptions() {
        const html = [];
        for (let i = 0; i < this.props.projects.length; i += 1) {
            const project = this.props.projects[i];

            html.push(
                <option value={project._id} key={i}>
                    {project.name}
                </option>
            );
        }

        return html;
    }

    render() {
        const checkIn = `${this.props.checkIn}${hourMightnight}`;
        const checkOut = `${this.props.checkOut}${hourEndDay}`;

        return (
            <div className="rs-dashhead m-b-lg">
                <div className="rs-dashhead-content">
                    <div className="rs-dashhead-titles">
                        <h6 className="rs-dashhead-subtitle text-uppercase">
                            Dashboard
                        </h6>
                        <h3 className="rs-dashhead-title m-t">
                            <div className="col-md-6">
                                <select className="form-control" onChange={this.onChangeProject.bind(this)}>
                                    <option disabled="disabled" selected="selected">Select a project</option>
                                    {this.renderProjectsOptions()}
                                </select>
                            </div>
                        </h3>
                        <div className="toggle-toolbar-btn">
                            <span className="fa fa-sort"/>
                        </div>
                    </div>
                    <div className="rs-dashhead-toolbar col-md-6">
                        <div className="col-md-6">
                            <div className="form-group has-feedback">
                                <label className="control-label">
                                    Start Date
                                </label>
                                <DatePicker
                                    id="checkInInput"
                                    value={checkIn}
                                    dateFormat="YYYY-MM-DD"
                                    showClearButton={false}
                                    onChange={this.onChangeCheckIn.bind(this)}
                                />
                                <span className="fa fa-calendar-o form-control-feedback" aria-hidden="true"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group has-feedback">
                                <label className="control-label">
                                    End Date
                                </label>
                                <DatePicker
                                    id="checkInOut"
                                    value={checkOut}
                                    dateFormat={dateFormat}
                                    showClearButton={false}
                                    onChange={this.onChangeCheckOut.bind(this)}
                                />
                                <span className="fa fa-calendar-o form-control-feedback" aria-hidden="true"/>
                            </div>
                        </div>
                    </div>
                </div>
                <ol className="breadcrumb">
                    <li>
                        <a href="javascript:void(0);">
                            <i className="fa fa-home m-r" />
                            Home
                        </a>
                    </li>
                    <li className="active">
                        Dashboard
                    </li>
                </ol>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        projects: reducers(state).getProjects.projects,
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreadCrumb);
