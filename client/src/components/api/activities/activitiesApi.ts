import { Activity, PaginatedActivities } from '@/types/activity-types/activityTypes';
import { apiCall } from '../apiCall';

const useActivitiesApi = () => {
    const createActivity = async (activityData: Activity): Promise<void> => {
        return await apiCall('/activities/create', 'POST', activityData);
    };

    const getActivities = async (): Promise<PaginatedActivities> => {
        const data: PaginatedActivities = await apiCall('/activities', 'GET');
        return data;
    };

    const getPaginatedActivities = async (page: number, limit: number): Promise<PaginatedActivities> => {
        const data: PaginatedActivities = await apiCall(`/activities?_page=${page}&_limit=${limit}`, 'GET');
        return data;
    };

    const editActivity = async (activityId: string, activityData: Activity): Promise<void> => {
        return await apiCall(`/activities/${activityId}/edit`, 'PUT', activityData);
    };

    return {
        getPaginatedActivities,
        createActivity,
        editActivity,
        getActivities
    }
}

export default useActivitiesApi;