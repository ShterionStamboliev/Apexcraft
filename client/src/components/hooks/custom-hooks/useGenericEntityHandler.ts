import useEntityHandlers from './useEntityHandlers';
import { Project } from '@/types/project-types/projectTypes';
import { useProject } from '@/context/Project/ProjectContext';

type GenericEntityHandlerContext<T> = {
    isLoading?: boolean;
    createEntity: (entity: T, projectId?: number) => Promise<boolean>;
    getEntity: (entityId: number) => Promise<T | null>;
    getEntities: () => Promise<T[]>;
    editEntity?: (entityId: number, entityData: T) => Promise<boolean>;
    deactivateEntity: (entityId: number) => Promise<boolean>;
};

const useGenericEntityHandler = <T>(useContextHook: () => GenericEntityHandlerContext<T>) => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading
    } = useContextHook();

    const createEntityWithProjectId = async (entityData: T, projectId?: number) => {
        return createEntity(entityData, projectId);
    }

    return useEntityHandlers<T>({
        createEntity: createEntityWithProjectId,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
};

export const useProjectEntityHandlers = () => useGenericEntityHandler<Project>(useProject);

export default useGenericEntityHandler;