import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ProjectsSkeletonCard from '@/components/utils/SkeletonLoader/Projects/ProjectsSkeletonCard';
import useProjectsQuery from '@/components/api/projects/projectsQuery';
import EditProjectForm from '@/components/forms/projects-form/ProjectFormEdit/EditProject';
import { BrickWall, CircleAlert } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';

const ProjectsTableBody = () => {
    const { useGetProjects } = useProjectsQuery();
    const { data: projects, isPending, isError, error } = useGetProjects();

    if (isPending) {
        return <ProjectsSkeletonCard count={5} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <>
            {projects.length === 0 ? (
                <NoResultsFound
                    title='No projects found'
                    description="It looks like you haven't added any projects yet."
                    Icon={BrickWall}
                />
            ) : (
                projects.map((project) => (
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
                )))
            }
        </>
    );
};

export default ProjectsTableBody