import { Project } from './projectTypes';

export enum ProjectActionType {
    CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR',
    GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST',
    GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS',
    GET_PROJECT_ERROR = 'GET_PROJECT_ERROR',
    GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST',
    GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS',
    GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR',
    EDIT_PROJECT_REQUEST = 'EDIT_PROJECT_REQUEST',
    EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS',
    EDIT_PROJECT_ERROR = 'EDIT_PROJECT_ERROR',
    DEACTIVATE_PROJECT_REQUEST = 'DEACTIVATE_PROJECT_REQUEST',
    DEACTIVATE_PROJECT_SUCCESS = 'DEACTIVATE_PROJECT_SUCCESS',
    DEACTIVATE_PROJECT_ERROR = 'DEACTIVATE_PROJECT_ERROR',
}

export type ProjectContextProps = {
    state: {
        project: Project[];
    }
    isLoading?: boolean;
    isProjectLoading?: boolean;
    error?: string;
    createProject: (project: Project) => Promise<boolean>;
    getProject: (projectId: number) => Promise<Project | null>;
    getProjects: () => Promise<Project[]>;
    editProject: (projectId: number, project: Project) => Promise<boolean>;
    deactivateProject: (projectId: number) => Promise<boolean>;
}

export interface ProjectAction {
    type: ProjectActionType;
    payload?: any;
}