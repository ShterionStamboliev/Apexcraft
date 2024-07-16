import { useCallback, useReducer } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '../apiCall';
import projectReducer, { initialState } from '@/context/Project/projectReducer';
import { Project } from '@/types/project-types/projectTypes';
import { ProjectActionType } from '@/types/project-types/projectActionTypes';

const useProjectApi = () => {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    const { token } = useAuth();

    const createProject = async (projectData: Project): Promise<boolean> => {
        dispatch({
            type: ProjectActionType.CREATE_PROJECT_REQUEST
        });

        try {
            const newProjectData: Project = await apiCall('/projects/create', 'POST', token!, projectData);
            
            dispatch({
                type: ProjectActionType.CREATE_PROJECT_SUCCESS,
                payload: newProjectData
            });

            await getProjects();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ProjectActionType.CREATE_PROJECT_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const getProject = async (projectId: number): Promise<Project | null> => {
        dispatch({
            type: ProjectActionType.GET_PROJECT_REQUEST,
        });

        try {
            const project: Project = await apiCall(`/projects/${projectId}`, 'GET', token!)

            dispatch({
                type: ProjectActionType.GET_PROJECT_SUCCESS,
                payload: project,
            });

            return project;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ProjectActionType.GET_PROJECT_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return null;
        }
    };

    const getProjects = useCallback(async (): Promise<Project[]> => {
        dispatch({
            type: ProjectActionType.GET_PROJECTS_REQUEST,
        });

        try {
            const projects: Project[] = await apiCall('/projects', 'GET', token!)

            dispatch({
                type: ProjectActionType.GET_PROJECTS_SUCCESS,
                payload: projects,
            });

            return projects;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ProjectActionType.GET_PROJECTS_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return [];
        }
    }, [token]);

    const editProject = async (projectId: number, projectData: Project): Promise<boolean> => {
        dispatch({
            type: ProjectActionType.EDIT_PROJECT_REQUEST,
        });

        try {
            await apiCall(`/projects/${projectId}/edit`, 'PUT', token!, projectData);

            dispatch({
                type: ProjectActionType.EDIT_PROJECT_SUCCESS,
                payload: projectData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ProjectActionType.EDIT_PROJECT_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateProject = async (projectId: number): Promise<boolean> => {
        dispatch({
            type: ProjectActionType.DEACTIVATE_PROJECT_REQUEST,
        });

        try {
            const project = await apiCall(`/projects/${projectId}/delete`, 'PUT', token!)

            dispatch({
                type: ProjectActionType.DEACTIVATE_PROJECT_SUCCESS,
                payload: project
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ProjectActionType.DEACTIVATE_PROJECT_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            }
            return false;
        }
    };

    return {
        state,
        createProject,
        getProject,
        getProjects,
        editProject,
        deactivateProject
    };
};

export default useProjectApi;