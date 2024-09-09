import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Activity name must be at least 3 characters.',
    }).max(50),
    status: z.union([z.literal('active'), z.literal('inactive')], {
        message: 'Please select status.'
    }),
});

export type FormValues = z.infer<typeof formSchema>;