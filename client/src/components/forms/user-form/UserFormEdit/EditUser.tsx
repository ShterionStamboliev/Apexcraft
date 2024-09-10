
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
                    title='Edit info for user'
                    user={`${user?.username}`}
                />
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
                <div className='flex flex-1 justify-between pt-2'>
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
                    isLoading={isLoading}
                    label='Submit'
                    formName='form-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm