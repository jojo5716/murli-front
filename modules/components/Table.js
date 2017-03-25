import React, { Component } from 'react';
import _ from 'lodash';


export default class Table extends Component {
    renderHeads() {
        const html = [];
        _.forEach(this.props.theads, (head) =>{
            html.push(<th>{head}</th>)
        });

        return html;
    }

    renderBody() {
        const html = [];

        _.forEach(this.props.tbody, (bodies) => {
            html.push(
                <tr>
                    { _.forEach(bodies, (body) => {
                        return <td>{body}</td>;
                    })}
                </tr>
            );
        });

        return html;
    }
    render() {
        return (
            <table className="table rs-table table-striped table-hover table-b-t">
                <thead>
                <tr>
                    {_.forEach(this.props.theads, (head) => {
                        <th>{head}</th>
                    })}
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        );
    }
}

Table.defaultProps = {
    theads: [],
    tbody: [],
    type: 'table-bordered'
};
