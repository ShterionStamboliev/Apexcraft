import ProjectsSkeletonCard from '@/utils/SkeletonLoader/Projects/ProjectsSkeletonCard';
import { BrickWall, CircleAlert } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import ProjectsCard from './ProjectsCard';
import { Project } from '@/types/project-types/projectTypes';
import CreateProject from '@/components/forms/projects-form/ProjectFormCreate/CreateProject';
import ConditionalRenderer from '@/components/common/ConditionalRenderer/ConditionalRenderer';
import { useFetchDataQuery } from '@/hooks/custom-hooks/useQueryHook';

const ProjectsTableBody = () => {
    const {
        data: projects,
        isPending,
        isError,
    } = useFetchDataQuery<Project[]>({
        URL: '/projects',
        queryKey: ['projects'],
    });

    if (isPending) {
        return <ProjectsSkeletonCard projects={projects} />;
    }

    if (isError) {
        return <ErrorMessage title='Oops...' Icon={CircleAlert} />;
    }

    return (
        <>
            <div className='flex flex-col border rounded-lg mt-8 mx-8 space-y-4 p-4 backdrop-blur-sm bg-slate-900/20'>
                <CreateProject />
            </div>
            <div className='flex flex-col border rounded-lg mt-8 mb-24 md:mt-0 mx-8 p-4 backdrop-blur-sm bg-slate-900/20'>
                <div className='flex flex-wrap sm:w-full gap-4'>
                    <ConditionalRenderer
                        data={projects}
                        renderData={(projects) => (
                            <ProjectsCard projects={projects} />
                        )}
                        noResults={{
                            title: 'No projects found',
                            description:
                                "It looks like you haven't added any projects yet",
                            Icon: BrickWall,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ProjectsTableBody;
