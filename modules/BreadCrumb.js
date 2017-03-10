import React from 'react';

export default class BreadCrumb extends React.Component {
    render() {
        return (
        <div className="rs-dashhead m-b-lg">
            <div className="rs-dashhead-content">
                <div className="rs-dashhead-titles">
                    <h3 className="rs-dashhead-title">
                        Home
                    </h3>
                    <div className="toggle-toolbar-btn">
                        <span className="fa fa-sort"/>
                    </div>
                </div>
                <div className="rs-dashhead-toolbar">
                    <h6 className="rs-dashhead-subtitle text-uppercase">
                        Hotel Prince park
                    </h6>
                </div>
            </div>
            <ol className="breadcrumb">
                <li>
                    <a href="javascript:void(0);">
                        <i className="fa fa-home m-r"/>
                        Home
                    </a>
                </li>
                <li className="active">
                    Dashboard
                </li>
            </ol>
        </div>
        );
    }
}
