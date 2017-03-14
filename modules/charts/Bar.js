import React from 'react';
import { Bar } from 'react-chartjs-2';



export default class PieComponent extends React.Component {

    render() {
        const dataValues = Object.keys(this.props.data).map((key) => {
            return this.props.data[key];
        });

        const data = {
            labels: Object.keys(this.props.data),
            datasets: [{
                label: 'Visits',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataValues
            }]
        };

        return (
            <Bar data={data} />
        );
    }
}
