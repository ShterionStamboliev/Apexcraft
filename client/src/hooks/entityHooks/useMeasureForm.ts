import { measureDefaults, measureSchema, MeasureSchema } from '@/models/measure/measureSchema'
import { useFormSchema } from '../useForm'
import { Measure } from '@/types/measure-types/measureTypes';

export const useCreateMeasureForm = () => {
    return useFormSchema<MeasureSchema>(measureSchema, measureDefaults);
};

export const useEditMeasureForm = (measure: Measure) => {
    return useFormSchema<MeasureSchema>(measureSchema, {
        ...measureDefaults,
        name: measure.name
    });
};