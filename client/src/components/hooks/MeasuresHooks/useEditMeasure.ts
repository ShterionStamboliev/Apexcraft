import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Measure } from '@/types/measure-types/measureTypes';
import { useMeasure } from '@/context/Measure/MeasureContext';
import { newMeasureSchema } from '@/components/models/measure/newMeasureSchema';

const useEditMeasure = (measure: Measure, onSuccess?: () => void) => {
    const { editEntity, isLoading } = useMeasure();
    const { fireToast } = useToastHook();

    const form = useForm<Measure>({
        defaultValues: measure && {
            ...measure
        },
        resolver: zodResolver(newMeasureSchema)
    });

    const { reset } = form;

    const onSubmit = async (data: Measure) => {
        try {
            if (measure.id) {
                const isEditSuccess = await editEntity(measure.id, data);
                console.log(isEditSuccess);
                
                if (isEditSuccess && onSuccess) {
                    onSuccess();
                    reset();
                    fireToast({
                        title: 'Редакцията беше успешна',
                        variant: 'success',
                    });
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                fireToast({
                    title: error.message,
                    variant: 'destructive',
                });
            }
        }
    };

    return {
        form,
        isLoading,
        onSubmit
    };
};

export default useEditMeasure;