import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import { ClipboardList, Mail, MapPin } from 'lucide-react';
import { useProjectFormHook } from '@/hooks/forms/useProjectForm';
import { Project } from '@/types/project-types/projectTypes';
import { ProjectSchema } from '@/models/project/projectSchema';
import { useCachedData } from '@/hooks/useQueryHook';

type EditProjectFormProps = {
    handleSubmit: (projectData: ProjectSchema) => void;
    isPending: boolean;
    projectId: string;
};

const EditProjectForm = ({
    handleSubmit,
    isPending,
    projectId,
}: EditProjectFormProps) => {
    const project = useCachedData<Project>({
        queryKey: ['projects'],
        selectFn: (data: Project[]) =>
            data.find((project) => project.id === projectId),
    });

    const { useEditProjectForm } = useProjectFormHook();

    const form = useEditProjectForm(project as Partial<Project>);

    return (
        <div>
            <FormProvider {...form}>
                <form
                    id='edit-project'
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <DialogHeader title='Edit project' />
                    <FormFieldInput
                        type='text'
                        label='Project name'
                        name='name'
                        className='pl-10'
                        Icon={ClipboardList}
                    />
                    <FormFieldInput
                        type='text'
                        label='Project address'
                        name='address'
                        className='pl-10'
                        Icon={MapPin}
                    />
                    <FormFieldInput
                        type='email'
                        label='Project email'
                        name='email'
                        className='pl-10'
                        Icon={Mail}
                    />
                    <div className='flex flex-1 flex-wrap pt-2 justify-between'>
                        <StatusSelector
                            label='Status'
                            name='status'
                            defaultVal={project && project.status}
                        />
                        <CompanySelector
                            label='Select company'
                            name='company_name'
                            defaultVal={project && project.company_name}
                        />
                    </div>
                    <div className='flex flex-col pt-4 sm:flex-row sm:flex-1 sm:justify-between'>
                        <FormDatePicker
                            name='start_date'
                            label='Select new start date'
                            selected={new Date(
                                `${project && project.start_date}`
                            )
                                .toLocaleDateString()
                                .slice(0, 10)}
                        />
                        <FormDatePicker
                            name='end_date'
                            label='Select new end date'
                            selected={new Date(`${project && project.end_date}`)
                                .toLocaleDateString()
                                .slice(0, 10)}
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
                        disabled={!form.formState.isDirty || isPending}
                        label='Save changes'
                        formName='edit-project'
                        className='mt-6'
                    />
                </form>
            </FormProvider>
        </div>
    );
};

export default EditProjectForm;
