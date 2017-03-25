import React, { Component } from 'react';

export default class EmptyData extends Component {
    render() {
        const style = { marginTop: '-98.5px', marginBottom: '75px' };

        return (
            <div className="special-page-content text-center v-centered" style={style}>
                <h2 className="f-w-700 heading-text-xl m-a-0">
                    {this.props.title}
                </h2>
                <h5 className="f-w-400 f-l-15 text-uppercase text-muted">
                    {this.props.message}
                </h5>
            </div>
        );
    }
}

EmptyData.defaultProps = {
    title: 'No data',
    message: 'No data to show'
};
