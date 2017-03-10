import React from 'react';
import NavLink from './NavLink';
import Menu from './Menu';

export default class App extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default rs-navbar navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header has-right-divider">
                        <div className="rs-logo fixed-width">
                            <a className="navbar-brand" href="index.html">
                                <img
                                    alt="Brand"
                                    src="http://bookcore.backhotelengine.com/crs/static/imgs/logo_pre.png"
                                />
                            </a>
                        </div>
                        <button
                            type="button"
                            className="navbar-toggle collapsed sidebar-toggle"
                            id="rs-sidebar-toggle-mobile">
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#roosa-nav-collapse"
                            aria-expanded="false">
                            <span className="gcon gcon-dots-three-vertical f-s-sm"/>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="roosa-nav-collapse">
                        <div className="navbar-right">
                            <ul className="nav navbar-nav">
                                <li className="rs-user-nav dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="circle-notification badge-notification bg-success"/>
                                        <img src="../images/avatars/01.png" className="rs-nav-avatar img-circle" alt="Avatar"/>
                                            <span className="visible-xs-inline-block m-l">
                                                Welcome,
                                                <strong>USER</strong>
                                            </span>
                                    </a>
                                    <ul className="dropdown-menu lg-dropdown">
                                        <li className="dropdown-header text-uppercase">Account Settings</li>
                                        <li className="menu-icon">
                                            <a href="javascript:void(0);">
                                                <span className="gcon gcon-lock-open rs-dropdown-icon"/>
                                                Change Password
                                            </a>
                                        </li>
                                        <li className="menu-icon">
                                            <a href="javascript:void(0);">
                                                <span className="gcon gcon-log-out rs-dropdown-icon"/>
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    );
    }
}
