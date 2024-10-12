import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import FormDatePicker from '@/components/common/FormElements/FormDatePicker'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import TaskItemStatusSelector from '@/components/common/FormElements/TaskItemStatusSelector'
import { WorkItemSchema, workItemDefaults, workItemSchema } from '@/types/task-types/workItemType'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

type CreateWorkItemFormProps = {
    handleSubmit: (workItemData: WorkItemSchema) => void;
    isPending: boolean;
}

const CreateWorkItemForm = ({ handleSubmit, isPending }: CreateWorkItemFormProps) => {
    const form = useForm<WorkItemSchema>({
        resolver: zodResolver(workItemSchema),
        defaultValues: workItemDefaults,
        mode: 'onChange'
    });

    return (
        <FormProvider {...form}>
            <form id='task-item' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput
                    className='p-0'
                    label='Task name'
                    name='name'
                    type='text'
                />
                <FormFieldInput
                    label='Note'
                    name='note'
                    type='text'
                />
                <FormFieldInput
                    label='Finished work'
                    name='finished_work'
                    type='text'
                />
                <div className='flex flex-col pt-4 sm:flex-row sm:flex-1 sm:justify-between'>
                    <FormDatePicker
                        name='start_date'
                        label='Select a start date'
                    />
                    <FormDatePicker
                        name='end_date'
                        label='Select an end date'
                    />
                </div>
                <TaskItemStatusSelector
                    label='Status'
                    name='status'
                    defaultVal=''
                />
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    className='mt-6'
                    formName='task-item'
                    label='Submit'
                />
            </form>
        </FormProvider>
    )
}

export default CreateWorkItemForm