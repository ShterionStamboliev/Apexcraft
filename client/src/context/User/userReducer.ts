import { UserAction, UserActionType } from '@/types/user-types/userActionTypes';
import { FetchUser } from '@/types/user-types/userTypes';

interface InitialUserState {
    user: FetchUser[];
    isLoading?: boolean;
    isUserLoading?: boolean;
    error?: string;
}

export const initialState: InitialUserState = {
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
                    user.id === action.payload.id
                        ? action.payload
                        : user
                )
            };
        case UserActionType.DEACTIVATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case UserActionType.DEACTIVATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: state.user.map(user =>
                    user.id === action.payload.id
                        ? { ...user, status: 'неактивен' }
                        : user
                )
            };
        case UserActionType.DEACTIVATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default userReducer;