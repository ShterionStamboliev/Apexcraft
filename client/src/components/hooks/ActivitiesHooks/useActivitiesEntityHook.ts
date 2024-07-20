import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { Activity } from '@/types/activity-types/activityTypes';
import { useActivity } from '@/context/Activity/ActivityContext';

const useActivityEntityHandlers = () => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    } = useActivity();

    return useEntityHandlers<Activity>({
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
}

export default useActivityEntityHandlers