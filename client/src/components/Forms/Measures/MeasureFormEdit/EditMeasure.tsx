import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { Measure } from '@/types/measure-types/measureTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import { measureSchema, MeasureSchema } from '@/models/measure/measureSchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/useDialogState';
import { Ruler } from 'lucide-react';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';
import { useEditMeasureForm } from '@/hooks/entityHooks/useMeasureForm';

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

    const form = useEditMeasureForm(measure);

    const handleSubmit = useSubmitHandler(mutate, measureSchema);

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
