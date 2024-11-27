import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import UsersSelector from '@/components/common/FormElements/FormUserSelector';
import { useArtisanFormHooks } from '@/hooks/forms/useArtisanForm';
import { ArtisanSchema } from '@/models/artisan/artisanSchema';
import { Mail, Phone, User } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

type CreateArtisanFormProps = {
    handleSubmit: (artisanData: ArtisanSchema) => void;
    isPending: boolean;
};

const CreateArtisanForm = ({
    handleSubmit,
    isPending,
}: CreateArtisanFormProps) => {
    const { useCreateArtisanForm } = useArtisanFormHooks();

    const form = useCreateArtisanForm();

    return (
        <FormProvider {...form}>
            <form id='artisan-form' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput
                    type='text'
                    label='Artisan name'
                    name='name'
                    className='pl-10'
                    Icon={User}
                />
                <FormFieldInput
                    type='text'
                    label='Artisan phone'
                    name='number'
                    className='pl-10'
                    Icon={Phone}
                />
                <FormFieldInput
                    type='text'
                    label='Artisan email'
                    name='email'
                    className='pl-10'
                    Icon={Mail}
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
