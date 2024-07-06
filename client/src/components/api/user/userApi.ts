import { FetchUser, User, UserTuple } from '@/types/user-types/userTypes'
import { UserActionType } from '@/types/user-types/userActionTypes';
import { useCallback, useReducer } from 'react';
import userReducer, { initialState } from '@/context/User/userReducer';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '../apiCall';

const useUserApi = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const { token } = useAuth();

    const createUser = async (userData: UserTuple): Promise<boolean> => {
        dispatch({
            type: UserActionType.CREATE_USER_REQUEST
        });

        try {
            const newUserData: User = await apiCall('/users/create', 'POST', token!, userData);

            dispatch({
                type: UserActionType.CREATE_USER_SUCCESS,
                payload: newUserData
            });

            await getUsers();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.CREATE_USER_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const getUser = async (userId: number | undefined): Promise<FetchUser | null> => {
        dispatch({
            type: UserActionType.GET_USER_REQUEST,
        });

        try {
            const user: FetchUser = await apiCall(`/users/${userId}`, 'GET', token!)

            dispatch({
                type: UserActionType.GET_USER_SUCCESS,
                payload: user,
            });

            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.GET_USER_ERROR,
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
            type: UserActionType.GET_USERS_REQUEST,
        });

        try {
            const users: FetchUser[] = await apiCall('/users', 'GET', token!)

            dispatch({
                type: UserActionType.GET_USERS_SUCCESS,
                payload: users,
            });

            return users;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.GET_USERS_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return [];
        }
    }, [token]);

    const editUser = async (userId: number, userData: FetchUser): Promise<boolean> => {
        dispatch({
            type: UserActionType.EDIT_USER_REQUEST,
        });

        try {
            await apiCall(`/users/${userId}/edit`, 'PUT', token!, userData);

            dispatch({
                type: UserActionType.EDIT_USER_SUCCESS,
                payload: userData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.EDIT_USER_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateUser = async (userId: number | undefined): Promise<boolean> => {
        dispatch({
            type: UserActionType.DEACTIVATE_USER_REQUEST,
        });

        try {
            const user = await apiCall(`/users/${userId}/delete`, 'PUT', token!)

            dispatch({
                type: UserActionType.DEACTIVATE_USER_SUCCESS,
                payload: user
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.DEACTIVATE_USER_ERROR,
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