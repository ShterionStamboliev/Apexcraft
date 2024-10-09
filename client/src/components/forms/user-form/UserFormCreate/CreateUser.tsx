import { addNewUserSchema, formDefaultValues, UserSchema } from '@/components/models/user/newUserSchema'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import DialogHeader from '@/components/common/DialogElements/DialogHeader'
import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import RoleSelector from '@/components/common/FormElements/FormRoleSelector'
import StatusSelector from '@/components/common/FormElements/FormStatusSelector'
import useUsersQuery from '@/components/api/users/usersQuery'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const CreateUser = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateUser } = useUsersQuery();
    const { mutate, isPending } = useCreateUser({ setIsOpen });

    const form = useForm<UserSchema>({
        resolver: zodResolver(addNewUserSchema),
        defaultValues: formDefaultValues,
        mode: 'onChange'
    });

    const handleSubmit = async (userData: UserSchema) => {
        mutate(userData, {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full md:max-w-[12rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new user</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                    <DialogHeader title='Add new user' />
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
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default CreateUser