
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import { ProjectFormProps } from '@/types/project-types/projectTypes';
import useEditProject from '@/components/hooks/ProjectsHooks/useEditProject';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';

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
                    className='py-3'
                />

                <FormFieldInput
                    type='email'
                    label='Project email'
                    name='email'
                    className='py-3'
                />

                <div className='flex flex-1 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        defaultVal={`${project && project.status}`}
                    />
                    <CompanySelector
                        label='Select company'
                        name='company_id'
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
                    label='Edit'
                    formName='edit-project'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm