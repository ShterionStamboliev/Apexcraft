import {
    ActivityAction,
    ActivityActionType
} from '@/types/activity-types/activityActionTypes';
import { Activity } from '@/types/activity-types/activityTypes';

interface InitialActivityState {
    activity: Activity[];
    isLoading: boolean;
    isActivityLoading: boolean;
    error?: string;
}

export const initialState: InitialActivityState = {
    activity: [],
    isActivityLoading: false,
    isLoading: false,
    error: undefined,
};

const activityReducer = (state: InitialActivityState, action: ActivityAction) => {
    switch (action.type) {
        case ActivityActionType.CREATE_ACTIVITY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case ActivityActionType.CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activity: [...state.activity, action.payload],
            };
        case ActivityActionType.CREATE_ACTIVITY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case ActivityActionType.GET_ACTIVITY_REQUEST:
            return {
                ...state,
                isActivityLoading: true,
                error: undefined,
            };
        case ActivityActionType.GET_ACTIVITY_SUCCESS:
            return {
                ...state,
                isActivityLoading: false,
                activity: [...state.activity],
            };

        case ActivityActionType.GET_ACTIVITIES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case ActivityActionType.GET_ACTIVITIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activity: action.payload,
            };
        case ActivityActionType.GET_ACTIVITIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case ActivityActionType.EDIT_ACTIVITY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case ActivityActionType.EDIT_ACTIVITY_SUCCESS:
            return {
                ...state,
                isActivityLoading: false,
                activity: state.activity.map(activity =>
                    activity.id === action.payload.id
                        ? action.payload
                        : activity
                )
            };
        case ActivityActionType.EDIT_ACTIVITY_ERROR:
            return {
                ...state,
                isActivityLoading: false,
                error: action.payload.error,
            };
        case ActivityActionType.DEACTIVATE_ACTIVITY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case ActivityActionType.DEACTIVATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activity: state.activity.map(activity =>
                    activity.id === action.payload.id
                        ? { ...activity, status: 'неактивен' }
                        : activity
                )
            };
        case ActivityActionType.DEACTIVATE_ACTIVITY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default activityReducer;