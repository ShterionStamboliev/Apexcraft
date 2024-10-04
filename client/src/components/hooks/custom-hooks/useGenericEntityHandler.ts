import { User } from '@/types/user-types/userTypes';
import useEntityHandlers from './useEntityHandlers';
import { useUser } from '@/context/User/UserContext';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import { Activity } from '@/types/activity-types/activityTypes';
import { useActivity } from '@/context/Activity/ActivityContext';
import { Project } from '@/types/project-types/projectTypes';
import { useProject } from '@/context/Project/ProjectContext';
import { Company } from '@/types/company-types/companyTypes';
import { useCompany } from '@/context/Company/CompanyContext';

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

export const useUserEntityHandlers = () => useGenericEntityHandler<User>(useUser);
export const useArtisanEntityHandlers = () => useGenericEntityHandler<Artisan>(useArtisan);
export const useActivityEntityHandlers = () => useGenericEntityHandler<Activity>(useActivity);
export const useProjectEntityHandlers = () => useGenericEntityHandler<Project>(useProject);
export const useCompanyEntityHandlers = () => useGenericEntityHandler<Company>(useCompany);

export default useGenericEntityHandler;