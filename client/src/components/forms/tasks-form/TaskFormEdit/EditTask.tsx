import useTasksApi from '@/components/api/tasksApi';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import { EditTaskSchema, newTaskSchema, taskEditSchema, TaskSchema } from '@/components/models/task/newTaskSchema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaskContext } from '@/context/Task/TaskContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const EditTask = () => {
    const { getTaskById, editTask } = useTasksApi();
    const { dispatch, state } = useTaskContext();
    const { task, isLoading } = state;

    const { id, taskId } = useParams();

    const form = useForm<EditTaskSchema>({
        resolver: zodResolver(taskEditSchema),
        defaultValues: {
            name: task?.name,
            price_per_measure: task?.price_per_measure,
            total_work_in_selected_measure: task?.total_work_in_selected_measure,
            total_price: task?.total_price,
            start_date: task?.start_date,
            end_date: task?.end_date,
            status: task?.status,
            note: task?.note
        }
    });

    const { reset } = form;

    useEffect(() => {
        if (taskId && (!task || task?.id !== taskId)) {
            dispatch({
                type: 'RESET_TASKS'
            })
            getTask();
        }
    }, [id, taskId]);

    useEffect(() => {
        if (task) {
            reset({
                name: task.name,
                price_per_measure: task.price_per_measure,
                total_work_in_selected_measure: task.total_work_in_selected_measure,
                total_price: task.total_price,
                start_date: task.start_date,
                end_date: task.end_date,
                status: task.status,
                note: task.note
            });
        }
    }, [task, reset]);

    const getTask = async () => {
        await getTaskById(dispatch, id!, taskId!);
    }

    const submitFormHandler = async (formData: EditTaskSchema) => {
        console.log('Form data:', formData);

        const updatedTask = {
            ...formData,
            start_date: formData.start_date?.toString(),
            end_date: formData.end_date?.toString(),
        }
        await editTask(dispatch, id!, taskId!, updatedTask);
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {task && (
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-6 text-center">Task View and Edit</h1>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Task Information View */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-xl text-center'>Task Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-xl">Task name</h3>
                                    <p className='text-gray-400'>{task.name}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Price per measure</h3>
                                    <p className='text-gray-400'>{task.price_per_measure}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Total work in measure</h3>
                                    <p className='text-gray-400'>{task.total_work_in_selected_measure}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Total price</h3>
                                    <p className='text-gray-400'>{task.total_price}</p>
                                </div>
                                <div className="flex items-center pt-4">
                                    <CalendarIcon className="mr-2" />
                                    <h3 className='mr-2'>Start:</h3>
                                    <span className='text-gray-400'>{format((task.start_date as string), "PPP")}</span>
                                </div>
                                <div className="flex items-center">
                                    <CalendarIcon className="mr-2" />
                                    <h3 className='mr-2'>End:</h3>
                                    <span className='text-gray-400'>{format((task.end_date as string), "PPP")}</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="mr-2" />
                                    <h3 className='mr-2'>Status:</h3>
                                    <span className='text-gray-400'>{task.status}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Task Edit Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-xl text-center'>Edit Task</CardTitle>
                            </CardHeader>

                            <FormProvider {...form}>
                                <form id='task-edit' onSubmit={form.handleSubmit(submitFormHandler)}>
                                    <CardContent>
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
                                            label='Total work in measure'
                                            name='total_work_in_selected_measure'
                                        />
                                        <FormFieldInput
                                            type='text'
                                            label='Total price'
                                            name='total_price'
                                        />
                                        <div className='flex flex-col pt-4 sm:flex-row sm:flex-1 sm:justify-between'>
                                            <FormDatePicker
                                                name='start_date'
                                                label='Select new start date'
                                                description=''
                                            selected={new Date(`${task && task.start_date}`).toLocaleDateString().slice(0, 10)}
                                            />
                                            <FormDatePicker
                                                name='end_date'
                                                label='Select new end date'
                                                description=''
                                            selected={new Date(`${task && task.end_date}`).toLocaleDateString().slice(0, 10)}
                                            />
                                        </div>
                                        <div className='flex flex-col flex-1 justify-between'>
                                            <StatusSelector
                                                label='Status'
                                                name='status'
                                                defaultVal={`${task && task.status}`}
                                            />
                                            <FormTextareaInput
                                                className='resize-none pt-2'
                                                name='note'
                                                type='text'
                                                label='Task notes'
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <DialogFooter
                                            // isLoading={isLoading}
                                            label='Save changes'
                                            formName='task-edit'
                                            className='mt-6'
                                        />
                                    </CardFooter>
                                </form>
                            </FormProvider>
                        </Card>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTask;