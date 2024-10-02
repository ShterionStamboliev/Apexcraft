import { apiCall } from './apiCall';
import { Activity } from '@/types/activity-types/activityTypes';

const useActivitiesApi = () => {
    const getActivities = async (): Promise<Activity[]> => {
        const data: Activity[] = await apiCall('/activities', 'GET');
        return data;
    };

    return {
        getActivities,
    }
}

export default useActivitiesApi;