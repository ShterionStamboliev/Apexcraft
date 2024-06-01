import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../../components/ui/input";
import LoadingButton from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ADMIN_AUTH = import.meta.env.VITE_ADMIN_AUTH;

const loginFormSchema = z.object({
    username: z.string().min(5, {
        message: 'Грешен потребител или парола',
    }),
    password: z.string().min(5, {
        message: 'Грешен потребител или парола',
    })
}).refine((data) => data.password === ADMIN_AUTH, {
    path: ['password'],
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const UserLoginForm = () => {

    const { login, isLoading, error } = useAuth();
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (userData: LoginFormData) => {
        const isSuccess = await login(userData.username, userData.password);
        if (isSuccess) {
            setIsLoginSuccess(true);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        if (isLoginSuccess) {
            navigate('/');
        };

        return () => {
            controller.abort();
        };
    }, [isLoginSuccess, navigate]);

    return (
        <Form {...form}>
            <div className="text-center mb-6">
                <h1 className='text-3xl font-bold'>
                    Добре дошли
                </h1>
                <p className="text-gray-500">
                    Вход в системата
                </p>
            </div>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="border border-gray-300 p-6 mx-auto rounded-md w-full max-w-md md:p-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                {/* <FormMessage className="text-red-500 font-semibold text-center mb-2" /> */}
                                <FormLabel className="font-semibold">Потребител</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        type='text'
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                {/* <FormMessage className="text-red-500 font-semibold text-center mb-2" /> */}
                                <FormLabel className="font-semibold">Парола</FormLabel>
                                <FormControl>
                                    <Input  {...field}
                                        type='password'
                                        className='bg-white'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-1 pt-10">
                    {isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button className="bg-zinc-950 font-semibold w-full hover:bg-zinc-800">
                            Вход
                        </Button>
                    )}
                </div>

                {error && (
                    <div className="text-red-500 font-semibold mt-4 text-center">
                        {error}
                    </div>
                )}
            </form>
        </Form>
    )
}

export default UserLoginForm