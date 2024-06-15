
import { useUser } from '@/context/UserContext';
import { UserFormProps } from '@/types/user-types/userTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import UsersTableDialogHeader from '@/components/tables/HomepageTable/UserTableElements/UsersTableDialogHeader';
import FormFieldInput from '@/components/common/FormFieldInput';
import UsersTableSelectRole from '@/components/tables/HomepageTable/UserTableElements/UsersTableSelectRole';
import UsersTableSelectStatus from '@/components/tables/HomepageTable/UserTableElements/UsersTableSelectStatus';
import UsersTableDialogFooter from '@/components/tables/HomepageTable/UserTableElements/UsersTableDialogFooter';
import { useToast } from '@/components/ui/use-toast';
import { FormValues, formSchema } from '@/components/models/editUserSchema';

const UserForm = ({ user, onSuccess }: UserFormProps) => {

    const { editUser, isLoading } = useUser();
    const { toast } = useToast()
    const form = useForm<FormValues>({
        defaultValues: user && {
            username: user.username,
            name_and_family: user.name_and_family,
            password: '****',
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
                    title: 'Редакцията беше успешен.',
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

                <UsersTableDialogHeader
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
                    <UsersTableSelectRole
                        label='Роля'
                        name='role'
                        placeholder='Роля'
                        defaultVal={user && user.role}
                    />

                    <UsersTableSelectStatus
                        label='Статус'
                        name='status'
                        defaultVal={user && user.status}
                    />
                </div>

                <UsersTableDialogFooter
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