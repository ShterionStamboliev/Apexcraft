import useTaskItemQuery from '@/components/api/task-items/taskItemsQuery'
import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import FormDatePicker from '@/components/common/FormElements/FormDatePicker'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import TaskItemStatusSelector from '@/components/common/FormElements/TaskItemStatusSelector'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { taskItemDefaults, taskItemSchema, TaskItemSchema } from '@/types/task-types/taskItemType'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const CreateTaskItem = () => {
    const { id, taskId } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<TaskItemSchema>({
        defaultValues: taskItemDefaults,
        resolver: zodResolver(taskItemSchema),
        mode: 'onChange'
    });
    
    const { useCreateTaskItem } = useTaskItemQuery();

    const { mutate } = useCreateTaskItem(id!, taskId!, setIsOpen);

    const onSubmit = (data: TaskItemSchema) => {
        mutate(data);
        form.reset();
        setIsOpen(false);
    };

    return (
        <div className="mb-6">
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new work item</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="rounded-lg sm:max-w-[30rem]">
                    <DialogHeader>
                        <DialogTitle className='text-center'>Add new work item</DialogTitle>
                    </DialogHeader>
                    <FormProvider {...form}>
                        <form id='task-item' onSubmit={form.handleSubmit(onSubmit)}>
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
                                    description=''
                                />
                                <FormDatePicker
                                    name='end_date'
                                    label='Select an end date'
                                    description=''
                                />
                            </div>
                            <TaskItemStatusSelector
                                label='Status'
                                name='status'
                                defaultVal=''
                            />
                            <DialogFooter
                                className='mt-6'
                                formName='task-item'
                                label='Submit'
                            // isLoading={isLoading}
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateTaskItem