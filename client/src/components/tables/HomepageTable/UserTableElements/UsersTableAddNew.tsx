import { addNewUserSchema, userRoles, userStatus } from '@/components/models/newUserSchema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/context/UserContext'
import { CreateUserType } from '@/types/user-types/userTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { SquarePlus } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export type AddNewUserData = z.infer<typeof addNewUserSchema>;

const UsersTableAddNew = () => {
    const { createUser } = useUser();
    // const { token, role } = useAuth();
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

    const onAddUser: SubmitHandler<CreateUserType> = async (userData: CreateUserType) => {
        const newUser = {
            username: userData.username,
            name: userData.name,
            password: userData.password,
            role: userData.role,
            status: userData.status
        };
        try {
            await createUser(newUser)
        } catch (error) {

        }
        console.log(newUser);
    }

    return (
        <Form {...form}>
            <Dialog>

                {/* check user role and render add button */}
                <DialogTrigger asChild>
                    <Button
                        className='w-15 h-10 border border-zinc-200 hover:bg-zinc-300'
                        variant={'outline'}
                        size={'sm'}
                    >
                        <SquarePlus className='text-zinc-400' />
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[425px] sm:max-w-[425px]'>

                    <form id='user-form' onSubmit={form.handleSubmit(onAddUser)}>
                        <DialogHeader>
                            <DialogTitle>
                                Нов потребител
                            </DialogTitle>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel className='font-semibold'>
                                        Потребител
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            type='text'
                                            className='bg-white flex-1'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='flex-1 pt-2'>
                                    <FormLabel className='font-semibold'>
                                        Име, Фамилия
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            type='text'
                                            className='bg-white flex-1'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='flex-1 pt-2'>
                                    <FormLabel className='font-semibold'>
                                        Парола
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            type='password'
                                            className='bg-white flex-1'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='flex flex-1 pt-5'>
                            <div className='flex justify-between'>
                                <FormField
                                    control={form.control}
                                    name='role'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 pt-2'>
                                            <FormLabel className='font-semibold'>Роля</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='w-[140px]'>
                                                        <SelectValue placeholder='Роля' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {userRoles.map((role, index: number) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={role}
                                                        >
                                                            {role}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='status'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 pt-2'>
                                            <FormLabel className='font-semibold'>Статус</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='w-[140px]'>
                                                        <SelectValue placeholder='Статус' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {userStatus.map((role, index: number) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={role}
                                                        >
                                                            {role}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='submit' form='user-form' className="bg-zinc-950 font-semibold w-full hover:bg-zinc-800">
                                Добавете
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </Form >
    )
}

export default UsersTableAddNew