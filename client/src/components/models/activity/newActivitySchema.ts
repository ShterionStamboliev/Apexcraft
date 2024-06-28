import { Activity } from '@/types/activity-types/activityTypes';
import { z } from 'zod';

export const newActivitySchema = z.object({
    name: z.string().min(4, {
        message: 'Името трябва да е минимум 4 символа'
    }),
});

export const activityDefaults: Activity = {
    name: '',
    status: '',
}