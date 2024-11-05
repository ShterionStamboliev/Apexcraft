import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit'
import FormDatePicker from '@/components/common/FormElements/FormDatePicker'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput'
import TaskItemStatusSelector from '@/components/common/FormElements/TaskItemStatusSelector'
import useDialogState from '@/components/hooks/custom-hooks/useDialogState'
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { WorkItem, workItemSchema, WorkItemSchema } from '@/types/task-types/workItemType'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { FormProvider, useForm } from 'react-hook-form'

type UserWorkItemEditProps = {
    taskId: string;
    workItemId?: string;
    workItem: WorkItem;
}

const UserWorkItemEdit = ({ taskId, workItem, workItemId }: UserWorkItemEditProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<WorkItemSchema>({
        URL: `/my-projects/${taskId}/task/${workItemId}/edit`,
        queryKey: ['artisanTasks', taskId],
        successToast: 'Work item updated successfully!',
        setIsOpen
    });

    const form = useForm<WorkItemSchema>({
        resolver: zodResolver(workItemSchema),
        defaultValues: {
            name: workItem.name,
            start_date: format(new Date(workItem.start_date!), 'yyyy-MM-dd'),
            end_date: format(new Date(workItem.end_date!), 'yyyy-MM-dd'),
            note: workItem.note,
            finished_work: workItem.finished_work,
            status: workItem.status
        }
    });

    const handleSubmit = (workItemData: WorkItemSchema) => {
        mutate(workItemData, {
            onSuccess: () => {
                setIsOpen(false);
            }
        });
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='rounded-lg'>
                <DialogHeader className='items-center'>
                    <DialogTitle>Edit Work Item</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form id='user-work-item-edit' onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className='flex flex-col gap-2'>
                            <FormFieldInput
                                name='name'
                                label='Item title'
                                type='text'
                            />
                            <FormTextareaInput
                                name='note'
                                label='Item note'
                                type='text'
                            />
                            <FormTextareaInput
                                name='finished_work'
                                label='Finished work'
                                type='text'
                            />
                        </div>
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
                            name='status'
                            label='Select status'
                            defaultVal={`${workItem.status}`}
                        />
                        <DialogFooter
                            disabled={!form.formState.isDirty || isPending}
                            label='Submit changes'
                            formName='user-work-item-edit'
                            className='mt-6'
                        />
                    </form>
                </FormProvider >
            </DialogContent>
        </Dialog>
    )
}

export default UserWorkItemEdit