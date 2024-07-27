import { Activity } from '@/types/activity-types/activityTypes';
import { format } from 'date-fns';
import { z } from 'zod';

enum ActivityStatus {
    active = 'active',
    inactive = 'inactive',
}

export const newActivitySchema = z.object({
    name: z.string().min(3, {
        message: 'Activity name must be at least 3 characters.'
    }).max(50),
    dateFrom: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')).optional(),
    dateTo: z.coerce.date().transform((date) => format(date, 'yyyy-MM-dd')).optional(),
    status: z.nativeEnum(ActivityStatus, {
        message: 'Please select status.'
    }),
});

export const activityDefaults: Activity = {
    name: '',
    dateFrom: '',
    dateTo: '',
    status: 'active',
}