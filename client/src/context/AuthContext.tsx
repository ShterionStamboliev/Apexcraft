import { createContext, useContext, useEffect, useReducer } from 'react'
import {
    AuthState,
    AuthActionType,
    AuthContextProps
} from '@/types/auth-types/authTypes';
import { User } from '@/types/user-types/userTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import authReducer from './authReducer';

const initialState: AuthState = {
    user: null,
    error: undefined,
    role: null,
    isLoading: false,
    tokenExpiration: null,
};

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     const checkTokenExpiration = () => {
    //         const expiration = state.tokenExpiration ? new Date(state.tokenExpiration) : null;
    //         if (expiration && new Date() >= expiration) {
    //             dispatch({
    //                 type: AuthActionType.LOGOUT
    //             });
    //             navigate('/login');
    //         }
    //     };
    //     const tokenExpirationCheck = setInterval(checkTokenExpiration, 60000);

    //     return () => clearInterval(tokenExpirationCheck);
    // }, [state.tokenExpiration, navigate]);

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
                credentials: 'include',
            });

            const userData: { user: User } = await response.json();

            if (!response.ok) {
                throw new Error('Wrong username or password');
            }

            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);

            dispatch({
                type: AuthActionType.LOGIN_SUCCESS,
                payload: {
                    user: userData.user,
                    tokenExpiration: expiration.toISOString(),
                }
            });

            sessionStorage.setItem('user', JSON.stringify(userData.user));
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
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        sessionStorage.removeItem('user');

        dispatch({
            type: AuthActionType.LOGOUT,
        });

        navigate('/login');
    };

    const checkAuth = async (refreshToken = false) => {
        try {
            if (refreshToken) {
                const response = await fetch(`${API_URL}/auth/refresh-token`, {
                    method: 'POST',
                    credentials: 'include',
                });
    
                if (!response.ok) {
                    throw new Error('Failed to refresh token');
                }
    
                const userData = await response.json();
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1);
    
                dispatch({
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: {
                        user: userData.user,
                        role: userData.user.role,
                        tokenExpiration: expiration.toISOString(),
                    }
                });
            } else {
                const response = await fetch(`${API_URL}/auth/auth-check`, {
                    method: 'POST',
                    credentials: 'include',
                });
    
                if (!response.ok) {
                    throw new Error('User not authenticated');
                }
    
                const userData = await response.json();
                console.log('Auth check user data:', userData);
    
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1);
    
                dispatch({
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: {
                        user: userData.user,
                        role: userData.user.role,
                        tokenExpiration: expiration.toISOString(),
                    }
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch({
                    type: AuthActionType.LOGOUT
                });
            }
        }
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');

        if (location.pathname !== '/login') {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1);

                dispatch({
                    type: AuthActionType.LOGIN_SUCCESS,
                    payload: {
                        user: parsedUser,
                        role: parsedUser.role,
                        tokenExpiration: expiration.toISOString(),
                    }
                });
            }
            checkAuth();

            const checkTokenInterval = setInterval(() => {
                checkAuth(true);
            }, 900000);

            return () => clearInterval(checkTokenInterval);
        }
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider component');
    };
    return context;
};