import { useCallback, useReducer } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '../apiCall';
import { Project } from '@/types/project-types/projectTypes';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';

const useProjectApi = () => {
    const initialProjectState = initialState<Project>();

    const [state, dispatch] = useReducer(entityReducer<Project>, initialProjectState);

    const { token } = useAuth();

    const createProject = async (projectData: Project): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST
        });

        try {
            const newProjectData: Project = await apiCall('/projects/create', 'POST', token!, projectData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newProjectData
            });

            await getProjects();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.CREATE_ERROR,
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
            type: EntityActionType.GET_REQUEST,
        });

        try {
            const project: Project = await apiCall(`/projects/${projectId}`, 'GET', token!)

            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: project,
            });

            return project;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ERROR,
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
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const projects: Project[] = await apiCall('/projects', 'GET', token!)

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: projects,
            });

            return projects;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ALL_ERROR,
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
            type: EntityActionType.EDIT_REQUEST,
        });

        try {
            await apiCall(`/projects/${projectId}/edit`, 'PUT', token!, projectData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: projectData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.EDIT_ERROR,
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
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const project = await apiCall(`/projects/${projectId}/delete`, 'PUT', token!)

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: project
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.DEACTIVATE_ERROR,
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