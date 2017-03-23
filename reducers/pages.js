import { actions } from '../actions/constants';
import initialState from './initialState';

export function getPages(state = initialState, action = {}) {
    switch (action.type) {
        case actions.CHANGE_PAGES:
            return Object.assign({}, state, {
                navigationPages: action.payload.navigationPages
            });
        default:
            return state;
    }
}
