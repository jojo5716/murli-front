import React from 'react';
import { connect } from 'react-redux';
import reducers from '../reducers/';


class Home extends React.Component {
    render() {
        return (
            <h1>Home</h1>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).dateCheckIn.date,
        pages: reducers(state).getPages.pages
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
