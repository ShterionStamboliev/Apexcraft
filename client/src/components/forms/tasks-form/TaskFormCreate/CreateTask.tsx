import { useForm, FormProvider } from 'react-hook-form';
import { useTaskContext } from '@/context/Task/TaskContext';
import { useParams } from 'react-router-dom';
import useTasksApi from '@/components/api/tasksApi';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtons from '@/components/common/DialogElements/DialogTriggerButtons/DialogTriggerButtons';
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
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';

const CreateTask = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';
    const { id } = useParams<{ id: string }>();
    const { createTask, getTasks } = useTasksApi();
    const { dispatch, state } = useTaskContext();
    const { isLoading } = state;

    const { fireErrorToast, fireSuccessToast } = useToastHook();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<TaskSchema>({
        resolver: zodResolver(newTaskSchema),
        defaultValues: taskDefaults
    });

    const onSubmit = async (data: TaskSchema) => {
        if (id) {
            try {
                await createTask(dispatch, id, {
                    ...data,
                    id,
                });
                setIsDialogOpen(false);
                fireSuccessToast('Task created')
                form.reset();
                await getTasks(dispatch, id);
            } catch (error) {
                fireErrorToast('Something went wrong')
            }
        }
    };

    return (
        <div className="flex gap-2 md:gap-8">
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='task-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        >
                            <DialogTriggerButtons />

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px] gap-0'>
                                <DialogHeader
                                    title='Create new task'
                                />

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
                                            label='Select artisans'
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
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='task-form'
                                    className='mt-6'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </div>
    );
};

export default CreateTask;
