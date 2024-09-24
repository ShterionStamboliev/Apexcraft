import { format } from 'date-fns';
import { z } from 'zod';

export const newTaskSchema = z.object({
    name: z.string().min(3, {
        message: 'Project name must be at least 3 characters long.'
    }).max(50, {
        message: 'Project name cannot exceed 50 characters.'
    }),
    price_per_measure: z.string().min(1, {
        message: 'Please enter a valid price.'
    }),
    total_price: z.string().min(1, {
        message: 'Please enter a valid price.'
    }),
    total_work_in_selected_measure: z.string().min(1, {
        message: 'Please enter a valid price.'
    }),
    artisan: z.string().min(1, {
        message: 'Please select an artisan/s.'
    }),
    activity: z.string().min(1, {
        message: 'Please select an artisan/s.'
    }),
    measure: z.string().min(1, {
        message: 'Please select an artisan/s.'
    }),
    start_date: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')).optional(),
    end_date: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')).optional(),
    note: z.string().min(0).max(100, {
        message: 'Note cannot exceed 100 characters.'
    }).optional(),
    status: z.enum(['active', 'inactive'], {
        message: 'Please, select a status.'
    }),
});

export const taskEditSchema = z.object({
    name: z.string().min(3, {
        message: 'Project name must be at least 3 characters long.'
    }).max(50, {
        message: 'Project name cannot exceed 50 characters.'
    }),
    price_per_measure: z.string().min(1, {
        message: 'Please enter a valid price.'
    }),
    total_price: z.string().min(1, {
        message: 'Please enter a valid price.'
    }),
    total_work_in_selected_measure: z.string().min(1, {
        message: 'Please enter a valid price.'
    }),
    start_date: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')).optional(),
    end_date: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')).optional(),
    note: z.string().min(0).max(100, {
        message: 'Note cannot exceed 100 characters.'
    }).optional(),
    status: z.enum(['active', 'inactive'], {
        message: 'Please, select a status.'
    }),
});

export const taskDefaults = {
    name: '',
    price_per_measure: '',
    total_price: '',
    total_work_in_selected_measure: '',
    artisan: '',
    activity: '',
    measure: '',
    start_date: '',
    end_date: '',
    note: '',
    status: undefined,
}

export type TaskSchema = z.infer<typeof newTaskSchema>;
export type EditTaskSchema = z.infer<typeof taskEditSchema>;