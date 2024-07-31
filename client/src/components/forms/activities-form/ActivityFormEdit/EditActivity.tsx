import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { ActivityFormProps } from '@/types/activity-types/activityTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import useEditActivity from '@/components/hooks/ActivitiesHooks/useEditActivity';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';

const EditForm = ({ activity, onSuccess }: ActivityFormProps) => {
    const { form, isLoading, onSubmit } = useEditActivity(activity, onSuccess);

    return (
        <FormProvider {...form}>
            <form
                id='form-edit'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogHeader
                    title='Edit activity'
                    user={`${activity?.name}`}
                />
                <FormFieldInput
                    type='text'
                    label='Activity'
                    name='name'
                    className='py-3'
                />
                <FormDatePicker
                    name='dateFrom'
                    label='Pick date'
                    description=''
                />
                <FormDatePicker
                    name='dateTo'
                    label='Pick date'
                    description=''
                />
                <div className='flex flex-1 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        placeholder='active'
                    />
                </div>
                <DialogFooter
                    isLoading={isLoading}
                    label='Submit'
                    formName='form-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm