import { actions } from '../actions/constants';

const initialStateProjects = { projects: [], projectSelected: null };


export function loadProjects(state = initialStateProjects, action = {}) {
    switch (action.type) {
        case actions.loadProjects:
            return { projects: action.payload.projects };
        case actions.changeProject:
            return {
                projectSelected: action.payload.projectSelected,
                projects: state.projects
            };
        default:
            return state;
    }
}
