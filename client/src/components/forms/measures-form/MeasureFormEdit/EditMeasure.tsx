
import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { Measure, } from '@/types/measure-types/measureTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import { useState } from 'react';
import { MeasureSchema, newMeasureSchema } from '@/components/models/measure/newMeasureSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useMeasuresQuery from '@/components/api/measures/measuresQuery';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

type MeasureFormProps = {
    measureId: string;
    measure: Measure;
}

const EditMeasureForm = ({ measure, measureId }: MeasureFormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useEditMeasure } = useMeasuresQuery();

    const { mutate, isPending } = useEditMeasure({ measureId, setIsOpen });

    const form = useForm<MeasureSchema>({
        resolver: zodResolver(newMeasureSchema),
        defaultValues: {
            name: measure.name
        }
    });

    const handleSubmit = (measureData: MeasureSchema) => {
        mutate(measureData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                <DialogHeader
                    title='Edit measure'
                    user={`${measure?.name}`}
                />
                <FormProvider {...form}>
                    <form
                        id='edit-measure'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormFieldInput
                            type='text'
                            label='Type of measure'
                            name='name'
                        />
                        <DialogFooter
                            isLoading={isPending}
                            label='Submit changes'
                            formName='edit-measure'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default EditMeasureForm