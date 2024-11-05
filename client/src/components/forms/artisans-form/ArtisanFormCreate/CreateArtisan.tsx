import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import { ArtisanSchema } from '@/components/models/artisan/newArtisanSchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateArtisanForm from './CreateArtisanForm';
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook';

const CreateArtisan = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<ArtisanSchema>({
        URL: '/artisans/create',
        queryKey: ['artisans'],
        successToast: 'Artisan created successfully!',
        setIsOpen
    });

    const handleSubmit = (artisanData: ArtisanSchema) => {
        mutate(artisanData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTriggerButtonCreate
                text='Add new artisan'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader
                    title='Add new artisan'
                />
                <CreateArtisanForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateArtisan