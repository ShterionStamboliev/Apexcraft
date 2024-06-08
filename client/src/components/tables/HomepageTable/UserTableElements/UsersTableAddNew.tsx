import { addNewUserSchema } from '@/components/models/newUserSchema'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/context/UserContext'
import { CreateUserType } from '@/types/user-types/userTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import UsersTableFormFieldInputs from './UsersTableFormFieldInputs'
import UsersTableDialogHeader from './UsersTableDialogHeader'
import UsersTableDialogFooter from './UsersTableDialogFooter'
import UsersTableDialogTrigger from './UsersTableDialogTrigger'
import UsersTableSelectStatus from './UsersTableSelectStatus'
import UsersTableSelectRole from './UsersTableSelectRole'

export type AddNewUserData = z.infer<typeof addNewUserSchema>;

const UsersTableAddNew = () => {
    const { createUser } = useUser();
    const { role } = useAuth();
    const form = useForm<CreateUserType>({
        resolver: zodResolver(addNewUserSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            name: '',
            password: '',
            role: '',
            status: '',
        }
    });

    // const isAdmin = role === 'админ';
    const isManager = role === 'мениджър';

    const handleCreateUser: SubmitHandler<CreateUserType> = async (userData: CreateUserType) => {

        try {
            await createUser(userData)
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
        }
        console.log(userData);
    }

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(handleCreateUser)}
                    >
                        <Dialog>
                            <UsersTableDialogTrigger />

                            <DialogContent className='max-w-[425px] sm:max-w-[425px]'>

                                <UsersTableDialogHeader
                                    title='Добавете нов потребител'
                                />

                                <UsersTableFormFieldInputs
                                    type='text'
                                    label='Потребител'
                                    name='username'
                                />

                                <UsersTableFormFieldInputs
                                    type='text'
                                    label='Име, Фамилия'
                                    name='name'
                                />

                                <UsersTableFormFieldInputs
                                    type='password'
                                    label='Парола'
                                    name='password'
                                />

                                <div className='flex flex-1 pt-4 justify-between'>
                                    <UsersTableSelectRole
                                        label='Роля'
                                        name='role'
                                        placeholder='Роля'
                                    />

                                    <UsersTableSelectStatus
                                        label='Статус'
                                        name='status'
                                        placeholder='Статус'
                                    />
                                </div>

                                <UsersTableDialogFooter
                                    label='Добавете'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider >
            )}
        </>
    )
}

export default UsersTableAddNew