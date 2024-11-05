import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { MeasureSchema } from '@/components/models/measure/newMeasureSchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateMeasureForm from './CreateMeasureForm';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook';

const CreateMeasure = () => {
    const { isOpen, setIsOpen } = useDialogState();
    
    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<MeasureSchema>({
        URL: '/measures/create',
        queryKey: ['measures'],
        successToast: 'Measure created successfully!',
        setIsOpen,
    });

    const handleSubmit = async (measureData: MeasureSchema) => {
        mutate(measureData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTriggerButtonCreate
                text='Add new measure'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader
                    title='Add new measure'
                />
                <CreateMeasureForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateMeasure