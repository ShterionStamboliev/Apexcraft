import { FetchUser, User, UserTuple } from '@/types/user-types/userTypes'
import { useCallback, useReducer } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '../apiCall';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';

const useUserApi = () => {
    const initialUserState = initialState<User>();

    const [state, dispatch] = useReducer(entityReducer<User>, initialUserState);

    const { token } = useAuth();

    const createUser = async (userData: UserTuple): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST
        });

        try {
            const newUserData: User = await apiCall('/users/create', 'POST', token!, userData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newUserData
            });

            await getUsers();

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

    const getUser = async (userId: number): Promise<FetchUser | null> => {
        dispatch({
            type: EntityActionType.GET_REQUEST,
        });

        try {
            const user: FetchUser = await apiCall(`/users/${userId}`, 'GET', token!)

            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: user,
            });

            return user;
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

    const getUsers = useCallback(async (): Promise<FetchUser[]> => {
        dispatch({
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const users: FetchUser[] = await apiCall('/users', 'GET', token!)

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: users,
            });

            return users;
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

    const editUser = async (userId: number, userData: User): Promise<boolean> => {
        dispatch({
            type: EntityActionType.EDIT_REQUEST,
        });

        try {
            await apiCall(`/users/${userId}/edit`, 'PUT', token!, userData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: userData,
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

    const deactivateUser = async (userId: number): Promise<boolean> => {
        dispatch({
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const user = await apiCall(`/users/${userId}/delete`, 'PUT', token!)

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: user
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
        createUser,
        getUser,
        getUsers,
        editUser,
        deactivateUser,
    };
};

export default useUserApi;