
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import { ProjectFormProps } from '@/types/project-types/projectTypes';
import useEditProject from '@/components/hooks/ProjectsHooks/useEditProject';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';

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
                    name='project_name'
                    className='py-3'
                />

                <FormFieldInput
                    type='email'
                    label='Project email'
                    name='project_email'
                    className='py-3'
                />

                <FormFieldInput
                    type='text'
                    label='Project company'
                    name='project_company'
                    className='py-3'
                />

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