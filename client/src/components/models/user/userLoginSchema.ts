import { UserLoginFormData } from '@/types/user-types/userTypes';
import { z } from 'zod';

export const loginFormSchema = z.object({
    username: z.string().min(5, {
        message: 'Грешен потребител или парола',
    }),
    password: z.string().min(5, {
        message: 'Грешен потребител или парола',
    }),
});

export const formDefaultValues: UserLoginFormData = {
    username: '',
    password: ''
}