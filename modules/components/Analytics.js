import React, { Component } from 'react';

export default class Analytics extends Component {

    componentDidMount() {
        gapi.signin2.render('g-signin2', {
            scope: 'profile email',
            width: 240,
            height: 50,
            longtitle: true,
            theme: 'dark',
            onsuccess: this.onsuccess.bind(this),
            onfailure: (error) => { console.log(error); }
        });
    }

    onsuccess(googleUser) {
        gapi.client.request({
            path: '/v4/reports:batchGet',
            root: 'https://analyticsreporting.googleapis.com/',
            method: 'POST',
            body: {
                reportRequests: [
                    {
                        viewId: this.props.clientID,
                        dateRanges: [
                            {
                                startDate: this.props.startDate,
                                endDate: this.props.endDate
                            }
                        ],
                        metrics: this.props.metrics,
                        dimensions: this.props.dimensions,
                        filtersExpression: "ga:pagepath=~availability"
                    }
                ]
            }
        }).then(response => this.props.onSuccess(response), this.props.onFailure);
    }

    render() {
        return (
            <div id="g-signin2" data-onsuccess="d"></div>
        )
    }
}