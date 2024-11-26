import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { projectSchema, ProjectSchema } from '@/models/project/projectSchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateProjectForm from './CreateProjectForm';
import useDialogState from '@/hooks/useDialogState';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';

const CreateProject = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();
    const { mutate, isPending } = useCreateNewEntity<ProjectSchema>({
        URL: '/projects/create',
        queryKey: ['projects'],
        successToast: 'Project created successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, projectSchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonCreate
                className='md:w-full lg:max-w-[12rem]'
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
    );
};

export default CreateProject;
