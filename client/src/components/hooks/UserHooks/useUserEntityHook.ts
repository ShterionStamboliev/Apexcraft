import { useUser } from '@/context/User/UserContext';
import { User } from '@/types/user-types/userTypes';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';

const useUserEntityHandlers = () => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    } = useUser();

    return useEntityHandlers<User>({
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
}

export default useUserEntityHandlers