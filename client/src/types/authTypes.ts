export interface User {
    username: string;
    password: string;
}

export interface AuthState {
    user?: null,
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextProps extends AuthState {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export enum AuthActionType {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT = 'LOGOUT',
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}