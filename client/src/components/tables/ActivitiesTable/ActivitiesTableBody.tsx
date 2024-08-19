import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useEffect, } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useActivity } from '@/context/Activity/ActivityContext';
import EditForm from '@/components/forms/activities-form/ActivityFormEdit/EditActivity';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import { Activity } from '@/types/activity-types/activityTypes';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import { useActivityEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';

const ActivitiesTableBody = ({ filteredData }: { filteredData: Activity[] }) => {
    const { state, isLoading, getEntities, isEntityLoading } = useActivity();
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
        if (!state.isDataFetched) {
            getEntities();
        }
    }, [state.isDataFetched, getEntities, isModified]);

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
                            <TableCell className='text-end w-[200px]'>
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
                    {!isEntityLoading && selectedActivity && (
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