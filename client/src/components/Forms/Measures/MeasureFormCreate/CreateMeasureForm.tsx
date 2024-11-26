import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { useFormSchema } from '@/hooks/useForm';
import {
    measureDefaults,
    measureSchema,
    MeasureSchema,
} from '@/models/measure/measureSchema';
import { Ruler } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

type CreateMeasureFormProps = {
    handleSubmit: (measureData: MeasureSchema) => void;
    isPending: boolean;
};

const CreateMeasureForm = ({
    handleSubmit,
    isPending,
}: CreateMeasureFormProps) => {
    const form = useFormSchema(measureSchema, measureDefaults);

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
