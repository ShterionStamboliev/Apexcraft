import { createContext, useContext, useReducer } from 'react'
import { CreateUserType } from '@/types/user-types/userTypes'
import { UserActionType, UserAction, UserContextProps } from '@/types/user-types/userActionTypes';
import { useAuth } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

type InitialUserState = {
    user: CreateUserType[];
    isLoading?: boolean;
    error?: string;
};

const initialState: InitialUserState = {
    user: [],
    isLoading: false,
    error: undefined,
}

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

    const createUser = async (userData: CreateUserType): Promise<boolean> => {
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

            const newUserData: CreateUserType = await response.json();

            dispatch({
                type: UserActionType.CREATE_USER_SUCCESS,
                payload: newUserData
            });

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

    return (
        <UserContext.Provider value={{ state, createUser, isLoading: state.isLoading }}>
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