import useWorkItemsQuery from '@/components/api/work-items/workItemsQuery'
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate'
import useDialogState from '@/components/hooks/custom-hooks/useDialogState'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { WorkItemSchema } from '@/types/task-types/workItemType'
import { useParams } from 'react-router-dom'
import CreateWorkItemForm from './CreateWOrkItemForm'

const CreateWorkItem = () => {
    const { id, taskId } = useParams();
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateWorkItem } = useWorkItemsQuery();
    const { mutate, isPending } = useCreateWorkItem(id!, taskId!, setIsOpen);

    const handleSubmit = (workItemData: WorkItemSchema) => {
        mutate(workItemData);
    };

    return (
        <div className="mb-6">
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTriggerButtonCreate
                    text='Add new work item'
                />
                <DialogContent className="rounded-lg sm:max-w-[30rem]">
                    <DialogHeader>
                        <DialogTitle className='text-center'>Add new work item</DialogTitle>
                    </DialogHeader>
                    <CreateWorkItemForm
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateWorkItem