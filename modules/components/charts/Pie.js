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
        <div className="stacked-item panel panel-plain">
            <div className="panel-heading borderless">
                <h3 className="panel-title">{this.props.title}</h3>
                <div className="panel-toolbar v-centered" >
                    <p className="subtitle text-uppercase m-a-0">{this.props.subtitle}</p>
                </div>
            </div>
            <div className="panel-body">
                <Doughnut data={data} />
            </div>
        </div>

        );
    }
}
