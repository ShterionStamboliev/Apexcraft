import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import StatusSelector from '@/components/common/FormElements/FormStatusSelector'
import { activityDefaults, ActivitySchema, newActivitySchema } from '@/components/models/activity/newActivitySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

type CreateActivityFormProps = {
    handleSubmit: (activityData: ActivitySchema) => void;
    isPending: boolean;
}

const CreateActivityForm = ({ handleSubmit, isPending }: CreateActivityFormProps) => {
    const form = useForm<ActivitySchema>({
        resolver: zodResolver(newActivitySchema),
        defaultValues: activityDefaults,
        mode: 'onChange',
    });

    return (
        <FormProvider {...form}>
            <form
                id='activity-form'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormFieldInput
                    type='text'
                    label='Activity type'
                    name='name'
                />
                <div className='flex flex-1 pt-2 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        placeholder='active'
                    />
                </div>
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit'
                    formName='activity-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default CreateActivityForm;