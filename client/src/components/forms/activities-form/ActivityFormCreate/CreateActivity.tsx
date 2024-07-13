import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerDesktop from '@/components/common/DialogElements/DialogTriggerDesktop';
import DialogTriggerMobile from '@/components/common/DialogElements/DialogTriggerMobile';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import useActivityEntityHandlers from '@/components/hooks/ActivitiesHooks/useActivitiesEntityHook';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { activityDefaults, newActivitySchema } from '@/components/models/activity/newActivitySchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Activity } from '@/types/activity-types/activityTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, UseFormProps } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

const CreateActivity = () => {

    const { role } = useAuth();
    const isManager = role === 'manager';

    const onDesktop = useMediaQuery('(min-width: 768px)');

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
                                    title='Добавете нова дейност'
                                />

                                <FormFieldInput
                                    type='text'
                                    label='Вид дейност'
                                    name='name'
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
                                    label='Добавете'
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