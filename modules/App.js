import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Menu from './Menu';
import Header from './Header';
import BreadCrumb from './BreadCrumb';
import Footer from './Footer';

import reducers from '../reducers/';

class App extends React.Component {
    componentDidMount() {
        console.log(this.props);
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
        checkOut: reducers(state).dateCheckOut.date
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
