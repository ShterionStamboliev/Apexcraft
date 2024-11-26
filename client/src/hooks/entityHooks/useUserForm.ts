import { userDefaultValues, userSchema, UserSchema } from '@/models/user/userSchema'
import { useFormSchema } from '../useForm'
import { User } from '@/types/user-types/userTypes';

export const useCreateUserForm = () => {
    return useFormSchema<UserSchema>(userSchema, userDefaultValues);
};

export const useEditUserForm = (user: User) => {
    return useFormSchema<UserSchema>(userSchema, {
        ...userDefaultValues,
        name_and_family: user.name_and_family,
        username: user.username,
        password: user.password,
        role: user.role,
        status: user.status,
    });
};