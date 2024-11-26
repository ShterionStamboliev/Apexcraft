import { activityDefaults, activitySchema, ActivitySchema } from '@/models/activity/activitySchema'
import { useFormSchema } from '../useForm'
import { Activity } from '@/types/activity-types/activityTypes';

export const useCreateActivityForm = () => {
    return useFormSchema<ActivitySchema>(activitySchema, activityDefaults);
};

export const useEditActivityForm = (activity: Activity) => {
    return useFormSchema<ActivitySchema>(activitySchema, {
        ...activityDefaults,
        name: activity.name,
        status: activity.status
    });
};