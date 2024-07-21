import { Measure } from '@/types/measure-types/measureTypes';
import { z } from 'zod';

export const newMeasureSchema = z.object({
    name: z.string().min(3, {
        message: 'Measure must be at least 3 characters.'
    }).max(50, {
        message: 'Measure cannot exceed 50 characters.'
    })
});

export const measureDefaults: Measure = {
    name: '',
}