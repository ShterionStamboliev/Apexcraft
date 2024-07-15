import { ProjectAction, ProjectActionType } from '@/types/project-types/projectActionTypes';
import { Project } from '@/types/project-types/projectTypes';

interface InitialProjectState {
    project: Project[];
    isLoading: boolean;
    isProjectLoading: boolean;
    error?: string;
}

export const initialState: InitialProjectState = {
    project: [],
    isProjectLoading: false,
    isLoading: false,
    error: undefined,
};

const projectReducer = (state: InitialProjectState, action: ProjectAction) => {
    switch (action.type) {
        case ProjectActionType.CREATE_PROJECT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case ProjectActionType.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                project: [...state.project, action.payload],
            };
        case ProjectActionType.CREATE_PROJECT_ERROR:
            return {
                ...state,
                isProjectLoading: false,
                error: action.payload.error,
            };
        case ProjectActionType.GET_PROJECT_REQUEST:
            return {
                ...state,
                isProjectLoading: true,
                error: undefined,
            };
        case ProjectActionType.GET_PROJECT_SUCCESS:
            return {
                ...state,
                isProjectLoading: false,
                project: [...state.project],
            };
        case ProjectActionType.GET_PROJECT_ERROR:
            return {
                ...state,
                isProjectLoading: false,
                error: action.payload.error,
            };
        case ProjectActionType.GET_PROJECTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case ProjectActionType.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                project: action.payload,
            };
        case ProjectActionType.GET_PROJECTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case ProjectActionType.EDIT_PROJECT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case ProjectActionType.EDIT_PROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                project: state.project.map(project =>
                    project.id === action.payload.id
                        ? action.payload
                        : project
                )
            };
        case ProjectActionType.EDIT_PROJECT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case ProjectActionType.DEACTIVATE_PROJECT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case ProjectActionType.DEACTIVATE_PROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                project: state.project.map(project =>
                    project.id === action.payload.id
                        ? { ...project, status: 'inactive' }
                        : project
                )
            };
        case ProjectActionType.DEACTIVATE_PROJECT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default projectReducer;