import { createContext, useContext } from 'react'
import { ActivityContextProps } from '@/types/activity-types/activityActionTypes';
import useActivityApi from '@/components/api/activity/activityApi';

const ActivityContext = createContext<ActivityContextProps | undefined>(undefined);

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
            createActivity,
            getActivity,
            getActivities,
            editActivity,
            deactivateActivity,
            isLoading: state.isLoading || false,
            isActivityLoading: state.isActivityLoading || false,
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