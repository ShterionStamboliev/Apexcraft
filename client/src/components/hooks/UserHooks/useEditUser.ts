import { useUser } from '@/context/User/UserContext';
import { User, UserFormType } from '@/types/user-types/userTypes';
import { formSchema } from '@/components/models/user/editUserSchema';
import useEditEntity from '../custom-hooks/useEditEntityHandler';

const useEditUser = (user: UserFormType, onSuccess?: () => void) => {
    return useEditEntity<User>({
        entity: user,
        initialFormState: { ...user, password: '*******' },
        schema: formSchema,
        useEntityContext: useUser,
        onSuccess,
    });
};

export default useEditUser;