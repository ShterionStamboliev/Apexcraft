import useArtisansQuery from '@/components/api/artisans/artisansQuery';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import { ArtisanSchema } from '@/components/models/artisan/newArtisanSchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateArtisanForm from './CreateArtisanForm';

const CreateArtisan = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateArtisan } = useArtisansQuery();
    const { mutate, isPending } = useCreateArtisan({ setIsOpen });

    const handleSubmit = (artisanData: ArtisanSchema) => {
        mutate(artisanData);
    };

    return (
        <div className='mb-4'>
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
        </div>
    )
}

export default CreateArtisan