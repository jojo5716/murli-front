import React from 'react';
import { Bar } from 'react-chartjs-2';



export default class PieComponent extends React.Component {

    render() {
        const style = {width: '275px', display: 'block', height: '193px'};
        const pieData = this.props.data;


        var data = {
            labels: Object.keys(this.props.data),
            datasets: [{
                label: 'Visits',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Object.values(this.props.data)
            }]
        };

        return (
            <Bar data={data} />
        );
    }
}
