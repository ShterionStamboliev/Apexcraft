import { FormProvider } from "react-hook-form";
import FormFieldInput from '@/components/common/FormFieldInput';
import UserFormHeader from '../UserFormElements/UserFormHeader';
import UserFormButtons from '../UserFormElements/UserFormButtons';
import UserFormErrors from '../UserFormElements/UserFormErrors';
import useLoginUser from '@/components/hooks/UserHooks/useLoginUser';

const UserLoginForm = () => {
    const { form, onSubmit, error, isLoading } = useLoginUser();

    return (
        <FormProvider {...form}>

            <UserFormHeader
                title='Добре дошли'
                description='Вход в системата'
            />

            <form
                id='login-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className="border p-6 mx-auto rounded-md w-full max-w-md md:p-6"
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