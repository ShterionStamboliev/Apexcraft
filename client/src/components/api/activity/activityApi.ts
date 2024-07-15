import { useAuth } from '@/context/AuthContext';
import activityReducer, { initialState } from '@/context/Activity/activityReducer';
import { useCallback, useReducer } from 'react';
import { ActivityActionType } from '@/types/activity-types/activityActionTypes';
import { Activity } from '@/types/activity-types/activityTypes';
import { apiCall } from '../apiCall';

const useActivityApi = () => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    const { token } = useAuth();

    const createActivity = async (activityData: Activity): Promise<boolean> => {
        dispatch({
            type: ActivityActionType.CREATE_ACTIVITY_REQUEST,
        });

        try {
            const newActivityData: Activity = await apiCall('/activities/create', 'POST', token!, activityData);

            dispatch({
                type: ActivityActionType.CREATE_ACTIVITY_SUCCESS,
                payload: newActivityData,
            });

            await getActivities();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.CREATE_ACTIVITY_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            };
            return false;
        }
    };

    const getActivity = async (activityId: number): Promise<Activity | null> => {
        dispatch({
            type: ActivityActionType.GET_ACTIVITY_REQUEST,
        });

        try {
            const activity: Activity = await apiCall(`/activities/${activityId}`, 'GET', token!);
            
            console.log(activity);
            dispatch({
                type: ActivityActionType.GET_ACTIVITY_SUCCESS,
                payload: activity,
            });
            
            return activity;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.GET_ACTIVITY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return null;
        }
    };

    const getActivities = useCallback(async (): Promise<Activity[]> => {
        dispatch({
            type: ActivityActionType.GET_ACTIVITIES_REQUEST,
        });

        try {
            const activities: Activity[] = await apiCall('/activities', 'GET', token!);

            dispatch({
                type: ActivityActionType.GET_ACTIVITIES_SUCCESS,
                payload: activities,
            });

            return activities;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.GET_ACTIVITIES_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return [];
        }
    }, [token]);

    const editActivity = async (activityId: number, activityData: Activity): Promise<boolean> => {
        dispatch({
            type: ActivityActionType.EDIT_ACTIVITY_REQUEST,
        });

        try {
            await apiCall(`/activities/${activityId}/edit`, 'PUT', token!, activityData);

            dispatch({
                type: ActivityActionType.EDIT_ACTIVITY_SUCCESS,
                payload: activityData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.EDIT_ACTIVITY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateActivity = async (activityId: number): Promise<boolean> => {
        dispatch({
            type: ActivityActionType.DEACTIVATE_ACTIVITY_REQUEST,
        });

        try {
            const activity = await apiCall(`/activities/${activityId}/delete`, 'PUT', token!);

            dispatch({
                type: ActivityActionType.DEACTIVATE_ACTIVITY_SUCCESS,
                payload: activity,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.EDIT_ACTIVITY_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            }
            return false;
        }
    };

    return {
        state,
        createActivity,
        getActivity,
        getActivities,
        editActivity,
        deactivateActivity,
    };
};

export default useActivityApi;