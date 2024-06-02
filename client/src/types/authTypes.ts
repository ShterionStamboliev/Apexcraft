export interface AuthState {
    user?: string | null,
    token: string | null;
    isLoading: boolean;
    error: string | undefined;
    role: string | null;
}

export interface AuthContextProps extends AuthState {
    login: (username: string, password: string) => Promise<boolean>;
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