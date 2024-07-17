import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { Activity } from '@/types/activity-types/activityTypes';
import { useActivity } from '@/context/Activity/ActivityContext';

const useActivityEntityHandlers = () => {
    const {
        createEntity: createActivity,
        getEntity: getActivity,
        getEntities: getActivities,
        deactivateEntity: deactivateActivity,
        isLoading,
    } = useActivity();

    return useEntityHandlers<Activity>({
        createEntity: createActivity,
        getEntity: getActivity,
        getEntities: getActivities,
        deactivateEntity: deactivateActivity,
        isLoading,
    });
}

export default useActivityEntityHandlers