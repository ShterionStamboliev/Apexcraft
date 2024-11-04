import { apiCall } from '../apiCall';
import { Project } from '@/types/project-types/projectTypes';

const useProjectsApi = () => {
    const createProject = async (projectData: Project): Promise<Project> => {
        const data: Project = await apiCall('/projects/create', 'POST', projectData);
        return data;
    };

    const editProject = async (projectId: string, projectData: Project): Promise<void> => {
        return await apiCall(`/projects/${projectId}/edit`, 'PUT', projectData);
    };

    return {
        createProject,
        editProject
    }
}

export default useProjectsApi;