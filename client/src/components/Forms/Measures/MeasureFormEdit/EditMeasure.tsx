import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { Measure } from '@/types/measure-types/measureTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import {
    MeasureSchema,
    newMeasureSchema,
} from '@/models/measure/newMeasureSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/hooks/custom-hooks/useMutationHook';
import { Ruler } from 'lucide-react';

type MeasureFormProps = {
    measureId: string;
    measure: Measure;
};

const EditMeasureForm = ({ measure, measureId }: MeasureFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<MeasureSchema>({
        URL: `/measures/${measureId}/edit`,
        queryKey: ['measures'],
        setIsOpen,
        successToast: 'Measure updated successfully!',
    });

    const form = useForm<MeasureSchema>({
        resolver: zodResolver(newMeasureSchema),
        defaultValues: {
            name: measure.name,
        },
        mode: 'onChange',
    });

    const handleSubmit = (measureData: MeasureSchema) => {
        mutate(measureData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                <DialogHeader title='Edit measure' />
                <FormProvider {...form}>
                    <form
                        id='edit-measure'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormFieldInput
                            type='text'
                            label='Type of measure'
                            name='name'
                            className='pl-10'
                            Icon={Ruler}
                        />
                        <DialogFooter
                            disabled={!form.formState.isDirty || isPending}
                            isLoading={isPending}
                            label='Submit changes'
                            formName='edit-measure'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EditMeasureForm;
