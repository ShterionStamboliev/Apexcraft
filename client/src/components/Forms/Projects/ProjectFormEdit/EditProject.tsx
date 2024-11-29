import { projectSchema, ProjectSchema } from '@/models/project/projectSchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/useDialogState';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';
import EditProjectForm from './EditProjectForm';

type ProjectFormProps = {
    projectId: string;
};

const EditProject = ({ projectId }: ProjectFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<ProjectSchema>({
        URL: `/projects/${projectId}/edit`,
        queryKey: ['projects'],
        successToast: 'Project updated successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, projectSchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='max-w-[22rem] rounded-md sm:max-w-[30rem]'>
                <EditProjectForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                    projectId={projectId}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditProject;
