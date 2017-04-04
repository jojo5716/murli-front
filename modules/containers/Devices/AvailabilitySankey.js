import React, { Component } from 'react';
import { connect } from 'react-redux';

import reducers from '../../../reducers/';
import BoxContent from '../../components/BoxContent';
import SankeyChart from '../../components/charts/SankeyChart';
import { sankeyChart } from '../../../helpers/sankeyCharts';


class AvailabilitySankey extends Component {
    renderPage() {
        const centerStyle = { textAlign: 'center' };
        const sankeyData = sankeyChart(this.props.navigationPages);

        console.log(sankeyData);

        return (
            <div style={centerStyle}>
                <BoxContent
                    title="Availability to booking"
                    subtitle="Diagram Availability vs No availability to booking or exit">
                    <div className="row">
                        <div className="col-md-6">
                            <SankeyChart data={sankeyData} type='global'/>
                        </div>

                        <div className="col-md-5">
                            <table className="table rs-table table-striped table-hover table-b-t">
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>Destination</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Availability to booking</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Availability to exit</td>
                                        <td>40</td>
                                    </tr>
                                    <tr>
                                        <td>No availability to booking</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>No availability to exit</td>
                                        <td>40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </BoxContent>
            </div>
        );
    }

    render() {
        if (this.props.loadingComponents || this.props.navigationPages.length === 0) {
            return null;
        }

        return this.renderPage();
    }
}


const mapStateToProps = (state) => {
    return {
        navigationPages: reducers(state).getPages.navigationPages,
        loadingComponents: reducers(state).components.loading
    };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailabilitySankey);
