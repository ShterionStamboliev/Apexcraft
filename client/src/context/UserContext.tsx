import { createContext, useCallback, useContext, useReducer } from 'react'
import { FetchUser, User } from '@/types/user-types/userTypes'
import { UserActionType, UserAction, UserContextProps } from '@/types/user-types/userActionTypes';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

type InitialUserState = {
    user: FetchUser[];
    isLoading?: boolean;
    isUserLoading?: boolean;
    error?: string;
};

const initialState: InitialUserState = {
    user: [],
    isLoading: false,
    isUserLoading: false,
    error: undefined,
};

const userReducer = (state: InitialUserState, action: UserAction): InitialUserState => {
    switch (action.type) {
        case UserActionType.CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case UserActionType.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: [...state.user, action.payload],
            };
        case UserActionType.CREATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case UserActionType.GET_USER_REQUEST:
            return {
                ...state,
                isUserLoading: true,
                error: undefined,
            };
        case UserActionType.GET_USER_SUCCESS:
            return {
                ...state,
                isUserLoading: false,
                user: [...state.user],
            };
        case UserActionType.GET_USER_ERROR:
            return {
                ...state,
                isUserLoading: false,
                error: action.payload.error
            };
        case UserActionType.GET_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case UserActionType.GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case UserActionType.GET_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };

        case UserActionType.EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: state.user.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case UserActionType.USER_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        default:
            return state;
    }
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

type UserProviderType = {
    children: React.ReactNode
};

export const UserProvider = ({ children }: UserProviderType) => {
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
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Грешка при създаването на нов потребител')
            }

            const newUserData: User = await response.json();

            dispatch({
                type: UserActionType.CREATE_USER_SUCCESS,
                payload: newUserData
            });

            await getUsers();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error)
                dispatch({
                    type: UserActionType.CREATE_USER_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            return false;
        }
    }

    const getUser = async (userId: string | undefined): Promise<FetchUser | null> => {
        dispatch({
            type: UserActionType.GET_USER_REQUEST
        });

        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Грешка при зареждане на потребителя')
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
                        error: error.message
                    }
                });
            }
            return null
        }
    }

    const getUsers = useCallback(async (): Promise<FetchUser[]> => {
        dispatch({
            type: UserActionType.GET_USERS_REQUEST
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
                payload: userData
            });

            return userData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.GET_USERS_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            }
            return [];
        }
    }, [token]);

    const editUser = async (userId: string, userData: FetchUser): Promise<boolean> => {
        dispatch({
            type: UserActionType.EDIT_USER_REQUEST
        });

        try {
            const response = await fetch(`${API_URL}/users/${userId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Грешка при редактиране на потребител')
            }

            dispatch({
                type: UserActionType.EDIT_USER_SUCCESS,
                payload: userData
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.EDIT_USER_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            }
            return false;
        }
    }

    return (
        <UserContext.Provider value={{
            state,
            createUser,
            editUser,
            getUser,
            getUsers,
            isLoading: state.isLoading,
            isUserLoading: state.isUserLoading,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('User context must be used inside of a Provider component');
    };
    return context;
}