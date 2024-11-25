import { User } from '@/types/user-types/userTypes';
import { z } from 'zod';

export const userStatus = ['active', 'inactive'] as const;
export const userRoles = ['user'] as const;

export const addNewUserSchema = z.object({
    name_and_family: z.string().min(7, {
        message: 'Name must be at least 7 characters',
    }),
    username: z.string().min(5, {
        message: 'Username must be at least 5 characters',
    }),
    password: z.string().min(5, {
        message: 'Password must be at least 5 characters',
    }),
    role: z.enum(['user', 'manager'], {
        message: 'Please select role'
    }),
    status: z.enum(['active', 'inactive'], {
        message: 'Please select status'
    }),
});

export const formDefaultValues: User = {
    name_and_family: '',
    username: '',
    password: '',
    role: 'user',
    status: 'active',
}

export type UserSchema = z.infer<typeof addNewUserSchema>;