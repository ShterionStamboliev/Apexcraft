import { Project } from '@/types/project-types/projectTypes';
import { useProject } from '@/context/Project/ProjectContext';
import { newProjectSchema } from '@/components/models/project/newProjectSchema';
import useEditEntity from '../custom-hooks/useEditEntityHandler';

const useEditProject = (project: Project, onSuccess?: () => void) => {
    return useEditEntity<Project>({
        entity: project,
        initialFormState: { ...project },
        schema: newProjectSchema,
        useEntityContext: useProject,
        onSuccess,
    });
};

export default useEditProject;