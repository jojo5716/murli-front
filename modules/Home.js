import React from 'react';
import { connect } from 'react-redux';

import reducers from '../reducers/';


class Home extends React.Component {

    render() {

        return (
            <div className="container-fluid">
                <h1>Home! -> { this.props.pages }</h1>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        pages: reducers(state).getPages.pages
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
