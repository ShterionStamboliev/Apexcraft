import { createContext, useContext } from 'react'
import { User } from '@/types/user-types/userTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';
import useEntityApi from '@/components/api/entityApi';

const UserContext = createContext<EntityContextProps<User> | undefined>(undefined);

type UserProviderType = {
    children: React.ReactNode
};

export const UserProvider = ({ children }: UserProviderType) => {
    const {
        state,
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    } = useEntityApi<User>('users');

    return (
        <UserContext.Provider value={{
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
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('User context must be used inside of a Provider component');
    };
    return context;
}