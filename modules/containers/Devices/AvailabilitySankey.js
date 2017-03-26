import React, { Component } from 'react';
import Sankey from 'paths-js/sankey';
import BoxContent from '../../components/BoxContent';


var palette = ['#707b82', '#7881c2', '#3e90f0'];

export default class AvailabilitySankey extends Component {
    opacity(i, j) {
        if (j === null) return 0.7;
        if (j === i) return 1;
        return 0.3;
    }

    opacityRect(item, start, end) {
        if (start === null) return 0.7;
        if ((item.id === start) || (item.id === end)) return 1;
        return 0.3;
    }

    render() {
        const sankey = Sankey({
            data: AvailabilitySankey.data[0],
            width: 500,
            height: 400,
            gutter: 15,
            rectWidth: 10,
            nodeaccessor: function(x) { return x.id; }
        });

        const curvedRectangles = sankey.curvedRectangles.map((r, i) => {
            return (
                <g>
                    <path d={ r.curve.path.print() } fill="#acd1e9" style={{ opacity: this.opacity(i, 1) }}
                      onMouseEnter={ () => { console.log(r); }} />
                </g>
            );
        });

        const rectangles = sankey.rectangles.map((r) => {
            let text;
            const op = this.opacityRect(r.item, 1, 2);
            const x = r.curve.centroid[0];
            const y = r.curve.centroid[1];

            if (r.group < AvailabilitySankey.data[0].nodes.length / 2) {
                const transform = `translate(${x + 7}, ${y})`;
                text = <text transform={ transform } bstyle={{ opacity: op }} textAnchor='start'>{ r.item.id }</text>;
            } else {
                const transform = `translate(${x - 7}, ${y})`;
                text = <text transform={ transform } style={{ opacity: op }} textAnchor="end">{ r.item.id }</text>;
            }

            return <g>
                <path d={ r.curve.path.print() } fill={ palette[r.group] } />
                { text }
            </g>;
        });

        const centerStyle = { textAlign: 'center' };
        return (
            <div style={centerStyle}>
                <BoxContent title="Availability to booking" subtitle="Diagram Availability vs No availability to booking or exit">
                    <div className="row">
                        <div className="col-md-6">
                            <svg width={ 500 } height={ 400 }>
                                { curvedRectangles }
                                { rectangles }
                            </svg>
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

}

AvailabilitySankey.data = [
    {
        "nodes":[
            [
                {
                    "id":"Availability"
                },
                {
                    "id":"No availability"
                }
            ],
            [
                {
                    "id":"Booking"
                },
                {
                    "id":"Exit"
                }
            ]
        ],
        "links":[
            {
                "start":"Availability",
                "end":"Booking",
                "weight":0
            },
            {
                "start":"Availability",
                "end":"Exit",
                "weight":10
            },
            {
                "start":"Availability",
                "end":"Booking",
                "weight":30
            },
            {
                "start":"No availability",
                "end":"Booking",
                "weight":10
            },
            {
                "start":"No availability",
                "end":"Booking",
                "weight":10
            },
            {
                "start":"No availability",
                "end":"Exit",
                "weight":10
            },
            {
                "start":"Availability",
                "end":"Booking",
                "weight":30
            },
            {
                "start":"Booking",
                "end":"Exit",
                "weight":20
            },
            {
                "start":"Exit",
                "end":"Exit",
                "weight":10
            },
            {
                "start":"Booking",
                "end":"Booking",
                "weight":30
            },
            {
                "start":"Availability",
                "end":"Exit",
                "weight":25
            }
        ]
    },
    {
        "nodes":[
            [
                {
                    "id":"Availability"
                },
                {
                    "id":"No availability"
                }
            ],
            [
                {
                    "id":"Booking"
                },
                {
                    "id":"Exit"
                }
            ]
        ],
        "links":[
            {
                "start":"Availability",
                "end":"Booking",
                "weight":10
            },
            {
                "start":"Availability",
                "end":"Exit",
                "weight":10
            },
            {
                "start":"Availability",
                "end":"Booking",
                "weight":20
            },
            {
                "start":"No availability",
                "end":"Booking",
                "weight":30
            },
            {
                "start":"No availability",
                "end":"Booking",
                "weight":0
            },
            {
                "start":"No availability",
                "end":"Exit",
                "weight":10
            },
            {
                "start":"Availability",
                "end":"Booking",
                "weight":45
            },
            {
                "start":"Booking",
                "end":"Exit",
                "weight":40
            },
            {
                "start":"Exit",
                "end":"Exit",
                "weight":50
            },
            {
                "start":"Booking",
                "end":"Booking",
                "weight":10
            },
            {
                "start":"Availability",
                "end":"Exit",
                "weight":10
            }
        ]
    }
];
