import React, { Component } from 'react';

import Loading from 'halogen/SyncLoader';


export default class Loader extends Component {
    render() {
        const style = { textAlign: 'center' };

        return (
            <div style={style}>
                <Loading color="#26A65B" size="16px" margin="4px" />
            </div>
        );
    }
}
