import React from 'react';

export default class BoxChart extends React.Component {
    constructor() {
        super();
        this.types = {
            red: '05',
            green: '03'
        };
    }

    renderPercent() {
        return (
            <div className="panel-toolbar">
                <span className="badge bg-lightest text-white p-x">
                    <i className="gcon gcon-chevron-up m-r-xs"/>
                    {this.props.percent} %
                </span>
            </div>
        );
    }

    render() {
        const typeStyle = this.types[this.props.type];
        const boxClass = `quick-stat panel panel-rounded bg-grad bg-grad-${typeStyle} borderless`;

        return (
            <div className={boxClass}>
                <div className="panel-heading borderless">
                    <p className="subtitle text-lighten text-uppercase m-b-xs">
                        {this.props.title}
                    </p>
                    <h3 className="m-a-0 p-a-0">
                        {this.props.content} {this.props.textContent}
                    </h3>
                    { this.props.showPercent ? this.renderPercent() : null }
                </div>
                <div className="panel-body p-a">
                    <span className="spark-dash-01">
                    </span>
                </div>
            </div>
        );
    }
}

BoxChart.defaultProps = {
    type: 'green',
    showPercent: true,
    textContent: 'Visits'
};