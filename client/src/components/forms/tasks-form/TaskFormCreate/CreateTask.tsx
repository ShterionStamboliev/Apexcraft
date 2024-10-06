import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import { newTaskSchema, taskDefaults, TaskSchema } from '@/components/models/task/newTaskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ArtisanSelector from '@/components/common/FormElements/FormArtisanSelector';
import ActivitySelector from '@/components/common/FormElements/FormActivitySelector';
import MeasureSelector from '@/components/common/FormElements/FormMeasureSelector';
import { useState } from 'react';
import useTasksQuery from '@/components/api/tasks/tasksQuery';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const CreateTask = () => {
    const { id } = useParams();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateTask } = useTasksQuery();
    const { mutate, isPending } = useCreateTask({ id, setIsOpen });

    const form = useForm<TaskSchema>({
        defaultValues: taskDefaults,
        resolver: zodResolver(newTaskSchema),
        mode: 'onChange'
    });

    const handleSubmit = async (taskData: TaskSchema) => {
        mutate(taskData);
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full lg:max-w-[12rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new task</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px] gap-0'>
                    <DialogHeader title='Create new task' />
                    <FormProvider {...form}>
                        <form
                            id='task-form'
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormFieldInput
                                type='text'
                                label='Task name'
                                name='name'
                            />
                            <FormFieldInput
                                type='text'
                                label='Price per measure'
                                name='price_per_measure'
                            />
                            <FormFieldInput
                                type='text'
                                label='Total work in selected measure'
                                name='total_work_in_selected_measure'
                            />
                            <FormFieldInput
                                type='text'
                                label='Total price'
                                name='total_price'
                            />
                            <div className='flex flex-col flex-1 pt-2 justify-between'>
                                <div className='flex justify-between'>
                                    <StatusSelector
                                        label='Status'
                                        name='status'
                                        defaultVal=''
                                    />
                                    <ArtisanSelector
                                        label='Select artisan'
                                        name='artisan'
                                        defaultVal=''
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <ActivitySelector
                                        label='Select activity type'
                                        name='activity'
                                        defaultVal=''
                                    />
                                    <MeasureSelector
                                        label='Select measure type'
                                        name='measure'
                                        defaultVal=''
                                    />
                                </div>
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
                            <FormTextareaInput
                                name='note'
                                label='Enter notes for your project'
                                type='text'
                            />
                            <DialogFooter
                                disabled={isPending}
                                isLoading={isPending}
                                label='Submit'
                                formName='task-form'
                                className='mt-6'
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTask;
