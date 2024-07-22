import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtons from '@/components/common/DialogElements/DialogTriggerButtons/DialogTriggerButtons';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { useMeasureEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { measureDefaults, newMeasureSchema } from '@/components/models/measure/newMeasureSchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Measure } from '@/types/measure-types/measureTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';

const CreateMeasure = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const formOptions: Partial<UseFormProps<Measure>> = {
        resolver: zodResolver(newMeasureSchema),
        mode: 'onChange',
        defaultValues: measureDefaults,
    };

    const { handleCreateEntity, isLoading } = useMeasureEntityHandlers();
    const {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    } = useSubmitHandler<Measure>(handleCreateEntity, formOptions);

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='measure-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <DialogTriggerButtons />

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                                <DialogHeader
                                    title='Добавете нова единица'
                                />

                                <FormFieldInput
                                    type='text'
                                    label='Вид единица'
                                    name='name'
                                />

                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Добавете'
                                    formName='measure-form'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateMeasure