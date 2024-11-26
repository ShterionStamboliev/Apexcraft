import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { measureSchema, MeasureSchema } from '@/models/measure/measureSchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateMeasureForm from './CreateMeasureForm';
import useDialogState from '@/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/hooks/custom-hooks/useMutationHook';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';

const CreateMeasure = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<MeasureSchema>({
        URL: '/measures/create',
        queryKey: ['measures'],
        successToast: 'Measure created successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, measureSchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonCreate
                className='md:w-full lg:max-w-[12rem]'
                text='Add new measure'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader title='Add new measure' />
                <CreateMeasureForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreateMeasure;
