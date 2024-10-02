import { apiCall } from '../apiCall';
import { Project } from '@/types/project-types/projectTypes';

const useProjectsApi = () => {
    const getProjects = async (): Promise<Project[]> => {
        const data: Project[] = await apiCall('/projects', 'GET');
        return data;
    };

    return {
        getProjects,
    }
}

export default useProjectsApi;