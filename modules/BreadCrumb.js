import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';

import reducers from '../reducers/';
import { getDateFormat } from '../helpers/dates';
import { changeCheckIn, changeCheckOut, changePages, loadProjects, changeProject } from '../actions/';
import { hourMightnight, dateFormat, hourEndDay } from '../config';

// Services
import { getPagesByDate } from '../services/pages';


class BreadCrumb extends React.Component {
    getPagesFromFetch() {
        const checkIn = getDateFormat(this.props.checkIn, hourMightnight);
        const checkOut = getDateFormat(this.props.checkOut, hourEndDay);

        getPagesByDate(checkIn, checkOut).then(navigationPages => {
            this.props.dispatch(changePages(navigationPages.navigationPages));
        });
    }

    onChangeCheckIn(value) {
        this.getPagesFromFetch();
        const date = moment(value).format(dateFormat);
        this.props.dispatch(changeCheckIn(date));
        this.getPagesFromFetch();
    }

    onChangeCheckOut(value) {
        const date = moment(value).format(dateFormat);
        this.props.dispatch(changeCheckOut(date));
        this.getPagesFromFetch();
    }

    onChangeProject(event) {
        this.props.dispatch(changeProject(event.target.value));
    }

    renderProjectsList() {
        const html = [];
        for (let i = 0; i < this.props.projects.length; i += 1) {
            const project = this.props.projects[i];

            html.push(
                <option value={project._id} key={i}>{project.name}</option>
            );
        }
        return (
            <select className="form-control" onChange={this.onChangeProject.bind(this)}>
                <option disabled="disabled">Select a project</option>
                {html}
            </select>
        );
    }

    render() {
        const checkIn = `${this.props.checkIn}${hourMightnight}`;
        const checkOut = `${this.props.checkOut}${hourMightnight}`;
        console.log(`PROJECT SELECTED: ${this.props.projectSelected}`);

        return (
            <div className="rs-dashhead m-b-lg">
                <div className="rs-dashhead-content">
                    <div className="rs-dashhead-titles">
                        <h6 className="rs-dashhead-subtitle text-uppercase">
                            Dashboard
                        </h6>
                        <h3 className="rs-dashhead-title m-t">
                            <div className="col-md-6">
                                {this.renderProjectsList()}
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
                                    Check-In Date
                                </label>
                                <DatePicker
                                    id="checkInInput"
                                    value={checkIn}
                                    dateFormat="YYYY-MM-DD"
                                    onChange={this.onChangeCheckIn.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group has-feedback">
                                <label className="control-label">
                                    Check-Out Date
                                </label>
                                <DatePicker
                                    id="checkInOut"
                                    value={checkOut}
                                    dateFormat={dateFormat}
                                    onChange={this.onChangeCheckOut.bind(this)}
                                />
                                <span className="fa fa-calendar form-control-feedback" aria-hidden="true"/>
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
        checkIn: reducers(state).dateCheckIn.date,
        checkOut: reducers(state).dateCheckOut.date,
        pages: reducers(state).getPages.pages,
        projects: reducers(state).loadProjects.projects,
        projectSelected: reducers(state).loadProjects.projectSelected
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreadCrumb);
