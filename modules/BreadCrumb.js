import React from 'react';
import { connect } from 'react-redux';

import reducers from '../reducers/';
import { changeCheckIn, changeCheckOut } from '../actions/';
import { dateFormat } from '../config';

class BreadCrumb extends React.Component {

    onChangeCheckIn(event) {
        this.props.dispatch(changeCheckIn(event.target.value));
    }

    onChangeCheckOut(event) {
        this.props.dispatch(changeCheckOut(event.target.value));
    }

    render() {
        const datesFormatLower = dateFormat.toLowerCase();

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
                    <div className="rs-dashhead-toolbar">
                        <div className="col-md-5">
                            <div className="form-group has-feedback">
                                <label className="control-label">
                                    Check-In Date
                                </label>
                                <input
                                    type="text"
                                    onChange={this.onChangeCheckIn.bind(this)}
                                    className="form-control rs-datepicker"
                                    id="checkInInput"
                                    data-date-format={datesFormatLower}
                                    placeholder={dateFormat}
                                    defaultValue={ this.props.checkIn }
                                    />
                                <span className="fa fa-calendar form-control-feedback" aria-hidden="true"/>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group has-feedback">
                                <label className="control-label">
                                    Check-In Date
                                </label>
                                <input
                                    type="text"
                                    onChange={this.onChangeCheckOut.bind(this)}
                                    className="form-control rs-datepicker"
                                    id="checkOutInput"
                                    data-date-format={datesFormatLower}
                                    placeholder={dateFormat}
                                    defaultValue={ this.props.checkOut }
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
        checkOut: reducers(state).dateCheckOut.date
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BreadCrumb);
