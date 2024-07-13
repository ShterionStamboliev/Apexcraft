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
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import { Activity } from '@/types/activity-types/activityTypes';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';

interface ActivitiesTableProps {
    filteredData: Activity[];
}

const ActivitiesTableBody = ({ filteredData }: ActivitiesTableProps) => {
    const { getActivities, isLoading, isActivityLoading } = useActivity();
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
        return <ActivitiesLoader />
    }

    return (
        <>
            <TableBody>
                {filteredData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={2} className='text-center text-3xl'>
                            No results found
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredData.map((activity, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {activity.name}
                            </TableCell>
                            <TableCell className='text-start w-[200px]'>
                                {onDesktop ? (
                                    <DesktopViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        hoverLabel='activity'
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
                    )
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