import { createContext, useContext } from 'react'
import { UserContextProps } from '@/types/user-types/userActionTypes';
import useUserApi from '@/components/api/user/userApi';

const UserContext = createContext<UserContextProps | undefined>(undefined);

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
            createUser,
            editUser,
            getUser,
            getUsers,
            deactivateUser,
            isLoading: state.isLoading || false,
            isUserLoading: state.isUserLoading || false,
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