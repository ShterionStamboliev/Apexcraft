import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import { Project } from '@/types/project-types/projectTypes';
import { useProject } from '@/context/Project/ProjectContext';
import EditForm from '@/components/forms/projects-form/ProjectFormEdit/EditProject';
import { useCompany } from '@/context/Company/CompanyContext';
import ProjectsLoader from '@/components/utils/SkeletonLoader/Projects/ProjectsLoader';
import { useProjectEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';

const ProjectsTableBody = ({ filteredData }: { filteredData: Project[] }) => {
    const { state, getEntities, isLoading, isEntityLoading } = useProject();
    const { getEntities: getCompanies } = useCompany();
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

    useEffect(() => {
        if (!state.isDataFetched) {
            getEntities();
            getCompanies();
        }
    }, [state.isDataFetched, getEntities, isModified]);

    if (isLoading) {
        return <ProjectsLoader />
    };

    return (
        <>
            <TableBody>
                {filteredData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className='text-center text-3xl'>
                            No results found
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredData.map((project, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {project.name}
                            </TableCell>
                            <TableCell className='text-center'>
                                {project.company_name}
                            </TableCell>
                            <TableCell className="text-end w-[200px]">
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
                            </TableCell>
                        </TableRow>
                    )
                    ))}
            </TableBody>

            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
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