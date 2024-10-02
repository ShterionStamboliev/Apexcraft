import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import { Project } from '@/types/project-types/projectTypes';
import { useProject } from '@/context/Project/ProjectContext';
import EditForm from '@/components/forms/projects-form/ProjectFormEdit/EditProject';
import { useCompany } from '@/context/Company/CompanyContext';
import { useProjectEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import { useActivity } from '@/context/Activity/ActivityContext';
import { useMeasure } from '@/context/Measure/MeasureContext';
import ProjectsSkeletonCard from '@/components/utils/SkeletonLoader/Projects/ProjectsSkeletonCard';
import useQueryHooks from '@/components/api/projects/projectsQuery';

const ProjectsTableBody = ({ filteredData }: { filteredData: Project[] }) => {
    const { state, getEntities, isEntityLoading } = useProject();
    // const { getEntities: getCompanies } = useCompany();
    // const { getEntities: getArtisans } = useArtisan();
    // const { getEntities: getActivities } = useActivity();
    // const { getEntities: getMeasures } = useMeasure();

    const { useGetProjectsQuery } = useQueryHooks();

    const { data, isLoading, isError } = useGetProjectsQuery();

    const {
        selectedEntity: selectedProject,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess
    } = useProjectEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    // useEffect(() => {
    //     if (!state.isDataFetched) {
    //         getEntities();
    //         // getArtisans();
    //         // getCompanies();
    //         // getActivities();
    //         // getMeasures();
    //     }
    // }, [state.isDataFetched, getEntities, isModified]);

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