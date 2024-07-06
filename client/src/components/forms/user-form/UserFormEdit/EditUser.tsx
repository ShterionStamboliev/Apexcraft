
import { UserFormProps } from '@/types/user-types/userTypes';
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import useEditUser from '@/components/hooks/UserHooks/useEditUser';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import RoleSelector from '@/components/common/FormElements/FormRoleSelector';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';

const EditForm = ({ user, onSuccess }: UserFormProps) => {
    const { form, isLoading, onSubmit } = useEditUser(user, onSuccess);

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
                    <RoleSelector
                        label='Роля'
                        name='role'
                        placeholder='Роля'
                        defaultVal={user && user.role}
                    />
                    <StatusSelector
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