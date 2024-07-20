import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerDesktop from '@/components/common/DialogElements/DialogTriggerDesktop';
import DialogTriggerMobile from '@/components/common/DialogElements/DialogTriggerMobile';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import useProjectEntityHandlers from '@/components/hooks/ProjectsHooks/useProjectsEntityHook';
import { newProjectSchema, projectDefaults } from '@/components/models/project/newProjectSchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Project } from '@/types/project-types/projectTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

const CreateProject = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const onDesktop = useMediaQuery('(min-width: 768px)');

    const formOptions: Partial<UseFormProps<Project>> = {
        resolver: zodResolver(newProjectSchema),
        mode: 'onChange',
        defaultValues: projectDefaults,
    };

    const { handleCreateEntity, isLoading } = useProjectEntityHandlers();
    const {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    } = useSubmitHandler<Project>(handleCreateEntity, formOptions);

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='project-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            {onDesktop
                                ? (
                                    <DialogTriggerDesktop />
                                )
                                : (
                                    <DialogTriggerMobile />
                                )
                            }

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                                <DialogHeader
                                    title='Add new project'
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
                                    />
                                    <CompanySelector
                                        label='Select company'
                                        name='company_id'
                                    />
                                </div>

                                <FormTextareaInput
                                    name='note'
                                    label='Enter notes for your project'
                                    type='text'
                                />
                                
                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='project-form'
                                    className='mt-6'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateProject