import { User } from '@/types/user-types/userTypes';
import { z } from 'zod';

export const userStatus = ['active', 'inactive'] as const;
export const userRoles = ['user'] as const;

enum UserRoles {
    user = 'user'
}

enum UserStatus {
    active = 'active',
    inactive = 'inactive',
}

export const addNewUserSchema = z.object({
    username: z.string().min(5, {
        message: 'Потребителското име трябва да е минимум 5 символа',
    }),
    name: z.string().min(7, {
        message: 'Името трябва да е минимум 7 символа',
    }),
    password: z.string().min(5, {
        message: 'Паролата трябва да е минимум 5 символа',
    }),
    role: z.nativeEnum(UserRoles, {
        message: 'Моля селектирайте роля'
    }),
    status: z.nativeEnum(UserStatus, {
        message: 'Моля селектирайте статус'
    }),
});

export const formDefaultValues: User = {
    name: '',
    username: '',
    password: '',
    role: '',
    status: 'active',
}