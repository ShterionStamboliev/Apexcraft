import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ProjectsSkeletonCard from '@/components/utils/SkeletonLoader/Projects/ProjectsSkeletonCard';
import useProjectsQuery from '@/components/api/projects/projectsQuery';
import EditProjectForm from '@/components/forms/projects-form/ProjectFormEdit/EditProject';

const ProjectsTableBody = () => {
    const { useGetProjects } = useProjectsQuery();
    const { data: projects, isPending, isError, error } = useGetProjects();

    if (isPending) {
        return <ProjectsSkeletonCard data={projects!} />
    };

    if (isError) {
        return <div>Error: {error.message}</div>
    };

    return (
        <>
            {projects?.length === 0 ? (
                <div>No results found</div>
            ) : (projects.map((project) => (
                <Card className='w-[18rem]' key={project.id}>
                    <CardHeader>
                        <CardTitle>
                            <Link to={`/projects/${project.id}/tasks`}>
                                {project.name}
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Address: {project.address}
                        </CardDescription>
                        <CardDescription>
                            Deadline: {
                                new Date(project.end_date!)
                                    .toLocaleDateString()
                                    .slice(0, 10)
                            }
                        </CardDescription>
                        <CardDescription>
                            Status: {project.status}
                        </CardDescription>
                        <CardDescription>
                            Company: {project.company_name}
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <EditProjectForm
                            project={project}
                            projectId={project.id!}
                        />
                    </CardFooter>
                </Card>
            )))}
        </>
    );
};

export default ProjectsTableBody