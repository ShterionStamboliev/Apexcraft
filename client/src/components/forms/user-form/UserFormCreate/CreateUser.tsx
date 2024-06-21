import { addNewUserSchema, formDefaultValues } from '@/components/models/newUserSchema'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { User } from '@/types/user-types/userTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import FormFieldInput from '@/components/common/FormFieldInput'
import { useMediaQuery } from 'usehooks-ts'
import useCreateUser from '@/components/hooks/UserHooks/useCreateUser'
import DialogTriggerDesktop from '@/components/tables/UsersTable/UserTableElements/DialogTriggers/DialogTriggerDesktop'
import DialogTriggerMobile from '@/components/tables/UsersTable/UserTableElements/DialogTriggers/DialogTriggerMobile'
import DialogHeader from '@/components/tables/UsersTable/UserTableElements/DialogHeader/DialogHeader'
import RoleSelection from '@/components/tables/UsersTable/UserTableElements/RoleSelection/RoleSelection'
import StatusSelection from '@/components/tables/UsersTable/UserTableElements/StatusSelection/StatusSelection'
import DialogFooter from '@/components/tables/UsersTable/UserTableElements/DialogFooter/DialogFooter'

const CreateUser = () => {
    const { role } = useAuth();
    const isManager = role === 'мениджър';

    const form = useForm<User>({
        resolver: zodResolver(addNewUserSchema),
        mode: 'onChange',
        defaultValues: formDefaultValues
    });
    
    const { handleCreateUser, isLoading } = useCreateUser();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { reset } = form;

    const onDesktop = useMediaQuery('(min-width: 768px)');

    const onSubmit: SubmitHandler<User> = async (userData: User) => {
        await handleCreateUser(userData);
        setIsOpen(false);
        reset();
    };

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            {onDesktop
                                ? (
                                    <DialogTriggerDesktop />
                                )
                                : (
                                    <DialogTriggerMobile />
                                )
                            }

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                                <DialogHeader
                                    title='Добавете нов потребител'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Име, Фамилия'
                                    name='name'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Потребител'
                                    name='username'
                                />
                                <FormFieldInput
                                    type='password'
                                    label='Парола'
                                    name='password'
                                />
                                <div className='flex flex-1 justify-between'>
                                    <RoleSelection
                                        label='Роля'
                                        name='role'
                                        placeholder='Роля'
                                    />

                                    <StatusSelection
                                        label='Статус'
                                        name='status'
                                        placeholder='активен'
                                    />
                                </div>
                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Добавете'
                                    formName='user-form'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateUser