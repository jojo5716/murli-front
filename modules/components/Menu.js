import React from 'react';

import NavLink from './NavLink';

export default class Menu extends React.Component {
    render() {
        return (
            <aside className="rs-sidebar">
                <ul className="rs-sidebar-nav default-sidebar-nav">
                    <li className="rs-user-sidebar">
                        <a href="javascript:void(0);">
                            Hi! Jonathan
                            <span className="subname text-uppercase m-t">Roiback</span>
                        </a>

                    </li>

                    <li className="menu-block-divider"/>
                    <li className="menu-header">Main menu</li>

                    <li>
                        <NavLink to="/" onlyActiveOnIndex>
                            <span className="icon-home rs-icon-menu"/>
                            Dashboard
                        </NavLink>

                    </li>
                    <li>
                        <a href="javascript:void(0);">
                            <span className="badge badge-danger">1</span>
                            <span className="gcon gcon-browser rs-icon-menu"/>
                            Devices
                        </a>
                        <ul>
                            <li>
                                <NavLink to="/devices/dashboard">
                                    <span className="icon-chart-pie rs-icon-menu"/>
                                     Devices on all pages
                                </NavLink>
                                <NavLink to="/devices/per-pages">
                                    <span className="icon-chart-pie rs-icon-menu"/>
                                     Devices per page
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
        );
    }
}
