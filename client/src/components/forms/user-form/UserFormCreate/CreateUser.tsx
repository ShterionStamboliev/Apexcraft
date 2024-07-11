import { addNewUserSchema, formDefaultValues } from '@/components/models/user/newUserSchema'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuth } from '@/context/AuthContext'
import { User } from '@/types/user-types/userTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, UseFormProps } from 'react-hook-form'
import FormFieldInput from '@/components/common/FormElements/FormFieldInput'
import DialogTriggerMobile from '@/components/common/DialogElements/DialogTriggerMobile'
import useUserEntityHandlers from '@/components/hooks/UserHooks/useUserEntityHook'
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler'
import { useMediaQuery } from 'usehooks-ts'
import DialogHeader from '@/components/common/DialogElements/DialogHeader'
import DialogFooter from '@/components/common/DialogElements/DialogFooter'
import DialogTriggerDesktop from '@/components/common/DialogElements/DialogTriggerDesktop'
import RoleSelector from '@/components/common/FormElements/FormRoleSelector'
import StatusSelector from '@/components/common/FormElements/FormStatusSelector'

const CreateUser = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const onDesktop = useMediaQuery('(min-width: 768px)');

    const formOptions: Partial<UseFormProps<User>> = {
        resolver: zodResolver(addNewUserSchema),
        mode: 'onChange',
        defaultValues: formDefaultValues,
    };

    const { handleCreateEntity, isLoading } = useUserEntityHandlers();
    const {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    } = useSubmitHandler<User>(handleCreateEntity, formOptions);

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            {onDesktop
                                ? (
                                    <DialogTriggerDesktop />
                                )
                                : (
                                    <DialogTriggerMobile />
                                )
                            }

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                                <DialogHeader
                                    title='Добавете нов потребител'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Име, Фамилия'
                                    name='name'
                                />
                                <FormFieldInput
                                    type='text'
                                    label='Потребител'
                                    name='username'
                                />
                                <FormFieldInput
                                    type='password'
                                    label='Парола'
                                    name='password'
                                />
                                <div className='flex flex-1 justify-between'>
                                    <RoleSelector
                                        label='Роля'
                                        name='role'
                                        placeholder='Роля'
                                    />
                                    <StatusSelector
                                        label='Статус'
                                        name='status'
                                        placeholder='active'
                                    />
                                </div>
                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Добавете'
                                    formName='user-form'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateUser