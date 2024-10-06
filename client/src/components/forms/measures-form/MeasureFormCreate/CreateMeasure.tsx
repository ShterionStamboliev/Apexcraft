import useMeasuresQuery from '@/components/api/measures/measuresQuery';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { measureDefaults, MeasureSchema, newMeasureSchema } from '@/components/models/measure/newMeasureSchema';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm, } from 'react-hook-form';

const CreateMeasure = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateMeasure } = useMeasuresQuery();
    const { mutate, isPending } = useCreateMeasure({ setIsOpen });

    const form = useForm<MeasureSchema>({
        resolver: zodResolver(newMeasureSchema),
        defaultValues: measureDefaults,
        mode: 'onChange'
    });

    const handleSubmit = async (measureData: MeasureSchema) => {
        mutate(measureData);
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full lg:max-w-[12rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new measure</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                    <DialogHeader
                        title='Add new measure'
                    />
                    <FormProvider {...form}>
                        <form
                            id='measure-form'
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormFieldInput
                                type='text'
                                label='Measure type'
                                name='name'
                            />
                            <DialogFooter
                                disabled={!form.formState.isDirty}
                                isLoading={isPending}
                                label='Submit'
                                formName='measure-form'
                                className='mt-6'
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateMeasure