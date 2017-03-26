import React from 'react';
import NavLink from './NavLink';

export default class App extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default rs-navbar navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header has-right-divider">
                        <div className="rs-logo fixed-width">
                            <NavLink to="/" className="navbar-brand">
                                <img
                                    alt="Roiback"
                                    src="https://bookcore.backhotelengine.com/crs/static/imgs/logo_pre.png"
                                />
                            </NavLink>
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
                </div>
            </nav>
        );
    }
}
