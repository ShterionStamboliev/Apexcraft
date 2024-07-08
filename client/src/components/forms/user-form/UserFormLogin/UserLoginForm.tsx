import { FormProvider } from "react-hook-form";
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import useLoginUser from '@/components/hooks/UserHooks/useLoginUser';
import LoadingSpinnerButton from '../../../common/Buttons/LoadingSpinnerButton';
import FormErrors from '../../../common/FormElements/FormErrors';
import FormHeader from '../../../common/FormElements/FormHeader';

const UserLoginForm = () => {
    const { form, onSubmit, error, isLoading } = useLoginUser();

    return (
        <FormProvider {...form}>

            <FormHeader
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
                    <LoadingSpinnerButton
                        isLoading={isLoading}
                    />
                </div>
                <FormErrors
                    error={error}
                />
            </form>
        </FormProvider>
    )
}

export default UserLoginForm