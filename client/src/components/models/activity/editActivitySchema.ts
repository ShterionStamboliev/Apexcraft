import { format } from 'date-fns';
import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Activity name must be at least 3 characters.',
    }).max(50),
    dateFrom: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')),
    dateTo: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')),
    status: z.union([z.literal('active'), z.literal('inactive')], {
        message: 'Please select status.'
    }),
});

export type FormValues = z.infer<typeof formSchema>;