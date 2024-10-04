import { Activity } from '@/types/activity-types/activityTypes';
import { apiCall } from '../apiCall';

const useActivitiesApi = () => {
    const createActivity = async (activityData: Activity): Promise<void> => {
        return await apiCall('/activities/create', 'POST', activityData);
    };

    const getActivities = async (): Promise<Activity[]> => {
        const data: Activity[] = await apiCall('/activities', 'GET');
        return data;
    };

    const editActivity = async (activityId: string, activityData: Activity): Promise<void> => {
        return await apiCall(`/activities/${activityId}/edit`, 'PUT', activityData);
    };

    return {
        getActivities,
        createActivity,
        editActivity,
    }
}

export default useActivitiesApi;