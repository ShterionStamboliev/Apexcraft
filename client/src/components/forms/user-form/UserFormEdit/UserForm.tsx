
import { useUser } from '@/context/UserContext';
import { UserFormProps } from '@/types/user-types/userTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import DialogHeader from '@/components/tables/UsersTable/UserTableElements/DialogHeader/DialogHeader';
import FormFieldInput from '@/components/common/FormFieldInput';
import RoleSelection from '@/components/tables/UsersTable/UserTableElements/RoleSelection/RoleSelection';
import StatusSelection from '@/components/tables/UsersTable/UserTableElements/StatusSelection/StatusSelection';
import DialogFooter from '@/components/tables/UsersTable/UserTableElements/DialogFooter/DialogFooter';
import { useToast } from '@/components/ui/use-toast';
import { FormValues, formSchema } from '@/components/models/editUserSchema';

const UserForm = ({ user, onSuccess }: UserFormProps) => {

    const { editUser, isLoading } = useUser();
    const { toast } = useToast();
    
    const form = useForm<FormValues>({
        defaultValues: user && {
            username: user.username,
            name_and_family: user.name_and_family,
            password: user.password,
            role: user.role,
            status: user.status,
        },
        resolver: zodResolver(formSchema),
    });

    const { reset } = form;

    const onSubmit = async (data: FormValues) => {
        if (user?.id) {
            const isEditSuccess = await editUser(user.id, data);
            if (isEditSuccess && onSuccess) {
                onSuccess();
                reset();
                toast({
                    variant: 'success',
                    title: 'Редакцията беше успешна',
                    duration: 3000,
                });
            }
        }
    }

    return (
        <FormProvider {...form}>
            <form
                id='form-edit'
                onSubmit={form.handleSubmit(onSubmit)}
            >

                <DialogHeader
                    title='Редакция на потребител'
                    user={`${user?.username}`}
                />

                <FormFieldInput
                    type='text'
                    label='Име, Фамилия'
                    name='name_and_family'
                    className='py-3'
                />

                <FormFieldInput
                    type='text'
                    label='Потребител'
                    name='username'
                    className='py-3'
                />

                <FormFieldInput
                    type='password'
                    label='Парола'
                    name='password'
                    className='py-3'
                />

                <div className='flex flex-1 justify-between'>
                    <RoleSelection
                        label='Роля'
                        name='role'
                        placeholder='Роля'
                        defaultVal={user && user.role}
                    />

                    <StatusSelection
                        label='Статус'
                        name='status'
                        defaultVal={user && user.status}
                    />
                </div>

                <DialogFooter
                    isLoading={isLoading}
                    label='Редактирайте'
                    formName='form-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default UserForm