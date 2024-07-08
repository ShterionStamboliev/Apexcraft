
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import useEditActivityForm from '@/components/hooks/ActivitiesHooks/useEditActivity';
import { ActivityFormProps } from '@/types/activity-types/activityTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';

const EditForm = ({ activity, onSuccess }: ActivityFormProps) => {
    const { form, isLoading, onSubmit } = useEditActivityForm(activity, onSuccess);

    return (
        <FormProvider {...form}>
            <form
                id='form-edit'
                onSubmit={form.handleSubmit(onSubmit)}
            >

                <DialogHeader
                    title='Редакция на дейност'
                    user={`${activity?.name}`}
                />

                <FormFieldInput
                    type='text'
                    label='Дейност'
                    name='name'
                    className='py-3'
                />

                <DialogFooter
                    isLoading={isLoading}
                    label='Редактирайте'
                    formName='form-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm