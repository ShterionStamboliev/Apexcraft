import { createContext, useContext } from 'react'
import { Activity } from '@/types/activity-types/activityTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';
import useEntityApi from '@/components/api/entityApi';

const ActivityContext = createContext<EntityContextProps<Activity> | undefined>(undefined);

type ActivityProviderType = {
    children: React.ReactNode
};

export const ActivityProvider = ({ children }: ActivityProviderType) => {
    const {
        state,
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    } = useEntityApi<Activity>('activities');

    return (
        <ActivityContext.Provider value={{
            state,
            createEntity,
            getEntity,
            getEntities,
            editEntity,
            deactivateEntity,
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