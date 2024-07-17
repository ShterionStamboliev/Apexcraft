import { useUser } from '@/context/User/UserContext';
import { User } from '@/types/user-types/userTypes';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';

const useUserEntityHandlers = () => {
    const {
        createEntity: createUser,
        getEntity: getUser,
        getEntities: getUsers,
        deactivateEntity: deactivateUser,
        isLoading,
    } = useUser();

    return useEntityHandlers<User>({
        createEntity: createUser,
        getEntity: getUser,
        getEntities: getUsers,
        deactivateEntity: deactivateUser,
        isLoading,
    });
}

export default useUserEntityHandlers