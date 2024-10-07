import useArtisansQuery from '@/components/api/artisans/artisansQuery';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import CompanySelector from '@/components/common/FormElements/FormCompanySelector';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import { artisanDefaults, ArtisanSchema, newArtisanSchema } from '@/components/models/artisan/newArtisanSchema';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateArtisan = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateArtisan } = useArtisansQuery();
    const { mutate, isPending } = useCreateArtisan({ setIsOpen });

    const form = useForm<ArtisanSchema>({
        resolver: zodResolver(newArtisanSchema),
        defaultValues: artisanDefaults,
        mode: 'onChange'
    });

    const handleSubmit = (artisanData: ArtisanSchema) => {
        mutate(artisanData, {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full md:max-w-[12rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new artisan</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                    <DialogHeader title='Add new artisan' />
                    <FormProvider {...form}>
                        <form
                            id='artisan-form'
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
                                disabled={!form.formState.isDirty || isPending}
                                label='Submit'
                                formName='artisan-form'
                                className='mt-6'
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog >
        </div>
    )
}

export default CreateArtisan