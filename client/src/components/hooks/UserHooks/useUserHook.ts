import { useUser } from '@/context/User/UserContext';
import { FetchUser } from '@/types/user-types/userTypes';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';

const useUserHooks = () => {
    const { getUser, getUsers, deactivateUser } = useUser();
    return useEntityHandlers<FetchUser>({
        getEntity: getUser,
        getEntities: getUsers,
        deactivateEntity: deactivateUser,
    });
}

export default useUserHooks