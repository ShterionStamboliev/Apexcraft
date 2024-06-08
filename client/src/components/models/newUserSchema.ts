import { z } from 'zod';

export const userRoles = ['мениджър', 'потребител'] as const;
export const userStatus = ['активен', 'неактивен'] as const;

enum UserRoles {
    мениджър = 'мениджър',
    потребител = 'потребител'
}

enum UserStatus {
    активен = 'активен',
    неактивен = 'неактивен',
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
})