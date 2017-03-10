import React from 'react';
import Menu from './Menu';
import Header from './Header';
import BreadCrumb from './BreadCrumb';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <article className="rs-content-wrapper">
                    <div className="rs-content">
                        <div className="rs-inner">
                            <BreadCrumb/>
                            {this.props.children}
                        </div>
                    </div>
                </article>

            </div>
        );
    }
}
