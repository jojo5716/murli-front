import React from 'react';
import { connect } from 'react-redux';
import reducers from '../../../reducers/';
import BoxChart from '../../components/BoxChart';

import { groupBySections } from '../../../helpers/pages';
import { formatDevicesPagesIfNeeded } from '../../../actions/';
import Loader from '../../components/Loader';

class PerPagesDevice extends React.Component {

    refreshData() {
        const pages = this.props.navigationPages || [];
        const loading = this.props.loadingDevicesPages;

        if (pages.length > 0 && loading) {
            this.props.dispatch(formatDevicesPagesIfNeeded());
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.navigationPages !== this.props.navigationPages) {
            this.refreshData();
        }
    }

    renderPage(pages) {
        const totalAvailability = pages.availabilityDestination.total + pages.availability.total;
        const totalPagesVisited = totalAvailability + pages.content.total + pages.noAvailability.total;

        const totalConversionPages = pages.availability.total + pages.content.total;
        const conversionBooking = ((pages.booking.total * 100) / totalConversionPages) * 10 || 0;

        const percentContentVisited = ((pages.content.total * 100) / totalPagesVisited) || 0;
        const percentAvailabilityVisited = ((pages.availability.total * 100) / totalPagesVisited) || 0;
        const percentNonAvailabilityVisited = ((pages.noAvailability.total * 100) / totalPagesVisited) || 0;

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
                </div>
            </div>
        );
    }

    render() {
        const loading = this.props.loadingDevicesPages;
        const pagesData = this.props.devicesPagesData;

        if (loading) {
            return <Loader/>;
        }

        if (pagesData) {
            return this.renderPage(pagesData);
        }

        return null;

    }
}

const mapStateToProps = (state) => {
    return {
        checkIn: reducers(state).getDates.checkIn,
        checkOut: reducers(state).getDates.checkOut,
        navigationPages: reducers(state).getPages.navigationPages,
        loadingDevicesPages: reducers(state).components.loading,
        devicesPagesData: reducers(state).devices.devicesPagesData
    };
};

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PerPagesDevice);
