import { createContext, useContext, useEffect, useReducer } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
    AuthAction,
    AuthState,
    AuthActionType,
    AuthContextProps
} from '@/types/auth-types/authTypes';
import { User } from '@/types/user-types/userTypes';
import { useNavigate } from 'react-router-dom';

const initialState: AuthState = {
    user: null,
    token: null,
    error: undefined,
    role: null,
    isLoading: false,
    tokenExpiration: null,
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
                user: action.payload?.user || null,
                token: action.payload?.token || null,
                tokenExpiration: action.payload?.tokenExpiration || null,
                role: action.payload?.role || null,
            };
        case AuthActionType.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload?.error
            };
        case AuthActionType.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                tokenExpiration: null,
                role: null,
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
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExpirationCheck = setInterval(() => {
            const expiration = state.tokenExpiration
                ? new Date(state.tokenExpiration)
                : null;
            if (expiration && new Date() >= expiration) {
                dispatch({
                    type: AuthActionType.LOGOUT
                });
                queryClient.clear();
                navigate('/login');
            }
        }, 50000);

        return () => clearInterval(tokenExpirationCheck);
    }, [state.tokenExpiration, queryClient, navigate]);

    const login = async (username: string, password: string): Promise<boolean> => {
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

            const userData: User = await response.json();

            if (!response.ok) {
                throw new Error('Грешен потребител или парола');
            }

            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);

            dispatch({
                type: AuthActionType.LOGIN_SUCCESS,
                payload: {
                    token: userData.token || undefined,
                    user: userData.user || undefined,
                    role: userData.role || undefined,
                    tokenExpiration: expiration.toISOString(),
                }
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error)
                dispatch({
                    type: AuthActionType.LOGIN_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            return false;
        }
    };

    const logout = async () => {
        const token = state.token;

        if (token) {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        }

        dispatch({
            type: AuthActionType.LOGOUT,
        })
        queryClient.clear();
        navigate('/login');
    };

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