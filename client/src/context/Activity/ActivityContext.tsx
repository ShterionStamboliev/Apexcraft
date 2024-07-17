import { createContext, useContext } from 'react'
import useActivityApi from '@/components/api/activity/activityApi';
import { Activity } from '@/types/activity-types/activityTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';

const ActivityContext = createContext<EntityContextProps<Activity> | undefined>(undefined);

type ActivityProviderType = {
    children: React.ReactNode
};

export const ActivityProvider = ({ children }: ActivityProviderType) => {
    const {
        state,
        createActivity,
        getActivity,
        getActivities,
        editActivity,
        deactivateActivity
    } = useActivityApi();

    return (
        <ActivityContext.Provider value={{
            state,
            createEntity: createActivity,
            getEntity: getActivity,
            getEntities: getActivities,
            editEntity: editActivity,
            deactivateEntity: deactivateActivity,
            isLoading: state.isLoading || false,
            isEntityLoading: state.isEntityLoading || false,
        }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = () => {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error('Activity context must be used inside of a Provider component');
    };
    return context;
}