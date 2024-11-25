import { useForm, FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import {
    newTaskSchema,
    taskDefaults,
    TaskSchema,
} from '@/models/task/newTaskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ArtisanSelector from '@/components/common/FormElements/FormArtisanSelector';
import ActivitySelector from '@/components/common/FormElements/FormActivitySelector';
import MeasureSelector from '@/components/common/FormElements/FormMeasureSelector';
import { ClipboardList, DollarSign, Hammer } from 'lucide-react';

type CreateTaskFormProps = {
    handleSubmit: (taskData: TaskSchema) => void;
    isPending: boolean;
};

const CreateTaskForm = ({ handleSubmit, isPending }: CreateTaskFormProps) => {
    const form = useForm<TaskSchema>({
        defaultValues: taskDefaults,
        resolver: zodResolver(newTaskSchema),
        mode: 'onChange',
    });

    return (
        <FormProvider {...form}>
            <form id='task-form' onSubmit={form.handleSubmit(handleSubmit)}>
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
                    label='Total work in selected measure'
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
                <div className='flex flex-col flex-1 pt-2 justify-between'>
                    <div className='flex justify-between'>
                        <StatusSelector label='Status' name='status' />
                        <ArtisanSelector
                            label='Select artisan'
                            name='artisan'
                        />
                    </div>
                    <div className='flex justify-between'>
                        <ActivitySelector
                            label='Select activity type'
                            name='activity'
                        />
                        <MeasureSelector
                            label='Select measure type'
                            name='measure'
                        />
                    </div>
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
                <FormTextareaInput
                    name='note'
                    label='Enter notes for your project'
                    type='text'
                />
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit'
                    formName='task-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    );
};

export default CreateTaskForm;
