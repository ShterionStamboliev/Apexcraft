import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { useProject } from '@/context/Project/ProjectContext';
import { Project } from '@/types/project-types/projectTypes';

const useProjectEntityHandlers = () => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    } = useProject();

    return useEntityHandlers<Project>({
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
}

export default useProjectEntityHandlers;