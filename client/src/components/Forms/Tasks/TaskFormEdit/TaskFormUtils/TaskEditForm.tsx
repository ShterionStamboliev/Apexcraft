import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import ActivitySelector from '@/components/common/FormElements/FormActivitySelector';
import ArtisanSelector from '@/components/common/FormElements/FormArtisanSelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import MeasureSelector from '@/components/common/FormElements/FormMeasureSelector';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, DollarSign, Hammer } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

const TaskEditForm = ({
    form,
    task,
    isLoading,
    isFormDirty,
    submitFormHandler,
}: any) => {
    return (
        <Card>
            <CardHeader className='bg-header rounded-t-lg p-5'>
                <CardTitle className='text-xl text-center'>Edit Task</CardTitle>
            </CardHeader>
            <FormProvider {...form}>
                <form
                    id='task-edit'
                    onSubmit={form.handleSubmit(submitFormHandler)}
                >
                    <CardContent className='p-5 space-y-4'>
                        <div className='grid grid-cols-1 gap-2'>
                            <FormFieldInput
                                type='text'
                                label='Task name'
                                name='name'
                                className='pl-10'
                                Icon={ClipboardList}
                            />
                            <FormFieldInput
                                type='text'
                                label='Price per measure'
                                name='price_per_measure'
                                className='pl-10'
                                Icon={DollarSign}
                            />
                            <FormFieldInput
                                type='text'
                                label='Total work in measure'
                                name='total_work_in_selected_measure'
                                className='pl-10'
                                Icon={Hammer}
                            />
                            <FormFieldInput
                                type='text'
                                label='Total price'
                                name='total_price'
                                className='pl-10'
                                Icon={DollarSign}
                            />
                        </div>
                        <div className='flex flex-col flex-wrap sm:flex-row space-y-4 sm:space-y-0 sm:flex-1 sm:justify-between md:gap-2'>
                            <FormDatePicker
                                name='start_date'
                                label='Select new start date'
                                selected={new Date(`${task && task.start_date}`)
                                    .toLocaleDateString()
                                    .slice(0, 10)}
                                className='min-w-[15rem] space-y-0'
                            />
                            <FormDatePicker
                                name='end_date'
                                label='Select new end date'
                                selected={new Date(`${task && task.end_date}`)
                                    .toLocaleDateString()
                                    .slice(0, 10)}
                                className='min-w-[15rem] space-y-0'
                            />
                        </div>

                        <div className='flex flex-col flex-wrap sm:flex-row space-y-4 sm:space-y-0 sm:flex-1 sm:justify-between md:gap-2'>
                            <ArtisanSelector
                                name='artisan'
                                label='Select artisan'
                                defaultVal={task && task.artisanName}
                                className='w-full sm:w-[15rem]'
                            />
                            <ActivitySelector
                                name='activity'
                                label='Select activity'
                                defaultVal={task && task.activityName}
                                className='w-full sm:w-[15rem]'
                            />
                        </div>
                        <div className='flex flex-1 justify-between'>
                            <StatusSelector
                                label='Status'
                                name='status'
                                defaultVal={task && task.status}
                            />
                            <MeasureSelector
                                name='measure'
                                label='Select measure'
                                defaultVal={task && task.measureName}
                            />
                        </div>

                        <FormTextareaInput
                            className='resize-none pt-2'
                            name='note'
                            type='text'
                            label='Task notes'
                        />
                        <DialogFooter
                            disabled={!isFormDirty || isLoading}
                            label='Save changes'
                            formName='task-edit'
                            className='mt-6'
                        />
                    </CardContent>
                </form>
            </FormProvider>
        </Card>
    );
};

export default TaskEditForm;
