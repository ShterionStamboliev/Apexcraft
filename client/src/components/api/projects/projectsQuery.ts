import { useQuery } from '@tanstack/react-query';
import useProjectsApi from './projectsApi';

const { getProjects } = useProjectsApi();

const useQueryHooks = () => {
    const useGetProjectsQuery = () => {
        return useQuery({
            queryKey: ['projects'],
            queryFn: getProjects,
            staleTime: 0
        });
    };

    return {
        useGetProjectsQuery,
    }
}

export default useQueryHooks;