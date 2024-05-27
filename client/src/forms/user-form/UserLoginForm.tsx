import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "../../components/ui/input";
import LoadingButton from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";
import { LoginFormProps } from "@/types/userTypes";

const loginFormSchema = z.object({
    username: z.string().min(5, {
        message: 'Invalid credentials.',
    }),
    password: z.string().min(5, {
        message: 'Invalid credentials.',
    })
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const UserLoginForm = (
    {
        isLoading,
        title = 'Login page',
        buttonText = 'Sign in',
    }: LoginFormProps) => {

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            password: '',
            username: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='bg-slate-500 p-10 rounded-md md:p-10'
            >
                <div>
                    <h2 className='text-2xl font-bold mb-4'>
                        {title}
                    </h2>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage className="text-red-500 font-semibold text-center" />
                                <FormLabel className="font-semibold">Username</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="Username"
                                        type='text'
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Password</FormLabel>
                                <FormControl {...field}>
                                    <Input
                                        placeholder="Password"
                                        type='password'
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button className="bg-slate-700 font-bold mt-4">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default UserLoginForm