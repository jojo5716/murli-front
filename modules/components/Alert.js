import React, { Component } from 'react';

export default class Alert extends Component {
    render() {
        const classAlert = `alert alert-${this.props.type} alert-simple alert-dismissible fade in iconic-alert`;

        return (
            <div className={classAlert} role="alert">
                <div className="alert-icon">
                    <span className="gcon gcon-info-with-circle centered-xy"/>
                </div>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">
                        <span className="mcon mcon-close"/>
                    </span>
                </button>
                <strong>{ this.props.title } </strong>
                { this.props.message }
            </div>
        );
    }
}

Alert.defaultProps = {
    title: 'Heads up!',
    message: '',
    type: 'info'
};
