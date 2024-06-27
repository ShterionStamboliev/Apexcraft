import { z } from 'zod';

export const formSchema = z.object({
    name_and_family: z.string().min(7, {
        message: 'Името трябва да е минимум 7 символа',
    }),
    username: z.string().min(5, {
        message: 'Потребителското име трябва да е минимум 5 символа',
    }),
    password: z.string().min(5, {
        message: 'Паролата трябва да е минимум 5 символа',
    }),
    role: z.union([z.literal('потребител'), z.literal('мениджър')], {
        message: 'Моля селектирайте роля'
    }),
    status: z.union([z.literal('активен'), z.literal('неактивен')], {
        message: 'Моля селектирайте статус'
    }),
});

export type FormValues = z.infer<typeof formSchema>;