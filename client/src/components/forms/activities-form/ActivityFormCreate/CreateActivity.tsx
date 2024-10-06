import useActivitiesQuery from '@/components/api/activities/activitiesQuery';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import { activityDefaults, ActivitySchema, newActivitySchema } from '@/components/models/activity/newActivitySchema';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateActivity = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateActivity } = useActivitiesQuery();
    const { mutate, isPending } = useCreateActivity({ setIsOpen });

    const form = useForm<ActivitySchema>({
        resolver: zodResolver(newActivitySchema),
        defaultValues: activityDefaults,
        mode: 'onChange',
    });

    const handleSubmit = async (activityData: ActivitySchema) => {
        mutate(activityData);
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full lg:max-w-[11rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new activity</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                    <DialogHeader title='Add new activity' />
                    <FormProvider {...form}>
                        <form
                            id='activity-form'
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormFieldInput
                                type='text'
                                label='Activity type'
                                name='name'
                            />
                            <div className='flex flex-1 pt-2 justify-between'>
                                <StatusSelector
                                    label='Status'
                                    name='status'
                                    placeholder='active'
                                />
                            </div>
                            <DialogFooter
                                disabled={!form.formState.isDirty || isPending}
                                label='Submit'
                                formName='activity-form'
                                className='mt-6'
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateActivity