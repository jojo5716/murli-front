import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import EmptyData from '../../components/EmptyData';


export default class GoogleChart extends Component {
    renderChart() {
        const options = {
            title: this.props.titleChart,
            hAxis: { title: this.props.hAxis },
            vAxis: { title: this.props.hvAxis },
            legend: 'none'
        };

        return (
            <Chart
                chartType={this.props.chartType}
                data={this.props.data}
                width="100%"
                options={options}
            />
        );
    }

    render() {
        return this.props.data.length > 0 ? this.renderChart() : <EmptyData/>;
    }
}

GoogleChart.defaultProps = {
    data: [],
    header: [],
    titleChart: '',
    hAxis: '',
    vAxis: '',
    chartType: 'BarChart'
};
