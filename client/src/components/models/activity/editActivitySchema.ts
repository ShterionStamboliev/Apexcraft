import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(7, {
        message: 'Името трябва да е минимум 7 символа',
    }),
    status: z.union([z.literal('активен'), z.literal('неактивен')], {
        message: 'Моля селектирайте статус'
    }),
});

export type FormValues = z.infer<typeof formSchema>;