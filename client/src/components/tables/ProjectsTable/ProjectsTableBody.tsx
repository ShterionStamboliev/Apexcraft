import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import useUserEntityHandlers from '@/components/hooks/UserHooks/useUserEntityHook';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useMediaQuery } from 'usehooks-ts';

const dummyData = [
    {
        id: 1,
        projectName: 'St. Park',
        projectCompany: '"Theoinvest"'
    },
    {
        id: 2,
        projectName: 'St. Park',
        projectCompany: '"PST Group"'
    },
    {
        id: 3,
        projectName: 'St. Park',
        projectCompany: '"Stroykom" AD'
    },
]

const ProjectsTableBody = () => {

    const onDesktop = useMediaQuery('(min-width: 960px)');
    const {
        selectedEntity: selectedUser,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess
    } = useUserEntityHandlers();
    return (
        <>
            <TableBody>
                {dummyData.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell>
                            {project.projectName}
                        </TableCell>
                        <TableCell>
                            {project.projectCompany}
                        </TableCell>
                        <TableCell className="text-start w-[200px]">
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
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
                )}
            </TableBody>
        </>
    )
}

export default ProjectsTableBody