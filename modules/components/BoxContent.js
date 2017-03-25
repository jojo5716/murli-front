import React, { Component } from 'react';

export default class BoxContent extends Component {
    render() {
        return (
            <div className="panel panel-plain panel-rounded">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { this.props.title }
                    </h3>
                    <p className="subtitle text-uppercase m-t">
                        { this.props.subtitle }
                    </p>
                    <div className="panel-toolbar v-centered" >
                        <ul className="list-inline m-a-0">
                            <li>
                                <i className="rs-close-panel icon-toolbar gcon gcon-cross"/>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="panel-body">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
