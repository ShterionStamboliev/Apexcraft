import { UserSchema } from '@/components/models/user/newUserSchema'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import DialogHeader from '@/components/common/DialogElements/DialogHeader'
import useUsersQuery from '@/components/api/users/usersQuery'
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate'
import useDialogState from '@/components/hooks/custom-hooks/useDialogState'
import CreateUserForm from './CreateUserForm'

const CreateUser = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateUser } = useUsersQuery();
    const { mutate, isPending } = useCreateUser({ setIsOpen });

    const handleSubmit = async (userData: UserSchema) => {
        mutate(userData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTriggerButtonCreate
                text='Add new user'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader title='Add new user' />
                <CreateUserForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateUser