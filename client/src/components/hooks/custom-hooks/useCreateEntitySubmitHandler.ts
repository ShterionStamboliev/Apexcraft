import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormProps,
    UseFormReturn
} from 'react-hook-form';

const useSubmitHandler = <T extends FieldValues>(
    handleCreateEntity: (entityData: T) => Promise<void>,
    formOptions: Partial<UseFormProps<T>>
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
        await handleCreateEntity(entityData);
        setIsOpen(false);
        reset();
        console.log(entityData);
        
    }, [handleCreateEntity, reset])

    return {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    }
}

export default useSubmitHandler;