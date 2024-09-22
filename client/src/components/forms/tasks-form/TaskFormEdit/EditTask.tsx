import useTasksApi from '@/components/api/tasksApi';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaskContext } from '@/context/Task/TaskContext';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const EditTask = () => {
    const { getTaskById } = useTasksApi();
    const { dispatch, state } = useTaskContext();
    const { task, isLoading } = state;
    const { id, taskId } = useParams();

    const form = useForm();

    useEffect(() => {
        if (taskId && (!task || task?.id !== taskId)) {
            dispatch({
                type: 'RESET_TASKS'
            })
            getTask();
        }
    }, [id, taskId]);

    const getTask = async () => {
        await getTaskById(dispatch, id as string, taskId as string);
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
                                    <h3 className="font-semibold text-xl">Task</h3>
                                    <p className='text-gray-400'>{task.name}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Price per measure</h3>
                                    <p className='text-gray-400'>{task.price_per_measure}</p>
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
                                <form>
                                    <CardContent>
                                        <FormFieldInput
                                            type='text'
                                            label='Task name'
                                            name='name'
                                            value={task.name}
                                        />
                                        <FormFieldInput
                                            type='text'
                                            label='Price per measure'
                                            name='price_per_measure'
                                            value={task.price_per_measure}
                                        />
                                        <FormFieldInput
                                            type='text'
                                            label='Total work in measure'
                                            name='total_work_in_selected_measure'
                                            value={task.total_work_in_selected_measure}
                                        />
                                        <FormFieldInput
                                            type='text'
                                            label='Total price'
                                            name='total_price'
                                            value={task.total_price}
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
                                                value={task.note}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <DialogFooter
                                            isLoading={isLoading}
                                            label='Save changes'
                                            formName='edit-project'
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