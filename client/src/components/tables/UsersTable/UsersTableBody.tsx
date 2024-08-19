import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useUser } from '@/context/User/UserContext';
import { useEffect } from 'react';
import { User } from '@/types/user-types/userTypes';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import EditForm from '@/components/forms/user-form/UserFormEdit/EditUser';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import { useUserEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';

const UsersTableBody = ({ filteredData }: { filteredData: User[] }) => {
    const { state, getEntities, isLoading, isEntityLoading } = useUser();
    const {
        selectedEntity: selectedUser,
        isDialogOpen,
        isModified,
        handleCloseDialog,
        handleDeactivateClick,
        handleEditClick,
        handleSuccess
    } = useUserEntityHandlers();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    useEffect(() => {
        if (!state.isDataFetched) {
            getEntities();
        }
    }, [state.isDataFetched, getEntities, isModified]);

    if (isLoading) {
        return <UsersLoader />
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
                    filteredData.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {user.name_and_family}
                            </TableCell>
                            <TableCell className='text-center'>
                                {user.username}
                            </TableCell>
                            <TableCell className="text-end w-[200px]">
                                {onDesktop ? (
                                    <DesktopViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        hoverLabel='user'
                                        id={user.id!}
                                    />
                                ) : (
                                    <MobileViewButtons
                                        handleEditClick={handleEditClick}
                                        handleDisableClick={handleDeactivateClick}
                                        id={user.id!}
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
                    {!isEntityLoading && selectedUser && (
                        <EditForm
                            user={selectedUser}
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

export default UsersTableBody