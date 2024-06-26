import { formDefaultValues, loginFormSchema } from '@/components/models/user/userLoginSchema';
import { useAuth } from '@/context/AuthContext';
import { UserLoginFormData } from '@/types/user-types/userTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useLoginUser = () => {
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
        if (isLoginSuccess) {
            navigate('/');
        }
    }, [isLoginSuccess, navigate]);

    return {
        form,
        onSubmit,
        isLoading,
        error
    }
}

export default useLoginUser;