import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerDesktop from '@/components/common/DialogElements/DialogTriggerDesktop';
import DialogTriggerMobile from '@/components/common/DialogElements/DialogTriggerMobile';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import UserSelector from '@/components/common/FormElements/FormUserSelector';
import useArtisanEntityHandlers from '@/components/hooks/ArtisansHooks/useArtisansEntityHook';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { artisanDefaults, newArtisanSchema } from '@/components/models/artisan/newArtisanSchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

const CreateArtisan = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const onDesktop = useMediaQuery('(min-width: 768px)');

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
                                    title='Add new artisan'
                                />

                                <FormFieldInput
                                    type='text'
                                    label='Artisan name'
                                    name='name'
                                />

                                <div className='flex flex-1 justify-between'>
                                    <StatusSelector
                                        label='Status'
                                        name='status'
                                        placeholder='inactive'
                                    />
                                    <CompanySelector
                                        label='Select company'
                                        name='company'
                                    />
                                    <UserSelector
                                        label='Select user'
                                        name='user'
                                    />
                                </div>

                                <FormTextareaInput
                                    name='note'
                                    label='Enter note about the artisan'
                                    type='text'
                                />

                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='artisan-form'
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