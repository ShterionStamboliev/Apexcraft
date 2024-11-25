import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import UsersSelector from '@/components/common/FormElements/FormUserSelector';
import {
    artisanDefaults,
    ArtisanSchema,
    newArtisanSchema,
} from '@/models/artisan/newArtisanSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

type CreateArtisanFormProps = {
    handleSubmit: (artisanData: ArtisanSchema) => void;
    isPending: boolean;
};

const CreateArtisanForm = ({
    handleSubmit,
    isPending,
}: CreateArtisanFormProps) => {
    const form = useForm<ArtisanSchema>({
        resolver: zodResolver(newArtisanSchema),
        defaultValues: artisanDefaults,
        mode: 'onChange',
    });

    return (
        <FormProvider {...form}>
            <form id='artisan-form' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput type='text' label='Artisan name' name='name' />
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
                        placeholder='active'
                    />
                    <UsersSelector label='Select user' name='artisanName' />
                    <CompanySelector label='Select company' name='company' />
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
                    formName='artisan-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    );
};

export default CreateArtisanForm;
