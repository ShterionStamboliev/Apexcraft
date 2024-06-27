import FormFieldInput from '@/components/common/FormFieldInput';
import { measureDefaults, newMeasureSchema } from '@/components/models/measure/newMeasureSchema';
import DialogFooter from '@/components/tables/UsersTable/UserTableElements/DialogFooter/DialogFooter';
import DialogHeader from '@/components/tables/UsersTable/UserTableElements/DialogHeader/DialogHeader';
import DialogTriggerDesktop from '@/components/tables/UsersTable/UserTableElements/DialogTriggers/DialogTriggerDesktop';
import DialogTriggerMobile from '@/components/tables/UsersTable/UserTableElements/DialogTriggers/DialogTriggerMobile';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Measure } from '@/types/measure-types/measureTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

const CreateMeasure = () => {

    const { role } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onDesktop = useMediaQuery('(min-width: 768px)');
    const isManager = role === 'мениджър';

    const form = useForm<Measure>({
        resolver: zodResolver(newMeasureSchema),
        mode: 'onChange',
        defaultValues: measureDefaults
    });

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='measure-form'
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
                                    title='Добавете нова единица'
                                />

                                <FormFieldInput
                                    type='text'
                                    label='Вид единица'
                                    name='name'
                                />

                                <DialogFooter
                                    isLoading={true}
                                    label='Добавете'
                                    formName='measure-form'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateMeasure