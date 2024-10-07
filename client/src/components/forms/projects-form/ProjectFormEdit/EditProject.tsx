
import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import { Project } from '@/types/project-types/projectTypes';
import { useState } from 'react';
import useProjectsQuery from '@/components/api/projects/projectsQuery';
import { newProjectSchema, ProjectSchema } from '@/components/models/project/newProjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

type ProjectFormProps = {
    projectId: string;
    project: Project;
}

const EditProjectForm = ({ project, projectId }: ProjectFormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useEditProject } = useProjectsQuery();
    const { mutate, isPending } = useEditProject({ projectId, setIsOpen });

    const form = useForm<ProjectSchema>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            company_name: project.company_name,
            name: project.name,
            address: project.address,
            email: project.email,
            start_date: project.start_date,
            end_date: project.end_date,
            note: project.note,
            status: project.status
        },
        mode: 'onChange'
    });

    const handleSubmit = (projectData: ProjectSchema) => {
        mutate(projectData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[30rem]'>
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
                        />
                        <FormFieldInput
                            type='text'
                            label='Project address'
                            name='address'
                        />
                        <FormFieldInput
                            type='email'
                            label='Project email'
                            name='email'
                        />
                        <div className='flex flex-1 flex-wrap pt-2 justify-between'>
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
                        <div className='flex flex-col pt-4 sm:flex-row sm:flex-1 sm:justify-between'>
                            <FormDatePicker
                                name='start_date'
                                label='Select new start date'
                                selected={new Date(`${project && project.start_date}`).toLocaleDateString().slice(0, 10)}
                            />
                            <FormDatePicker
                                name='end_date'
                                label='Select new end date'
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
                            disabled={!form.formState.isDirty || isPending}
                            label='Submit'
                            formName='edit-project'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default EditProjectForm