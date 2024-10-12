import { addNewUserSchema, formDefaultValues, UserSchema } from '@/components/models/user/newUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import RoleSelector from '@/components/common/FormElements/FormRoleSelector'
import StatusSelector from '@/components/common/FormElements/FormStatusSelector'

type CreateUserFormProps = {
    handleSubmit: (userData: UserSchema) => void;
    isPending: boolean;
}

const CreateUserForm = ({ handleSubmit, isPending }: CreateUserFormProps) => {
    const form = useForm<UserSchema>({
        resolver: zodResolver(addNewUserSchema),
        defaultValues: formDefaultValues,
        mode: 'onChange'
    });

    return (
        <FormProvider {...form}>
            <form
                id='user-form'
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
                <div className='flex flex-wrap gap-1 flex-1 pt-2 justify-between'>
                    <RoleSelector
                        label='Role'
                        name='role'
                        placeholder='user'
                    />
                    <StatusSelector
                        label='Status'
                        name='status'
                        placeholder='active'
                    />
                </div>
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit'
                    formName='user-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default CreateUserForm