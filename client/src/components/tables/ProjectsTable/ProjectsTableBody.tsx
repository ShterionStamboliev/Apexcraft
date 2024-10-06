import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import { useProject } from '@/context/Project/ProjectContext';
import EditForm from '@/components/forms/projects-form/ProjectFormEdit/EditProject';
import { useProjectEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ProjectsSkeletonCard from '@/components/utils/SkeletonLoader/Projects/ProjectsSkeletonCard';
import useQueryHooks from '@/components/api/projects/projectsQuery';

const ProjectsTableBody = () => {
    const { isEntityLoading } = useProject();
    const { useGetProjectsQuery } = useQueryHooks();

    const { data, isLoading, } = useGetProjectsQuery();

    const {
        selectedEntity: selectedProject,
        isDialogOpen,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess
    } = useProjectEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');


    if (data?.length === 0) {
        return <div>No results found.</div>
    };

    if (isLoading) {
        return <ProjectsSkeletonCard data={data!} />
    };

    return (
        <>
            {data?.length === 0 ? (
                <div>No results found</div>
            ) : (
                data && data.map((project) => (
                    <Card className='w-[300px]' key={project.id}>
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
                                Deadline: {new Date(project.end_date!).toLocaleDateString().slice(0, 10)}
                            </CardDescription>
                            <CardDescription>
                                Status: {project.status}
                            </CardDescription>
                            <CardDescription>
                                Company: {project.company_name}
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    hoverLabel='project'
                                    id={project.id!}
                                />
                            ) : (
                                <MobileViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    id={project.id!}
                                />
                            )}
                        </CardFooter>
                    </Card>
                ))
            )}
            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px]'>
                    {!isEntityLoading && selectedProject && (
                        <EditForm
                            project={selectedProject}
                            onSuccess={() => {
                                handleCloseDialog();
                                handleSuccess();
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectsTableBody