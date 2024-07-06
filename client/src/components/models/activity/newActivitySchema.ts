import { Activity } from '@/types/activity-types/activityTypes';
import { z } from 'zod';

export const newActivitySchema = z.object({
    name: z.string().min(4, {
        message: 'Името трябва да е минимум 4 символа'
    }),
    status: z.union([z.literal('активен'), z.literal('неактивен')], {
        message: 'Моля селектирайте статус'
    }),
});

export const activityDefaults: Activity = {
    name: '',
    status: 'активен',
}