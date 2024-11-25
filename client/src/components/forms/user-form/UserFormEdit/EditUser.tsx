import { User } from '@/types/user-types/userTypes';
import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import RoleSelector from '@/components/common/FormElements/FormRoleSelector';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import { addNewUserSchema, UserSchema } from '@/models/user/newUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/hooks/custom-hooks/useMutationHook';

type UserFormProps = {
    userId: string;
    user: User;
};

const EditUserForm = ({ user, userId }: UserFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<UserSchema>({
        URL: `/users/${userId}/edit`,
        queryKey: ['users'],
        successToast: 'User updated successfully!',
        setIsOpen,
    });

    const form = useForm<UserSchema>({
        resolver: zodResolver(addNewUserSchema),
        defaultValues: {
            name_and_family: user.name_and_family,
            username: user.username,
            password: user.password,
            role: user.role,
            status: user.status,
        },
        mode: 'onChange',
    });

    const handleSubmit = (userData: UserSchema) => {
        mutate(userData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                <DialogHeader title='Edit user info' />
                <FormProvider {...form}>
                    <form
                        id='form-edit'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormFieldInput
                            type='text'
                            label='Name, Surname'
                            name='name_and_family'
                        />
                        <FormFieldInput
                            type='text'
                            label='Username'
                            name='username'
                        />
                        <FormFieldInput
                            type='password'
                            label='Password'
                            name='password'
                        />
                        <div className='flex flex-wrap gap-1 flex-1 justify-between pt-2'>
                            <RoleSelector
                                label='Role'
                                name='role'
                                placeholder='Role'
                                defaultVal={user && user.role}
                            />
                            <StatusSelector
                                label='Status'
                                name='status'
                                defaultVal={user && user.status}
                            />
                        </div>
                        <DialogFooter
                            disabled={!form.formState.isDirty || isPending}
                            label='Submit'
                            formName='form-edit'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserForm;
