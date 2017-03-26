import React from 'react';
import { connect } from 'react-redux';

// Components
import Menu from './components/Menu';
import Header from './components/Header';
import BreadCrumb from './components/BreadCrumb';
import Footer from './components/Footer';
import reducers from '../reducers/';
import { loadedComponents } from '../actions';
import EmptyData from './components/EmptyData';


class App extends React.Component {

    componentDidMount() {
        if (this.props.loadingComponents) {
            this.props.dispatch(loadedComponents());
        }
    }

    renderProjectNotFound() {
        return (
            <EmptyData title="Without project" message="Please select a project"/>
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
