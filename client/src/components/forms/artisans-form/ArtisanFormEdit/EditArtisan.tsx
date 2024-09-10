
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import useEditArtisan from '@/components/hooks/ArtisansHooks/useEditArtisan';
import { ArtisanFormProps } from '@/types/artisan-types/artisanTypes';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';

const EditForm = ({ artisan, onSuccess }: ArtisanFormProps) => {
    const { form, isLoading, onSubmit } = useEditArtisan(artisan, onSuccess);

    return (
        <FormProvider {...form}>
            <form
                id='form-edit'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogHeader
                    title='Edit artisan'
                    user={`${artisan?.name}`}
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
                        defaultVal={artisan && artisan.status}
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
                    isLoading={isLoading}
                    label='Submit'
                    formName='form-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm