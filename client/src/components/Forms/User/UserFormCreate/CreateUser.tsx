import { userSchema, UserSchema } from '@/models/user/userSchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import CreateUserForm from './CreateUserForm';
import useDialogState from '@/hooks/useDialogState';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';

const CreateUser = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<UserSchema>({
        URL: '/users/create',
        queryKey: ['users'],
        successToast: 'User created successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, userSchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonCreate
                className='md:w-full lg:max-w-[12rem]'
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
    );
};

export default CreateUser;
