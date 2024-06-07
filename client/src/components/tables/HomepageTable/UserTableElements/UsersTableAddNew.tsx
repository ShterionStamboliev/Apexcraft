import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { SquarePlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addNewUserSchema = z.object({
    username: z.string().min(5, {
        message: 'Потребителското име трябва да е минимум 5 символа',
    }),
    name_and_family: z.string().min(7, {
        message: 'Името трябва да е минимум 7 символа',
    }),
    password: z.string().min(5, {
        message: 'Паролата трябва да е минимум 5 символа',
    }),
});

export type AddNewUserData = z.infer<typeof addNewUserSchema>;

const UsersTableAddNew = () => {
    const form = useForm<AddNewUserData>({
        resolver: zodResolver(addNewUserSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            name_and_family: '',
            password: ''
        }
    });

    return (
        <Dialog>
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
                <DialogHeader>
                    <DialogTitle>
                        Нов потребител
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form>
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
                            name='name_and_family'
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
                    </form>
                    <div className='flex justify-between'>
                        <Select>
                            <SelectTrigger className='w-[140px]'>
                                <SelectValue placeholder='Роля' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Селектирайте роля
                                    </SelectLabel>
                                    <SelectItem value='мениджър'>Мениджър</SelectItem>
                                    <SelectItem value='работник'>Работник</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className='w-[140px]'>
                                <SelectValue placeholder='Статус' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Селектирайте статус
                                    </SelectLabel>
                                    <SelectItem value='активен'>Активен</SelectItem>
                                    <SelectItem value='неактивен'>Неактивен</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='flex flex-1 pt-5'>
                        <Button className="bg-zinc-950 font-semibold w-full hover:bg-zinc-800">
                            Добавете
                        </Button>
                    </div>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default UsersTableAddNew