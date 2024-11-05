import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { ProjectSchema } from '@/components/models/project/newProjectSchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateProjectForm from './CreateProjectForm';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook';

const CreateProject = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();
    const { mutate, isPending } = useCreateNewEntity<ProjectSchema>({
        URL: '/projects/create',
        queryKey: ['projects'],
        successToast: 'Project created successfully!',
        setIsOpen
    });

    const handleSubmit = async (projectData: ProjectSchema) => {
        mutate(projectData);
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTriggerButtonCreate
                    text='Add new project'
                />
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px] gap-0'>
                    <DialogHeader title='Add new project' />
                    <CreateProjectForm
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateProject