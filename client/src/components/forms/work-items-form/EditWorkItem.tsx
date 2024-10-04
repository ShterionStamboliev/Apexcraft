import useWorkItemsQuery from '@/components/api/work-items/workItemsQuery';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import TaskItemStatusSelector from '@/components/common/FormElements/TaskItemStatusSelector';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { workItemSchema } from '@/types/task-types/workItemType'
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod'

type FormValues = z.infer<typeof workItemSchema>;

interface EditWorkItemProps {
    id: string;
    taskId: string;
    workItemId: string;
    task: FormValues;
}

const EditWorkItemForm = ({ id, taskId, workItemId, task }: EditWorkItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(workItemSchema),
        defaultValues: {
            name: task.name,
            start_date: format(new Date(task.start_date!), 'yyyy-MM-dd'),
            end_date: format(new Date(task.end_date!), 'yyyy-MM-dd'),
            note: task.note,
            finished_work: task.finished_work,
            status: task.status
        }
    });

    const { useEditWorkItem } = useWorkItemsQuery();

    const { mutate } = useEditWorkItem(id, taskId, workItemId, setIsOpen);

    const handleSubmit = (data: FormValues) => {
        mutate(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Edit  />
                </Button>
            </DialogTrigger>
            <DialogContent className='rounded-lg'>
                <DialogHeader className='items-center'>
                    <DialogTitle>Edit Work Item</DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form id='work-item-edit' onSubmit={form.handleSubmit(handleSubmit)}>
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
                                description=''
                            />
                            <FormDatePicker
                                name='end_date'
                                label='Select an end date'
                                description=''
                            />
                        </div>
                        <TaskItemStatusSelector
                            name='status'
                            label='Select status'
                            defaultVal={`${task.status}`}
                        />
                        <DialogFooter
                            label='Submit changes'
                            formName='work-item-edit'
                            className='mt-6'
                        />
                    </form>
                </FormProvider >
            </DialogContent>
        </Dialog>
    )
}

export default EditWorkItemForm