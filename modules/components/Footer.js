import React from 'react';

export default class Footer extends React.Component {
    render() {
        const today = new Date();

        return (
            <div>
                <footer className="rs-footer absolute-footer">
                    <span className="text-muted small">
                        Created by Jonathan Rodríguez &copy; {today.getFullYear()}
                    </span>
                </footer>
            </div>
        );
    }
}
