import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useUser } from '@/context/User/UserContext';
import { useEffect } from 'react';
import { FetchUser } from '@/types/user-types/userTypes';
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import EditForm from '@/components/forms/user-form/UserFormEdit/EditUser';
import useUserEntityHandlers from '@/components/hooks/UserHooks/useUserEntityHook';
import DesktopViewButtons from '@/components/common/Buttons/DesktopViewButtons';
import MobileViewButtons from '@/components/common/Buttons/MobileViewButtons';

interface UsersTableProps {
    filteredData: FetchUser[];
}

const UsersTableBody = ({ filteredData }: UsersTableProps) => {
    const { getUsers, isLoading, isUserLoading } = useUser();
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
        getUsers();
    }, [getUsers, isModified]);

    if (isLoading) {
        return <TableLoadingPage />
    };

    return (
        <>
            <TableBody>
                {filteredData.map((user, index) => (
                    <TableRow key={index}>
                        {Object.keys(user)
                            .filter(key => key !== 'role' && key !== 'status')
                            .map((key, i) => (
                                key !== 'id' && (
                                    <TableCell key={i}>
                                        {user[key as keyof FetchUser]}
                                    </TableCell>
                                )
                            ))}
                        <TableCell className="text-start w-[200px]">
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
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
                ))}
            </TableBody>

            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                    {!isUserLoading && selectedUser && (
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