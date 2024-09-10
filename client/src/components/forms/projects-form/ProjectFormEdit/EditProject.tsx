
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import { ProjectFormProps } from '@/types/project-types/projectTypes';
import useEditProject from '@/components/hooks/ProjectsHooks/useEditProject';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';

const EditForm = ({ project, onSuccess }: ProjectFormProps) => {
    const { form, isLoading, onSubmit } = useEditProject(project, onSuccess);

    return (
        <FormProvider {...form}>
            <form
                id='edit-project'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogHeader
                    title='Edit project'
                    user={`${project?.name}`}
                />

                <FormFieldInput
                    type='text'
                    label='Project name'
                    name='name'
                />

                <FormFieldInput
                    type='email'
                    label='Project email'
                    name='email'
                />

                <div className='flex flex-1 pt-2 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        defaultVal={`${project && project.status}`}
                    />
                    <CompanySelector
                        label='Select company'
                        name='company_name'
                        defaultVal={`${project && project.company_name}`}
                    />
                </div>
                <div className='flex flex-col gap-2 pt-2'>
                    <FormDatePicker
                        name='start_date'
                        label='Choose new start date'
                        description=''
                        selected={new Date(`${project && project.start_date}`).toLocaleDateString().slice(0, 10)}
                    />
                    <FormDatePicker
                        name='end_date'
                        label='Choose new end date'
                        description=''
                        selected={new Date(`${project && project.end_date}`).toLocaleDateString().slice(0, 10)}
                    />
                </div>

                <FormTextareaInput
                    placeholder='Project notes...'
                    className='resize-none'
                    name='note'
                    type='text'
                    label='Enter notes for your project'
                />

                <DialogFooter
                    isLoading={isLoading}
                    label='Submit'
                    formName='edit-project'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm