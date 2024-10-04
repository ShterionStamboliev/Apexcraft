import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useActivitiesApi from './activitiesApi';
import { Activity } from '@/types/activity-types/activityTypes';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { ActivitySchema } from '@/components/models/activity/newActivitySchema';

const { createActivity, getActivities, editActivity } = useActivitiesApi();

type DialogStateAction = {
    activityId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useActivitiesQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const useGetActivities = () => {
        return useQuery({
            queryKey: ['activities'],
            queryFn: getActivities,
            staleTime: 0,
        });
    };

    const useCreateActivity = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (activityData: Activity) => createActivity(activityData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['activities'],
                });
                fireSuccessToast('Activity created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditActivity = ({ activityId, setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (activityData: ActivitySchema) => editActivity(activityId!, activityData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['activities'],
                });
                fireSuccessToast('Activity created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    return {
        useCreateActivity,
        useGetActivities,
        useEditActivity,
    }
}

export default useActivitiesQuery;