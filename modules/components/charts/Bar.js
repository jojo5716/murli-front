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
            <div className="stacked-item panel panel-plain">
                <div className="panel-heading borderless">
                    <h3 className="panel-title">{this.props.title}</h3>
                    <div className="panel-toolbar v-centered" >
                        <p className="subtitle text-uppercase m-a-0">{this.props.subtitle}</p>
                    </div>
                </div>
                <div className="panel-body">
                    <Bar data={data} />
                </div>
            </div>

        );
    }
}
