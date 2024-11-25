import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import {
    ArtisanSchema,
    newArtisanSchema,
} from '@/models/artisan/newArtisanSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import UsersSelector from '@/components/common/FormElements/FormUserSelector';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/hooks/custom-hooks/useMutationHook';

type ArtisanFormProps = {
    artisanId: string;
    artisan: Artisan;
};

const EditArtisanForm = ({ artisan, artisanId }: ArtisanFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<ArtisanSchema>({
        URL: `/artisans/${artisanId}/edit`,
        queryKey: ['artisans'],
        successToast: 'Artisan updated successfully!',
        setIsOpen,
    });

    const form = useForm<ArtisanSchema>({
        resolver: zodResolver(newArtisanSchema),
        defaultValues: {
            name: artisan.name,
            email: artisan.email,
            company: artisan.company,
            number: artisan.number,
            note: artisan.note,
            artisanName: artisan.artisanName,
            status: artisan.status,
        },
        mode: 'onChange',
    });

    const handleSubmit = (artisanData: ArtisanSchema) => {
        mutate(artisanData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                <DialogHeader title='Edit artisan' />
                <FormProvider {...form}>
                    <form
                        id='form-edit'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
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
                        <div className='flex flex-wrap gap-1 flex-1 pt-2 justify-between'>
                            <StatusSelector
                                label='Status'
                                name='status'
                                defaultVal={artisan && artisan.status}
                            />
                            <UsersSelector
                                label='Select user'
                                name='artisanName'
                                defaultVal={artisan && artisan.artisanName}
                            />
                            <CompanySelector
                                label='Select company'
                                name='company'
                                defaultVal={artisan && artisan.company}
                            />
                        </div>
                        <FormTextareaInput
                            name='note'
                            label='Enter note about the artisan'
                            type='text'
                            className='pt-2'
                        />
                        <DialogFooter
                            disabled={!form.formState.isDirty || isPending}
                            label='Submit'
                            formName='form-edit'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EditArtisanForm;
