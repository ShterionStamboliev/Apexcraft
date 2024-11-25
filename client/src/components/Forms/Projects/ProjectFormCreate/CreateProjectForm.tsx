import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import {
    newProjectSchema,
    projectDefaults,
    ProjectSchema,
} from '@/models/project/newProjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, Mail, MapPin } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

type CreateProjectFormProps = {
    handleSubmit: (projectData: ProjectSchema) => void;
    isPending: boolean;
};

const CreateProjectForm = ({
    handleSubmit,
    isPending,
}: CreateProjectFormProps) => {
    const form = useForm<ProjectSchema>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: projectDefaults,
        mode: 'onChange',
    });

    return (
        <FormProvider {...form}>
            <form id='project-form' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput
                    type='text'
                    label='Project name'
                    name='name'
                    className='pl-10'
                    Icon={ClipboardList}
                />
                <FormFieldInput
                    type='email'
                    label='Project email'
                    name='email'
                    className='pl-10'
                    Icon={Mail}
                />
                <FormFieldInput
                    type='text'
                    label='Project address'
                    name='address'
                    className='pl-10'
                    Icon={MapPin}
                />
                <div className='flex flex-1 pt-2 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        defaultVal='active'
                    />
                    <CompanySelector
                        label='Select company'
                        name='company_name'
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
                <FormTextareaInput
                    name='note'
                    label='Enter notes for your project'
                    type='text'
                />
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit'
                    formName='project-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    );
};

export default CreateProjectForm;
