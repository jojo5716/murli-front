import { actions } from '../actions/constants';
import initialState from './initialState';


export function components(state = initialState.components, action = {}) {
    switch (action.type) {
        case actions.LOADING_COMPONENTS:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.LOADED_COMPONENTS:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}
