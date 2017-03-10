import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Header from './Header';
import BreadCrumb from './BreadCrumb';
import Footer from './Footer';

import reducers from '../reducers/';
import { getDateFormat } from '../helpers/dates';
import { hourMightnight, hourEndDay } from '../config';
import { changePages } from '../actions/';
// Services
import { getPagesByDate } from '../services/pages';

class App extends React.Component {
    getPages() {
        const checkIn = getDateFormat(this.props.checkIn, hourMightnight);
        const checkOut = getDateFormat(this.props.checkOut, hourEndDay);


        //const pages = getPagesByDate(checkIn, checkOut);
        //this.props.dispatch(changePages([1, 2]));
    }

    componentDidUpdate() {
        this.getPages();
    }

    componentDidMount() {
        this.getPages();
    }

    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <article className="rs-content-wrapper">
                    <div className="rs-content">
                        <div className="rs-inner">
                            <BreadCrumb />
                            {this.props.children}
                        </div>
                    </div>
                </article>
                <Footer/>
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
)(App);
