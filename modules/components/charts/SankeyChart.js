import React, { Component } from 'react';
import Sankey from 'paths-js/sankey';


var palette = ['#707b82', '#7881c2', '#3e90f0'];

export default class SankeyChart extends Component {
    constructor() {
        super();

    }
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
            data: this.props.data,
            width: 500,
            height: 400,
            gutter: 15,
            rectWidth: 10,
            nodeaccessor: x => x.id
        });

        let displayElement = 2;
        const curvedRectangles = sankey.curvedRectangles.map((r, i) => {
            return (
                <g>
                    <path d={r.curve.path.print()} fill="#acd1e9" style={{ opacity: this.opacity(i, displayElement) }}
                        onMouseEnter={() => { displayElement = r.index; }} />
                </g>
            );
        });

        const rectangles = sankey.rectangles.map((r) => {
            let text;
            const op = this.opacityRect(r.item, 1, 2);
            const x = r.curve.centroid[0];
            const y = r.curve.centroid[1];

            if (r.group < SankeyChart.data[0].nodes.length / 2) {
                const transform = `translate(${x + 7}, ${y})`;
                text = <text transform={transform} bstyle={{ opacity: op }} textAnchor='start'>{r.item.id}</text>;
            } else {
                const transform = `translate(${x - 7}, ${y})`;
                text = <text transform={transform} style={{ opacity: op }} textAnchor="end">{r.item.id}</text>;
            }

            return <g>
                <path d={r.curve.path.print()} fill={palette[r.group]} />
                {text}
            </g>;
        });

        return (
            <svg width={500} height={400}>
                {curvedRectangles}
                {rectangles}
            </svg>
        );
    }

}

SankeyChart.data = [
    {
        "nodes": [
            [
                {
                    "id": "Availability"
                },
                {
                    "id": "No availability"
                }
            ],
            [
                {
                    "id": "Booking"
                },
                {
                    "id": "Exit"
                }
            ]
        ],
        "links": [
            {
                "start": "Availability",
                "end": "Booking",
                "weight": 4
            },
            {
                "start": "Availability",
                "end": "Exit",
                "weight": 1
            }
        ]
    }
];
