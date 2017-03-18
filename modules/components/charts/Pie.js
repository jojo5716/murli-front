import React from 'react';
import { Doughnut } from 'react-chartjs-2';



export default class PieComponent extends React.Component {

    render() {
        const data = {
            labels: this.props.devices,
            datasets: [{
                data: this.props.visits,
                backgroundColor: this.props.colors,
                hoverBackgroundColor: this.props.colors
            }]
        };

        return (
            <Doughnut data={data} />
        );
    }
}
