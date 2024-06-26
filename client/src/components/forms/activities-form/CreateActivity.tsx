import FormFieldInput from '@/components/common/FormFieldInput';
import { activityDefaults, newActivitySchema } from '@/components/models/activity/newActivitySchema';
import DialogFooter from '@/components/tables/UsersTable/UserTableElements/DialogFooter/DialogFooter';
import DialogHeader from '@/components/tables/UsersTable/UserTableElements/DialogHeader/DialogHeader';
import DialogTriggerDesktop from '@/components/tables/UsersTable/UserTableElements/DialogTriggers/DialogTriggerDesktop';
import DialogTriggerMobile from '@/components/tables/UsersTable/UserTableElements/DialogTriggers/DialogTriggerMobile';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Activity } from '@/types/activity-types/activityTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';
import MeasureSelection from './MeasuresDummy';

const CreateActivity = () => {

    const { role } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onDesktop = useMediaQuery('(min-width: 768px)');

    const isManager = role === 'мениджър';

    const form = useForm<Activity>({
        resolver: zodResolver(newActivitySchema),
        mode: 'onChange',
        defaultValues: activityDefaults
    });

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='user-form'
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
                                    title='Добавете нова дейност'
                                />

                                <FormFieldInput
                                    type='text'
                                    label='Вид дейност'
                                    name='name'
                                />

                                <div className='flex flex-1 justify-between'>
                                    <MeasureSelection
                                        label='Единица'
                                        name='role'
                                        placeholder='Роля'
                                    />
                                </div>

                                <DialogFooter
                                    isLoading={true}
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

export default CreateActivity