import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import {
    measureDefaults,
    MeasureSchema,
    newMeasureSchema,
} from '@/models/measure/measureSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ruler } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

type CreateMeasureFormProps = {
    handleSubmit: (measureData: MeasureSchema) => void;
    isPending: boolean;
};

const CreateMeasureForm = ({
    handleSubmit,
    isPending,
}: CreateMeasureFormProps) => {
    const form = useForm<MeasureSchema>({
        resolver: zodResolver(newMeasureSchema),
        defaultValues: measureDefaults,
        mode: 'onChange',
    });

    return (
        <FormProvider {...form}>
            <form id='measure-form' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput
                    type='text'
                    label='Measure type'
                    name='name'
                    className='pl-10'
                    Icon={Ruler}
                />
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit'
                    formName='measure-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    );
};

export default CreateMeasureForm;
