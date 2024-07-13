
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { MeasureFormProps } from '@/types/measure-types/measureTypes';
import useEditMeasure from '@/components/hooks/MeasuresHooks/useEditMeasure';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
// import StatusSelector from '@/components/common/FormElements/FormStatusSelector';

const EditForm = ({ measure, onSuccess }: MeasureFormProps) => {
    const { form, isLoading, onSubmit } = useEditMeasure(measure, onSuccess);
    
    return (
        <FormProvider {...form}>
            <form
                id='edit-measure'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogHeader
                    title='Редакция на мерна единица'
                    user={`${measure?.name}`}
                />

                <FormFieldInput
                    type='text'
                    label='Наименование на единица'
                    name='name'
                    className='py-3'
                />

                <DialogFooter
                    isLoading={isLoading}
                    label='Редактирайте'
                    formName='edit-measure'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm