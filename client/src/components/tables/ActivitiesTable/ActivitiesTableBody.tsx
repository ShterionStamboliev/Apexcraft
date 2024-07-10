import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useActivityEntityHandlers from '@/components/hooks/ActivitiesHooks/useActivitiesEntityHook';
import { useActivity } from '@/context/Activity/ActivityContext';
import EditForm from '@/components/forms/activities-form/ActivityFormEdit/EditActivity';
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';

const ActivitiesTableBody = () => {
    const { state, getActivities, isLoading, isActivityLoading } = useActivity();
    const {
        selectedEntity: selectedActivity,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess,
    } = useActivityEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    useEffect(() => {
        getActivities();
    }, [getActivities, isModified]);

    if (isLoading) {
        return <TableLoadingPage />
    };

    return (
        <>
            <TableBody>
                {state.activity.map((activity, i) => (
                    <TableRow key={i}>
                        <TableCell className='text-right pr-10'>
                            {activity.name}
                        </TableCell>
                        <TableCell className='text-center'>
                            {activity.status}
                        </TableCell>
                        <TableCell className='text-start pl-10'>
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    id={activity.id!}
                                />
                            ) : (
                                <MobileViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    id={activity.id!}
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                    {!isActivityLoading && selectedActivity && (
                        <EditForm
                            activity={selectedActivity}
                            onSuccess={() => {
                                handleCloseDialog();
                                handleSuccess();
                            }}
                        />
                    )}
                </DialogContent>

            </Dialog>
        </>
    )
}

export default ActivitiesTableBody