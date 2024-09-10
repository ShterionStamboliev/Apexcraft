
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { MeasureFormProps } from '@/types/measure-types/measureTypes';
import useEditMeasure from '@/components/hooks/MeasuresHooks/useEditMeasure';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';

const EditForm = ({ measure, onSuccess }: MeasureFormProps) => {
    const { form, isLoading, onSubmit } = useEditMeasure(measure, onSuccess);
    
    return (
        <FormProvider {...form}>
            <form
                id='edit-measure'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogHeader
                    title='Edit measure'
                    user={`${measure?.name}`}
                />

                <FormFieldInput
                    type='text'
                    label='Type of measure'
                    name='name'
                />

                <DialogFooter
                    isLoading={isLoading}
                    label='Submit'
                    formName='edit-measure'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm