import React from 'react';
import { connect } from 'react-redux';
import reducers from '../../../reducers/';
import BoxChart from '../../components/BoxChart';

import { groupBySections } from '../../../helpers/pages';

class PerPagesDevice extends React.Component {

	renderPagesBySection(pages) {
		const html = [];

		for (const url in pages.urls) {
			html.push(
				<div className="p-y-xs">
					<label className="f-w-normal">
						<i className="mcon mcon-trending_up m-r text-success"/>
						{url}
					</label>
					<span className="label label-success m-a-0 p-x pull-right">
						{pages.urls[url]}
					</span>
				</div>
			);
		}
		return html;
	}

    render() {
		const pages = groupBySections(this.props.navigationPages  || []);
		console.log(pages);

		const totalAvailability = pages.availabilityDestination.total + pages.availability.total;
		const totalPagesVisited = totalAvailability + pages.content.total + pages.noAvailability.total;

		const totalConversionPages = pages.availability.total + pages.content.total;
		const conversionBooking = ((pages.booking.total * 100) / totalConversionPages) * 10 || 0;

		const percentContentVisited = ((pages.content.total * 100) / totalPagesVisited) || 0;
		const percentAvailabilityVisited = ((pages.availability.total * 100) / totalPagesVisited) || 0;
		const percentNonAvailabilityVisited = ((pages.noAvailability.total * 100) / totalPagesVisited) || 0;

		const renderContentPagesBySection = this.renderPagesBySection(pages.content);
		const renderAvailabilityPagesBySection = this.renderPagesBySection(pages.availability);
		const renderNonAvailabilityPagesBySection = this.renderPagesBySection(pages.noAvailability);

		const contentPages = Object.keys(pages.content.urls).length;
		const availabilityPages = Object.keys(pages.availability.urls).length;
		const nonAvailabilityPages = Object.keys(pages.noAvailability.urls).length;


        return (
            <div className="container-fluid">
				 <div className="row">
                    <div className="col-lg-12">
                        <div className="col-md-3">
                            <BoxChart
                                content={totalAvailability}
                                title="All availability"
                                percent={percentAvailabilityVisited.toFixed(2)}
                                type="red"
                            />
                        </div>

                        <div className="col-md-3">
                            <BoxChart
                                content={pages.content.total}
                                title="All content pages"
                                percent={percentContentVisited.toFixed(2)}
                                type="red"
                            />
                        </div>

                        <div className="col-md-3">
                            <BoxChart
                                content={pages.noAvailability.total}
                                title="All non-availability"
                                percent={percentNonAvailabilityVisited.toFixed(2)}
                                type="red"
                            />
                        </div>

                        <div className="col-md-3">
                            <BoxChart
                                content={pages.booking.total}
                                title="% Conversion"
                                percent={conversionBooking.toFixed(2)}
                                type="green"
                                />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-plain panel-rounded">
							<div className="panel-heading borderless">
        						<h3 className="panel-title">Content pages</h3>
        						<p className="subtitle text-uppercase m-t-xs">{contentPages} sections</p>
        						<div className="panel-toolbar">
        							<ul className="list-inline m-a-0">
        							<li>
                                        <i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"/>
                                    </li>
        							</ul>
        						</div>
        					</div>
        					<div className="panel-body p-t">
								{ renderContentPagesBySection }
        					</div>
        				</div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-plain panel-rounded">
							<div className="panel-heading borderless">
								<h3 className="panel-title">Avilability pages</h3>
								<p className="subtitle text-uppercase m-t-xs">{availabilityPages} sections</p>
								<div className="panel-toolbar">
									<ul className="list-inline m-a-0">
									<li>
										<i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"/>
									</li>
									</ul>
								</div>
        					</div>
        					<div className="panel-body p-t">
								{renderAvailabilityPagesBySection}
        					</div>
        				</div>
                    </div>

                    <div className="col-lg-4">
                        <div className="panel panel-plain panel-rounded">
        					<div className="panel-heading borderless">
        						<h3 className="panel-title">Non availability pages</h3>
        						<p className="subtitle text-uppercase m-t-xs">{nonAvailabilityPages} sections</p>
								<div className="panel-toolbar">
									<ul className="list-inline m-a-0">
										<li>
											<i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"/>
										</li>
									</ul>
								</div>
        					</div>
        					<div className="panel-body p-t">
								{renderNonAvailabilityPagesBySection}
        					</div>
        				</div>
                    </div>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		checkIn: reducers(state).getDates.checkIn,
		checkOut: reducers(state).getDates.checkOut,
        navigationPages: reducers(state).getPages.navigationPages
	};
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PerPagesDevice);
