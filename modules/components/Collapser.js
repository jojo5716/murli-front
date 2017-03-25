import React, { Component } from 'react';
import uuid from 'uuid';

export default class Collapser extends Component {
    render() {
        const boxID = uuid.v4();
        const idAnchor = `#${boxID}`;
        return (
            <div className="panel-body">
                <a className="btn btn-primary btn-block collapsed" role="button" data-toggle="collapse" href={idAnchor} aria-expanded="false" aria-controls={boxID}>
                    {this.props.title}
                </a>
                <div className="collapse" id={boxID} aria-expanded="false">
                    <div className="pre-wrapper">
                        <button className="btn btn-xs btn-lighten rs-pre-copy" data-clipboard-target="#foo">
                            Copy
                        </button>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}