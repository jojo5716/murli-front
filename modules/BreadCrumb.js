import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-bootstrap-date-picker';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';

import reducers from '../reducers/';
import { getDateFormat } from '../helpers/dates';
import { changeCheckIn, changeCheckOut, changePages } from '../actions/';
import { hourMightnight, hourEndDay, dateFormat } from '../config';

// Services
import { getPagesByDate } from '../services/pages';


class BreadCrumb extends React.Component {

    getPages() {
        const checkIn = getDateFormat(this.props.checkIn, hourMightnight);
        const checkOut = getDateFormat(this.props.checkOut, hourEndDay);

        getPagesByDate(checkIn, checkOut).then(navigationPages => {
            this.props.dispatch(changePages(navigationPages.navigationPages));
        });
    }

    componentDidMount() {
        this.getPages();
    }

    onChangeCheckIn(value) {
        this.getPages();
        const date = moment(value).format('YYYY-MM-DD');

        this.props.dispatch(changeCheckIn(date));
        this.getPages();
    }

    onChangeCheckOut(value) {
        const date = moment(value).format('YYYY-MM-DD');

        this.props.dispatch(changeCheckOut(date));
        this.getPages();
    }

    render() {
        const checkIn = `${this.props.checkIn}T00:00:00.000Z`;
        const checkOut = `${this.props.checkOut}T00:00:00.000Z`;

        return (
            <div className="rs-dashhead m-b-lg">
                <div className="rs-dashhead-content">
                    <div className="rs-dashhead-titles">
                        <h6 className="rs-dashhead-subtitle text-uppercase">
                            Dashboard
                        </h6>
                        <h3 className="rs-dashhead-title m-t">
                            Hotel Prince park
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
                                    dateFormat="YYYY-MM-DD"
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
                            <i className="fa fa-home m-r"/>
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
        pages: reducers(state).getPages.pages
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreadCrumb);
