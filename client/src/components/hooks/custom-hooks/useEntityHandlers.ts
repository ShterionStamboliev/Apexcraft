import { useEffect, useState } from 'react';
import useToastHook from './useToastHook';
interface UseEntityHandlersProps<T> {
    createEntity: (data: T) => Promise<boolean>;
    getEntity: (id: number) => Promise<T | null>;
    getEntities: () => Promise<T[]>;
    deactivateEntity: (id: number) => Promise<boolean>;
    isLoading?: boolean;
}

type UseEntityHandlers<T,> = {
    selectedEntity: T | undefined;
    isDialogOpen: boolean;
    isModified: boolean;
    isLoading?: boolean;
    handleEditClick: (id: number) => Promise<void>;
    handleDeactivateClick: (id: number) => Promise<void>;
    handleCloseDialog: () => void;
    handleSuccess: () => void;
    handleCreateEntity: (data: T) => Promise<void>;
}

const useEntityHandlers = <T>({
    createEntity,
    getEntity,
    getEntities,
    deactivateEntity,
    isLoading,
}: UseEntityHandlersProps<T>): UseEntityHandlers<T> => {
    const [selectedEntity, setSelectedEntity] = useState<T | undefined>(undefined);
    const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<boolean>(false);
    const { fireToast } = useToastHook();

    const handleCreateEntity = async (data: T) => {
        try {
            const isCreateSuccessful = await createEntity(data);
            if (isCreateSuccessful) {
                setIsCreateSuccess(true);
                fireToast({
                    title: 'Записът беше успешен',
                    variant: 'success',
                });
            } else {
                fireToast({
                    title: 'Съществува запис с избраното име',
                    variant: 'destructive',
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                fireToast({
                    title: error.message,
                    variant: 'destructive',
                })
            }
        }
    };

    useEffect(() => {
        if (isCreateSuccess) {
            setIsCreateSuccess(false);
            setIsModified(true);
        }
    }, [isCreateSuccess]);

    const handleEditClick = async (id: number): Promise<void> => {
        setIsDialogOpen(true);
        const entityData = await getEntity(id);
        if (entityData) {
            setSelectedEntity(entityData);
        }
    };

    const handleDeactivateClick = async (id: number): Promise<void> => {
        await deactivateEntity(id);
        getEntities();
    };

    const handleCloseDialog = (): void => {
        setIsDialogOpen(false);
        setSelectedEntity(undefined);
        if (isModified) {
            getEntities();
        }
        setIsModified(false);
    };

    const handleSuccess = (): void => {
        setIsModified(true);
    };

    return {
        selectedEntity,
        isDialogOpen,
        isModified,
        isLoading,
        handleEditClick,
        handleDeactivateClick,
        handleCloseDialog,
        handleSuccess,
        handleCreateEntity,
    }
}

export default useEntityHandlers;