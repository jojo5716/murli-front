import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

// Components
import Menu from './Menu';
import Header from './Header';
import BreadCrumb from './BreadCrumb';
import Footer from './Footer';

import reducers from '../reducers/';
import { getDateFormat } from '../helpers/dates';
import {
    changeCheckIn,
    changeCheckOut,
    changePages,
    loadProjects,
    loadingPage
} from '../actions/';
import { hourMightnight, hourEndDay, dateFormat } from '../config';

// Services
import { getPagesByDate } from '../services/pages';
import { getProjects } from '../services/project';


class App extends React.Component {

    componentDidMount() {
        getProjects().then(projects => {
            this.props.dispatch(loadProjects(projects.projects));
            this.props.dispatch(loadingPage(false));
        });
    }

    renderLoading() {
        return (
            <div className="row">
                <div className="col-md-12 loadingContent">
                    <Spinner spinnerName="three-bounce"/>
                </div>

            </div>

        );
    }

    renderProjectNotFound() {
        const style = { marginTop: '-98.5px', marginBottom: '75px' };

        return (
            <div className="special-page-content text-center v-centered" style={style}>
                <h2 className="f-w-700 heading-text-xl m-a-0">
                    Without project
                </h2>
                <h5 className="f-w-400 f-l-15 text-uppercase text-muted">
                    Please select a project
                </h5>
            </div>
        );
    }

    renderPage() {
        if (this.props.projectSelected) {
            return this.props.children;
        }
        return this.renderProjectNotFound();
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
                            { this.props.loading ? this.renderLoading() : this.renderPage() }
                        </div>
                    </div>
                </article>
                <Footer/>
            </div>
        );
    }
}

//
const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).dateCheckIn.date,
        checkOut: reducers(state).dateCheckOut.date,
        pages: reducers(state).getPages.pages,
        loading: reducers(state).getPages.loading,
        projects: reducers(state).loadProjects.projects,
        projectSelected: reducers(state).loadProjects.projectSelected
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
