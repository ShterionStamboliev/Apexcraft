import useToastHook from '../custom-hooks/useToastHook';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

type EditEntityContext<T> = {
    editEntity: (id: number, entityData: T) => Promise<boolean>;
    isLoading?: boolean;
};

type EntityForm<T> = {
    [key: string]: string | number;
} & T;

type EntityFormOptions<T> = {
    initialFormState: DefaultValues<EntityForm<T>>,
    entity: T,
    schema: ZodSchema,
    useEntityContext: () => EditEntityContext<T>,
    onSuccess?: () => void
};

const useEditEntity = <T extends FieldValues>({
    entity,
    initialFormState,
    schema,
    useEntityContext,
    onSuccess,
}: EntityFormOptions<T>) => {
    const { editEntity, isLoading } = useEntityContext();
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const form = useForm<EntityForm<T>>({
        defaultValues: initialFormState,
        mode: 'onChange',
        resolver: zodResolver(schema),
    });

    const { reset } = form;

    const onSubmit = async (data: T) => {
        try {
            const entityId = (entity as any).id;
            if (entityId) {
                const isEditSuccess = await editEntity(entityId, data);
                if (isEditSuccess && onSuccess) {
                    onSuccess();
                    fireSuccessToast('Edit successful.');
                    reset();
                } else {
                    fireErrorToast('There was an error submitting the form.');
                    return;
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                fireErrorToast(error.message);
            };
        };
    };

    return {
        form,
        isLoading,
        onSubmit
    };
};

export default useEditEntity;