import EditProjectForm from '@/components/forms/projects-form/ProjectFormEdit/EditProject';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/project-types/projectTypes';
import { Link } from 'react-router-dom';

type CardFormProps = {
    projects: Project[];
}

const ProjectsCard = ({ projects }: CardFormProps) => {
    return (
        <>
            {
                projects.map((project) => (
                    <Card className='w-[21rem]' key={project.id}>
                        <CardHeader className='bg-header rounded-t-lg p-5'>
                            <CardTitle>
                                <Link to={`/projects/${project.id}/tasks`} className='transition-transform ease-out hover:underline'>
                                    {project.name}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='p-5'>
                            <CardDescription className='break-words'>
                                <span className='font-semibold pr-1'>Address:</span>
                                <span>{project.address}</span>
                            </CardDescription>
                            <CardDescription>
                                <span className='font-semibold pr-1'>Deadline:</span>
                                <span>
                                    {
                                        new Date(project.end_date!)
                                            .toLocaleDateString()
                                            .slice(0, 10)
                                    }
                                </span>
                            </CardDescription>
                            <CardDescription>
                                <span className='font-semibold pr-1'>Status:</span>
                                <span>{project.status}</span>
                            </CardDescription>
                            <CardDescription>
                                <span className='font-semibold pr-1'>Company:</span>
                                <span>{project.company_name}</span>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className='p-1 justify-center items-center rounded-b-lg border-t'>
                            <EditProjectForm
                                project={project}
                                projectId={project.id!}
                            />
                        </CardFooter>
                    </Card>
                ))
            }
        </>
    )
}

export default ProjectsCard