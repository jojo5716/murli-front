import React from 'react';
import { connect } from 'react-redux';

// Components
import Menu from './Menu';
import Header from './Header';
import BreadCrumb from './BreadCrumb';
import Footer from './Footer';

import reducers from '../reducers/';
import { getDateFormat } from '../helpers/dates';
import { changeCheckIn, changeCheckOut, changePages, loadProjects } from '../actions/';
import { hourMightnight, hourEndDay, dateFormat } from '../config';

// Services
import { getPagesByDate } from '../services/pages';
import { getProjects } from '../services/project';


class App extends React.Component {

    componentDidMount() {
        getProjects().then(projects => {
            this.props.dispatch(loadProjects(projects.projects));
        });
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
        pages: reducers(state).getPages.pages,
        projects: reducers(state).loadProjects.projects
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
