import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import ActivitySelector from '@/components/common/FormElements/FormActivitySelector'
import ArtisanSelector from '@/components/common/FormElements/FormArtisanSelector'
import FormDatePicker from '@/components/common/FormElements/FormDatePicker'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import MeasureSelector from '@/components/common/FormElements/FormMeasureSelector'
import StatusSelector from '@/components/common/FormElements/FormStatusSelector'
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormProvider } from 'react-hook-form'

const TaskEditForm = ({ form, task, isLoading, submitFormHandler }: any) => {

    return (
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
                            className='p-0'
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
                        <div className='flex flex-col flex-wrap pt-4 sm:flex-row sm:flex-1 sm:justify-between'>
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
                        <div className='flex flex-wrap justify-between'>
                            <div>
                                <ArtisanSelector
                                    name='artisan'
                                    label='Select artisan'
                                    defaultVal={`${task && task.artisanName}`}
                                />
                                <MeasureSelector
                                    name='measure'
                                    label='Select measure'
                                    defaultVal={`${task && task.measureName}`}
                                />
                            </div>
                            <div>
                                <ActivitySelector
                                    name='activity'
                                    label='Select activity'
                                    defaultVal={`${task && task.activityName}`}
                                />
                                <StatusSelector
                                    label='Status'
                                    name='status'
                                    defaultVal={`${task && task.status}`}
                                />
                            </div>
                        </div>
                        <FormTextareaInput
                            className='resize-none pt-2'
                            name='note'
                            type='text'
                            label='Task notes'
                        />
                        <DialogFooter
                            isLoading={isLoading}
                            label='Save changes'
                            formName='task-edit'
                            className='mt-6'
                        />
                    </CardContent>
                </form>
            </FormProvider>
        </Card>
    )
}

export default TaskEditForm