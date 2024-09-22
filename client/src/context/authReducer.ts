import { AuthAction, AuthActionType, AuthState } from '@/types/auth-types/authTypes';

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
                user: action.payload?.user || null,
                role: action.payload?.user.role || null,
                tokenExpiration: action.payload?.tokenExpiration || null,
                isLoading: false,
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
                tokenExpiration: null,
                role: null,
            };
        default:
            return state;
    }
};

export default authReducer;