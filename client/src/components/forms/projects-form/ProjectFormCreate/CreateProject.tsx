import useProjectsQuery from '@/components/api/projects/projectsQuery';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import { newProjectSchema, projectDefaults, ProjectSchema } from '@/components/models/project/newProjectSchema';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateProject = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateProject } = useProjectsQuery();
    const { mutate, isPending } = useCreateProject({ setIsOpen });

    const form = useForm<ProjectSchema>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: projectDefaults,
        mode: 'onChange'
    });

    const handleSubmit = async (projectData: ProjectSchema) => {
        mutate(projectData);
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full lg:max-w-[12rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new project</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px] gap-0'>
                    <DialogHeader title='Add new project' />
                    <FormProvider {...form}>
                        <form
                            id='project-form'
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
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
                            <FormFieldInput
                                type='text'
                                label='Project address'
                                name='address'
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
                                    description=''
                                />
                                <FormDatePicker
                                    name='end_date'
                                    label='Select an end date'
                                    description=''
                                />
                            </div>
                            <FormTextareaInput
                                name='note'
                                label='Enter notes for your project'
                                type='text'
                            />
                            <DialogFooter
                                isLoading={isPending}
                                label='Submit'
                                formName='project-form'
                                className='mt-6'
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateProject