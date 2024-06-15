import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formDefaultValues, loginFormSchema } from '@/components/models/userLoginSchema';
import { UserLoginFormData } from '@/types/user-types/userTypes';
import FormFieldInput from '@/components/common/FormFieldInput';
import UserFormHeader from '../UserFormElements/UserFormHeader';
import UserFormButtons from '../UserFormElements/UserFormButtons';
import UserFormErrors from '../UserFormElements/UserFormErrors';

const UserLoginForm = () => {
    const { login, isLoading, error } = useAuth();
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const form = useForm<UserLoginFormData>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange',
        defaultValues: formDefaultValues
    });

    const onSubmit: SubmitHandler<UserLoginFormData> = async (userData: UserLoginFormData) => {
        const isSuccess = await login(userData.username, userData.password);
        if (isSuccess) {
            setIsLoginSuccess(true);
            navigate('/')
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        if (isLoginSuccess) {
            navigate('/');
        }

        return () => controller.abort();
    }, [isLoginSuccess, navigate]);

    return (
        <FormProvider {...form}>

            <UserFormHeader
                title='Добре дошли'
                description='Вход в системата'
            />

            <form
                id='login-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className="border border-gray-300 p-6 mx-auto rounded-md w-full max-w-md md:p-6"
            >
                <div className="space-y-4">
                    <FormFieldInput
                        name='username'
                        label='Потребител'
                        type='text'
                    />
                    <FormFieldInput
                        name='password'
                        label='Парола'
                        type='password'
                    />
                </div>

                <div className="flex flex-1 pt-10 pb-2">
                    <UserFormButtons
                        isLoading={isLoading}
                    />
                </div>

                <UserFormErrors
                    error={error}
                />
            </form>
        </FormProvider>
    )
}

export default UserLoginForm