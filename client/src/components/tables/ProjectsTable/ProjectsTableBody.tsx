import ProjectsSkeletonCard from '@/components/utils/SkeletonLoader/Projects/ProjectsSkeletonCard';
import { BrickWall, CircleAlert } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ProjectsCard from './ProjectsCard';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { Project } from '@/types/project-types/projectTypes';

const ProjectsTableBody = () => {
    const { data: projects, isPending, isError } = useFetchDataQuery<Project[]>({
        URL: '/projects',
        queryKey: ['projects'],
    });

    if (isPending) {
        return <ProjectsSkeletonCard projects={projects} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={'Something went wrong. Please try again.'}
            Icon={CircleAlert}
        />
    };

    return (
        <>
            {
                projects.length === 0 ? (
                    <NoResultsFound
                        title='No projects found'
                        description="It looks like you haven't added any projects yet."
                        Icon={BrickWall}
                    />
                ) : (
                    <ProjectsCard
                        projects={projects}
                    />
                )
            }
        </>
    );
};

export default ProjectsTableBody