import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { useProject } from '@/context/Project/ProjectContext';
import { Project } from '@/types/project-types/projectTypes';

const useProjectEntityHandlers = () => {
    const {
        createEntity: createProject,
        getEntity: getProject,
        getEntities: getProjects,
        deactivateEntity: deactivateProject,
        isLoading,
    } = useProject();

    return useEntityHandlers<Project>({
        createEntity: createProject,
        getEntity: getProject,
        getEntities: getProjects,
        deactivateEntity: deactivateProject,
        isLoading,
    });
}

export default useProjectEntityHandlers;