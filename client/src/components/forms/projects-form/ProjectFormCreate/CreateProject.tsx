import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtons from '@/components/common/DialogElements/DialogTriggerButtons/DialogTriggerButtons';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { useProjectEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { newProjectSchema, projectDefaults } from '@/components/models/project/newProjectSchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Project } from '@/types/project-types/projectTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';

const CreateProject = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

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
                            <DialogTriggerButtons />

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px] gap-0'>
                                <DialogHeader
                                    title='Add new project'
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