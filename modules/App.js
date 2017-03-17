import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

// Components
import Menu from './Menu';
import Header from './Header';
import BreadCrumb from './BreadCrumb';
import Footer from './Footer';

import reducers from '../reducers/';


class App extends React.Component {

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
                            { this.props.isFetching ? this.renderLoading() : this.renderPage() }
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
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        pages: reducers(state).getPages,
        loading: reducers(state).getPages.loading,
        projects: reducers(state).getProjects.projects,
        projectSelected: reducers(state).getProjects.projectSelected,
        isFetching: reducers(state).getProjects.isFetching,
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
