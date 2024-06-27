import { Measure } from '@/types/measure-types/measureTypes';
import { z } from 'zod';

export const newMeasureSchema = z.object({
    name: z.string().min(2, {
        message: 'Мерната единица трябва да е минимум 2 символа'
    })
});

export const measureDefaults: Measure = {
    name: '',
}