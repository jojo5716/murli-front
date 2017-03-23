import { actions } from '../actions/constants';
import initialState from './initialState';

const initialStateProjects = {
    projects: initialState.projects,
    projectSelected: initialState.projectSelected
};


export function getProjects(state = initialStateProjects, action = {}) {
    switch (action.type) {

        case actions.REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true,
                projects: action.payload.projects
            });

        case actions.RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                projects: action.payload.projects
            });

        case actions.CHANGE_PROJECT_SELECTED:
            return Object.assign({}, state, {
                projectSelected: action.payload.projectSelected
            });

        default:
            return state;
    }
}
