import { actions } from '../actions/constants';

const initialPages = { pages: [] };

export function getPages(state = initialPages, action = {}) {
    switch (action.type) {
        case actions.changePages:
            return { pages: action.payload.pages };
        default:
            return state;
    }
}
