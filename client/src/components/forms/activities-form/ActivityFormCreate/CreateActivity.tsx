import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtons from '@/components/common/DialogElements/DialogTriggerButtons/DialogTriggerButtons';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { useActivityEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { activityDefaults, newActivitySchema } from '@/components/models/activity/newActivitySchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Activity } from '@/types/activity-types/activityTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, UseFormProps } from 'react-hook-form';

const CreateActivity = () => {

    const { role } = useAuth();
    const isManager = role === 'manager';

    const formOptions: Partial<UseFormProps<Activity>> = {
        resolver: zodResolver(newActivitySchema),
        mode: 'onChange',
        defaultValues: activityDefaults,
    };

    const { handleCreateEntity, isLoading } = useActivityEntityHandlers();
    const {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    } = useSubmitHandler<Activity>(handleCreateEntity, formOptions);

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='activity-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <DialogTriggerButtons />

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                                <DialogHeader
                                    title='Add new activity'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Activity type'
                                    name='name'
                                />
                                <FormDatePicker
                                    name='dateFrom'
                                    label='Pick date'
                                />
                                <FormDatePicker
                                    name='dateTo'
                                    label='Pick date'
                                />
                                <div className='flex flex-1 justify-between'>
                                    <StatusSelector
                                        label='Status'
                                        name='status'
                                        placeholder='active'
                                    />
                                </div>
                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='activity-form'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateActivity