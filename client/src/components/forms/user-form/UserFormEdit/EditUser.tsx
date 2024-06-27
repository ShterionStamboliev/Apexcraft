
import { UserFormProps } from '@/types/user-types/userTypes';
import { FormProvider } from 'react-hook-form';
import DialogHeader from '@/components/tables/UsersTable/UserTableElements/DialogHeader/DialogHeader';
import FormFieldInput from '@/components/common/FormFieldInput';
import RoleSelection from '@/components/tables/UsersTable/UserTableElements/RoleSelection/RoleSelection';
import StatusSelection from '@/components/tables/UsersTable/UserTableElements/StatusSelection/StatusSelection';
import DialogFooter from '@/components/tables/UsersTable/UserTableElements/DialogFooter/DialogFooter';
import useEditUserForm from '@/components/hooks/UserHooks/useEditUser';

const EditForm = ({ user, onSuccess }: UserFormProps) => {
    const { form, isLoading, onSubmit } = useEditUserForm(user, onSuccess);

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

export default EditForm