import React from 'react';
import { connect } from 'react-redux';

import reducers from '../reducers/';

import { getDateFormat } from '../helpers/dates';
import { hourMightnight, hourEndDay } from '../config';

// Services
import { getPagesByDate } from '../services/pages';

class Home extends React.Component {

    getPages() {
        const checkIn = getDateFormat(this.props.checkIn, hourMightnight);
        const checkOut = getDateFormat(this.props.checkOut, hourEndDay);


        getPagesByDate(checkIn, checkOut);
    }

    componentDidUpdate() {
        this.getPages();
    }

    componentDidMount() {
        this.getPages();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Home!</h1>
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
)(Home);
