import { useState } from 'react';

interface UseEntityHandlersProps<T> {
    getEntity: (id: number | undefined) => Promise<T | null>;
    getEntities: () => Promise<T[]>;
    deactivateEntity: (id: number | undefined) => Promise<boolean>;
}

type UseEntityHandlers<T> = {
    selectedEntity: T | undefined;
    isDialogOpen: boolean;
    isModified: boolean;
    handleEditClick: (id: number | undefined) => Promise<void>;
    handleDeactivateClick: (id: number | undefined) => Promise<void>;
    handleCloseDialog: () => void;
    handleSuccess: () => void;
}

const useEntityHandlers = <T,>({
    getEntity,
    getEntities,
    deactivateEntity
}: UseEntityHandlersProps<T>): UseEntityHandlers<T> => {
    const [selectedEntity, setSelectedEntity] = useState<T | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<boolean>(false);

    const handleEditClick = async (id: number | undefined): Promise<void> => {
        setIsDialogOpen(true);
        const entityData = await getEntity(id);
        if (entityData) {
            setSelectedEntity(entityData);
        }
    };

    const handleDeactivateClick = async (id: number | undefined): Promise<void> => {
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
        handleEditClick,
        handleDeactivateClick,
        handleCloseDialog,
        handleSuccess
    }
}

export default useEntityHandlers;