import { actions } from '../actions/constants';

const initialPages = { pages: [], loading: true };

export function getPages(state = initialPages, action = {}) {
    switch (action.type) {
        case actions.changePages:
            return { pages: action.payload.pages };
        case actions.loadingPage:
            return {
                loading: action.payload.loading,
                pages: state.pages
            };
        default:
            return state;
    }
}
