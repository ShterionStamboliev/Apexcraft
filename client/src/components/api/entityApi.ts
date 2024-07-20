import { useAuth } from '@/context/AuthContext';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers';
import { useCallback, useReducer } from 'react';
import { apiCall } from './apiCall';

interface Entity {
    [key: string]: string | number;
}

const useEntityApi = <T extends Entity>(entityPath: string) => {
    const entityInitialState = initialState<T>();

    const [state, dispatch] = useReducer(entityReducer<T>, entityInitialState);

    const { token } = useAuth();

    const createEntity = async (entityData: T): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST,
        });

        try {
            const newEntityData: T = await apiCall(`/${entityPath}/create`, 'POST', token!, entityData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newEntityData,
            });

            await getEntities();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.CREATE_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            };
            return false;
        }
    };

    const getEntity = async (entityId: number): Promise<T | null> => {
        dispatch({
            type: EntityActionType.GET_REQUEST,
        });

        try {
            const entity: T = await apiCall(`/${entityPath}/${entityId}`, 'GET', token!);

            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: entity
            });

            return entity;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            };
            return null;
        }
    };

    const getEntities = useCallback(async (): Promise<T[]> => {
        dispatch({
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const entities: T[] = await apiCall(`/${entityPath}`, 'GET', token!);

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: entities,
            });

            return entities;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ALL_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            };
            return [];
        }
    }, [token]);

    const editEntity = async (entityId: number, entityData: T): Promise<boolean> => {
        dispatch({
            type: EntityActionType.EDIT_REQUEST,
        });

        try {
            await apiCall(`/${entityPath}/${entityId}/edit`, 'PUT', token!, entityData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: entityData,
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

    const deactivateEntity = async (entityId: number): Promise<boolean> => {
        dispatch({
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const entity = await apiCall(`/${entityPath}/${entityId}/delete`, 'PUT', token!);

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: entity,
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
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    };
};

export default useEntityApi;