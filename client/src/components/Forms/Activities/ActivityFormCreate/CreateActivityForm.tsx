import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import { useActivityFormHooks } from '@/hooks/forms/useActivityForm';
import { ActivitySchema } from '@/models/activity/activitySchema';
import { Activity } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

type CreateActivityFormProps = {
    handleSubmit: (activityData: ActivitySchema) => void;
    isPending: boolean;
};

const CreateActivityForm = ({
    handleSubmit,
    isPending,
}: CreateActivityFormProps) => {
    const { useCreateActivityForm } = useActivityFormHooks();
    const form = useCreateActivityForm();

    return (
        <FormProvider {...form}>
            <form id='activity-form' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput
                    type='text'
                    label='Activity name'
                    name='name'
                    className='pl-10'
                    Icon={Activity}
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
    );
};

export default CreateActivityForm;
