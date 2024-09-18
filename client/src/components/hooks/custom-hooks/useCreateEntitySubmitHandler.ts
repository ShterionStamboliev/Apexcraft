import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormProps,
    UseFormReturn
} from 'react-hook-form';

const useSubmitHandler = <T extends FieldValues>(
    handleCreateEntity: (entityData: T, projectId?: number) => Promise<void>,
    formOptions: Partial<UseFormProps<T>>,
    projectId?: number
): {
    form: UseFormReturn<T>,
    onSubmit: SubmitHandler<T>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
} => {
    const form = useForm<T>(formOptions);
    const { reset } = form;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSubmit: SubmitHandler<T> = useCallback(async (entityData: T) => {
        await handleCreateEntity(entityData, projectId);
        setIsOpen(false);
        reset();
        console.log(entityData);
        
    }, [handleCreateEntity, projectId, reset])

    return {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    }
}

export default useSubmitHandler;