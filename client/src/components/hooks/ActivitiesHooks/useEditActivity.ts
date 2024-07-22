import { useActivity } from '@/context/Activity/ActivityContext';
import { Activity } from '@/types/activity-types/activityTypes';
import { formSchema } from '@/components/models/activity/editActivitySchema';
import useEditEntity from '../custom-hooks/useEditEntityHandler';

const useEditActivity = (activity: Activity, onSuccess?: () => void) => {
    return useEditEntity<Activity>({
        entity: activity,
        initialFormState: { ...activity },
        schema: formSchema,
        useEntityContext: useActivity,
        onSuccess,
    });
};

export default useEditActivity;