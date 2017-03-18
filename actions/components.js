import 'isomorphic-fetch';

import { actions } from './constants';

function loadingComponents() {
    return {
        type: actions.LOADING_COMPONENTS
    };
}

function loadedComponents() {
    return {
        type: actions.LOADED_COMPONENTS
    };
}

module.exports = {
    loadingComponents,
    loadedComponents
};
