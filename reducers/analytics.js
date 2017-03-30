import { actions } from '../actions/constants';
import initialState from './initialState';


export function analytics(state = initialState.analytics, action = {}) {
    switch (action.type) {
        case actions.ANALYTICS_CREATING_REPORT:
            return Object.assign({}, state, {
                isCreatingReport: true
            });

        case actions.ANALYTICS_CREATED_REPORT:
            return Object.assign({}, state, {
                isCreatingReport: false
            });

        case actions.ANALYTICS_IS_FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            });

        case actions.ANALYTICS_IS_FETCHING_DONE:
            return Object.assign({}, state, {
                isFetching: false
            });

        case actions.ANALYTICS_LOAD_REPORTS:
            return Object.assign({}, state, {
                reports: action.payload.reports
            });

        case actions.ANALYTICS_REPORT_DATA:
            return Object.assign({}, state, {
                reportData: action.payload.reportData
            });

        default:
            return state;
    }
}
