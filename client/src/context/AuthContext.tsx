import { createContext, useContext, useReducer } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
    AuthAction,
    AuthState,
    AuthActionType,
    AuthContextProps
} from '@/types/authTypes';

const initialState: AuthState = {
    user: null,
    token: null,
    error: undefined,
    role: null,
    isLoading: false,
};

const API_URL = import.meta.env.VITE_API_URL;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case AuthActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };
        case AuthActionType.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case AuthActionType.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const queryClient = useQueryClient();

    const login = async (username: string, password: string) => {
        dispatch({
            type: AuthActionType.LOGIN_REQUEST
        });

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            if (!response.ok) {
                throw new Error('Грешен потребител или парола');
            }

            const userData = await response.json();
            
            dispatch({
                type: AuthActionType.LOGIN_SUCCESS,
                payload: {
                    token: userData.token,
                    user: userData.username,
                    role: userData.role
                }
            });
        } catch (error: unknown) {
            if (error instanceof Error)
                dispatch({
                    type: AuthActionType.LOGIN_ERROR,
                    payload: {
                        error: error.message
                    }
                });
        }
    }

    const logout = () => {

        // Ask about the route for /auth/logout POST method //
        dispatch({
            type: AuthActionType.LOGOUT,
        })
        queryClient.clear();
    }

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider component');
    };
    return context;
};