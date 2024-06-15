import { addNewUserSchema, formDefaultValues } from '@/components/models/newUserSchema'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/context/UserContext'
import { User } from '@/types/user-types/userTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import UsersTableDialogHeader from './UsersTableDialogHeader'
import UsersTableDialogFooter from './UsersTableDialogFooter'
import UsersTableDialogTrigger from './UsersTableDialogTrigger'
import UsersTableSelectStatus from './UsersTableSelectStatus'
import UsersTableSelectRole from './UsersTableSelectRole'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import FormFieldInput from '@/components/common/FormFieldInput'

const UsersTableAddNew = () => {
    const { createUser, isLoading } = useUser();
    const { role } = useAuth();

    const form = useForm<User>({
        resolver: zodResolver(addNewUserSchema),
        mode: 'onChange',
        defaultValues: formDefaultValues
    });

    const { reset } = form;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);

    const { toast } = useToast();

    const isManager = role === 'мениджър';

    const handleCreateUser: SubmitHandler<User> = async (userData: User) => {
        try {
            const isCreateSuccessful = await createUser(userData);
            if (isCreateSuccessful) {
                setIsCreateSuccess(true);
                setIsOpen(false);
                reset();
                toast({
                    variant: 'success',
                    title: 'Записът беше успешен.',
                    duration: 3000,
                });
                console.log(userData);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Грешка!',
                    description: 'Съществува потребител с избраното име.',
                    duration: 3000,
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        if (isCreateSuccess) {
            setIsCreateSuccess(false);
        };

        return () => controller.abort();

    }, [isCreateSuccess])

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(handleCreateUser)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >

                            <UsersTableDialogTrigger />

                            <DialogContent className='max-w-[425px] sm:max-w-[425px]'>

                                <UsersTableDialogHeader
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
                                    <UsersTableSelectRole
                                        label='Роля'
                                        name='role'
                                        placeholder='Роля'
                                    />

                                    <UsersTableSelectStatus
                                        label='Статус'
                                        name='status'
                                        placeholder='активен'
                                    />
                                </div>

                                <UsersTableDialogFooter
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

export default UsersTableAddNew