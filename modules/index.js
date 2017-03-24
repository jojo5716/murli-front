import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { AsyncComponentProvider } from 'react-async-component';

// Components
import Menu from './components/Menu';
import Header from './components/Header';
import BreadCrumb from './components/BreadCrumb';
import Footer from './components/Footer';

import reducers from '../reducers/';
import { loadedComponents } from '../actions';
import Loader from './components/Loader';

class App extends React.Component {

    componentDidMount() {
        if (this.props.loadingComponents) {
            this.props.dispatch(loadedComponents());
        }
    }

    renderLoading() {
        return (
            <Loader/>
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

    renderChildren() {
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
                            { this.renderChildren() }
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
        pages: reducers(state).getPages.navigationPages,
        projects: reducers(state).getProjects.projects,
        projectSelected: reducers(state).getProjects.projectSelected,
        isFetching: reducers(state).getProjects.isFetching,
        loadingComponents: reducers(state).components.loading
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
