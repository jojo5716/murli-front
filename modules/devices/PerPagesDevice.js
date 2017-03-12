import React from 'react';
import BoxChart from '../dummies/BoxChart';

//TODO: Agregar listado segmentado por pagina y dispositivo
// Ejem:
// Home
//   |
//   | --> Iphone: 13 %
//   | --> Android: 70%
// Offers
//   |
//   | ---> Iphone 15%
//   Con eso termina la seccion 
export default class PerPagesDevice extends React.Component {
    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="col-md-3">
                            <BoxChart
                                content="400"
                                title="All availability"
                                percent="20%"
                                type="red"
                            />
                        </div>

                        <div className="col-md-3">
                            <BoxChart
                                content="400"
                                title="All content pages"
                                percent="70%"
                                type="red"
                            />
                        </div>

                        <div className="col-md-3">
                            <BoxChart
                                content="400"
                                title="All non-availability"
                                percent="10%"
                                type="red"
                            />
                        </div>

                        <div className="col-md-3">
                            <BoxChart
                                content="400"
                                title="% Conversion"
                                percent="4.5%"
                                type="green"
                                />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-plain panel-rounded">
        					<div className="panel-heading borderless">
        						<h3 className="panel-title">Content pages</h3>
        						<p className="subtitle text-uppercase m-t-xs">4 sections</p>
        						<div className="panel-toolbar">
        							<ul className="list-inline m-a-0">
        							<li>
                                        <i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"></i>
                                    </li>
        							</ul>
        						</div>
        					</div>
        					<div className="panel-body p-t">
        						<div className="p-y-xs">
        							<label className="f-w-normal">
        								<i className="mcon mcon-trending_up m-r text-success"></i>
        								Home
        							</label>
        							<span className="label label-success m-a-0 p-x pull-right">98</span>
        						</div>
        					</div>
        				</div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-plain panel-rounded">
        					<div className="panel-heading borderless">
        						<h3 className="panel-title">Avilability pages</h3>
        						<p className="subtitle text-uppercase m-t-xs">4 sections</p>
        						<div className="panel-toolbar">
        							<ul className="list-inline m-a-0">
        							<li>
                                        <i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"></i>
                                    </li>
        							</ul>
        						</div>
        					</div>
        					<div className="panel-body p-t">
        						<div className="p-y-xs">
        							<label className="f-w-normal">
        								<i className="mcon mcon-trending_up m-r text-success"></i>
        								Home
        							</label>
        							<span className="label label-success m-a-0 p-x pull-right">98</span>
        						</div>
        					</div>
        				</div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-plain panel-rounded">
        					<div className="panel-heading borderless">
        						<h3 className="panel-title">Non availability pages</h3>
        						<p className="subtitle text-uppercase m-t-xs">4 sections</p>
        						<div className="panel-toolbar">
        							<ul className="list-inline m-a-0">
        							<li>
                                        <i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"></i>
                                    </li>
        							</ul>
        						</div>
        					</div>
        					<div className="panel-body p-t">
        						<div className="p-y-xs">
        							<label className="f-w-normal">
        								<i className="mcon mcon-trending_up m-r text-success"></i>
        								Home
        							</label>
        							<span className="label label-success m-a-0 p-x pull-right">98</span>
        						</div>
        					</div>
        				</div>
                    </div>
                </div>
            </div>
        );
    }
}
