import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtons from '@/components/common/DialogElements/DialogTriggerButtons/DialogTriggerButtons';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { useArtisanEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { artisanDefaults, newArtisanSchema } from '@/components/models/artisan/newArtisanSchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';

const CreateArtisan = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const formOptions: Partial<UseFormProps<Artisan>> = {
        resolver: zodResolver(newArtisanSchema),
        mode: 'onChange',
        defaultValues: artisanDefaults
    };

    const { handleCreateEntity, isLoading } = useArtisanEntityHandlers();
    const {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    } = useSubmitHandler<Artisan>(handleCreateEntity, formOptions);

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='artisan-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <DialogTriggerButtons />

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                                <DialogHeader
                                    title='Add new artisan'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Artisan name'
                                    name='name'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Artisan phone'
                                    name='number'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Artisan email'
                                    name='email'
                                />
                                <div className='flex flex-1 pt-2 justify-between'>
                                    <StatusSelector
                                        label='Status'
                                        name='status'
                                        placeholder='inactive'
                                    />
                                    <CompanySelector
                                        label='Select company'
                                        name='company'
                                    />
                                </div>

                                <FormTextareaInput
                                    name='note'
                                    label='Enter note about the artisan'
                                    type='text'
                                    className='pt-2'
                                />
                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='artisan-form'
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

export default CreateArtisan