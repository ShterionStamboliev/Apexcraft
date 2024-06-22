import { FetchUser, User } from '@/types/user-types/userTypes'
import { UserActionType } from '@/types/user-types/userActionTypes';
import { useCallback, useReducer } from 'react';
import userReducer, { initialState } from '@/context/User/userReducer';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const useUserApi = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const { token } = useAuth();

    const createUser = async (userData: User): Promise<boolean> => {
        dispatch({
            type: UserActionType.CREATE_USER_REQUEST
        });

        try {
            const response = await fetch(`${API_URL}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Грешка при създаване на потребител')
            }

            const newUserData: User = await response.json();

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

    const getUser = async (userId: string | undefined): Promise<FetchUser | null> => {
        dispatch({
            type: UserActionType.GET_USER_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Грешка при зареждане на потребител')
            }

            const userData: FetchUser = await response.json();

            dispatch({
                type: UserActionType.GET_USER_SUCCESS,
                payload: userData,
            });

            return userData;
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
            const response = await fetch(`${API_URL}/users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Грешка при зареждане на потребителите')
            }

            const userData: FetchUser[] = await response.json();

            dispatch({
                type: UserActionType.GET_USERS_SUCCESS,
                payload: userData,
            });

            return userData;
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

    const editUser = async (userId: string, userData: FetchUser): Promise<boolean> => {
        dispatch({
            type: UserActionType.EDIT_USER_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/users/${userId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Грешка при редактиране на потребител')
            }

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

    const deactivateUser = async (userId: string | undefined): Promise<boolean> => {
        dispatch({
            type: UserActionType.DEACTIVATE_USER_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/users/${userId}/delete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Грешка при деактивиране на потребител')
            };

            const updatedUser: FetchUser = await response.json();

            dispatch({
                type: UserActionType.DEACTIVATE_USER_SUCCESS,
                payload: updatedUser
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