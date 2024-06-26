import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { measures } from './measureDummyData'
import useEntityHook from '@/components/hooks/UserHooks/useEntityHook';
import { useMediaQuery } from 'usehooks-ts';
import DesktopViewButtons from '../UsersTable/UserTableElements/TableButtons/DesktopViewButtons';
import MobileViewButtons from '../UsersTable/UserTableElements/TableButtons/MobileViewButtons';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const MeasuresTableBody = () => {
    const {
        isDialogOpen,
        handleCloseDialog,
        handleEditClick,
        handleDeactivateClick,
    } = useEntityHook();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    return (
        <>
            <TableBody>
                {measures.map((measure, i) => (
                    <TableRow key={i}>
                        <TableCell className='text-right'>
                            {measure.measure}
                        </TableCell>
                        <TableCell className='text-center'>
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    userId={''}
                                />
                            ) : (
                                <MobileViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    userId={''}
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
                    {/* {!isUserLoading && selectedUser && (
                        <EditForm
                            user={selectedUser}
                            onSuccess={() => {
                                handleCloseDialog();
                                handleSuccess();
                            }}
                        />
                    )} */}
                </DialogContent>

            </Dialog>
        </>
    )
}

export default MeasuresTableBody