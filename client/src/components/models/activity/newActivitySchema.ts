import { Activity } from '@/types/activity-types/activityTypes';
import { z } from 'zod';

enum ActivityStatus {
    active = 'active',
    inactive = 'inactive',
}

export const newActivitySchema = z.object({
    name: z.string().min(4, {
        message: 'Името трябва да е минимум 4 символа'
    }),
    status: z.nativeEnum(ActivityStatus, {
        message: 'Моля селектирайте статус'
    }),
});

export const activityDefaults: Activity = {
    name: '',
    status: 'active',
}