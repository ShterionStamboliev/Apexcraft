import { createContext, useContext } from 'react'
import useUserApi from '@/components/api/user/userApi';
import { User } from '@/types/user-types/userTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';

const UserContext = createContext<EntityContextProps<User> | undefined>(undefined);

type UserProviderType = {
    children: React.ReactNode
};

export const UserProvider = ({ children }: UserProviderType) => {
    const {
        state,
        createUser,
        getUser,
        getUsers,
        editUser,
        deactivateUser,
    } = useUserApi();

    return (
        <UserContext.Provider value={{
            state,
            createEntity: createUser,
            getEntity: getUser,
            getEntities: getUsers,
            editEntity: editUser,
            deactivateEntity: deactivateUser,
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