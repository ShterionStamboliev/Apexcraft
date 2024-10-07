import { FormProvider } from "react-hook-form";
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import useLoginUser from '@/components/hooks/UserHooks/useLoginUser';
import FormErrors from '../../../common/FormElements/FormErrors';
import FormHeader from '../../../common/FormElements/FormHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';

const UserLoginForm = () => {
    const { form, onSubmit, error, isLoading } = useLoginUser();

    return (
        <FormProvider {...form}>
            <FormHeader
                title='Welcome'
                description='Please enter your details'
            />
            <form
                id='login-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className="border p-6 mx-auto rounded-md w-full max-w-md md:p-6"
            >
                <div className="">
                    <FormFieldInput
                        name='username'
                        label='Username'
                        type='text'
                    />
                    <FormFieldInput
                        name='password'
                        label='Password'
                        type='password'
                    />
                </div>
                <DialogFooter
                    disabled={!form.formState.isDirty || isLoading}
                    label='Submit'
                    formName='login-form'
                    className='mt-6'
                />
                <FormErrors
                    error={error}
                />
            </form>
        </FormProvider>
    )
}

export default UserLoginForm