import { Button } from '@/components/ui/button';
import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { FetchUser } from '@/types/user-types/userTypes';
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import UserForm from '@/components/forms/user-form/UserFormEdit/UserForm';

const UsersTableBody = () => {
    const { state, getUser, getUsers, isLoading, isUserLoading } = useUser();
    const [selectedUser, setSelectedUser] = useState<FetchUser>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers, isModified]);

    const handleEditClick = async (userId: string | undefined) => {
        setIsDialogOpen(true);
        const data = await getUser(userId);
        if (data) {
            setSelectedUser(data);
        }
        console.log(data);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedUser(undefined);
        if (isModified) {
            getUsers();
        };
        setIsModified(false);
    };

    const handleSuccess = () => {
        setIsModified(true);
    };

    if (isLoading) {
        return <TableLoadingPage />
    };

    return (
        <>
            <TableBody>
                {state.user.map((user, index) => (
                    <TableRow key={index}>
                        {Object.keys(user).map((key, i) => (
                            key !== 'id' && (
                                <TableCell key={i}>
                                    {user[key as keyof FetchUser]}
                                </TableCell>
                            )
                        ))}
                        <TableCell className="text-right w-[300px]">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleEditClick(user.id)}
                                className="h-9 px-4 py-1 mr-2 border rounded-md"
                            >
                                Edit
                            </Button>
                            <Button
                                className="mr-2"
                                variant="outline"
                            >
                                Deactivate
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <Dialog
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            >
                <DialogContent className='max-w-[425px] sm:max-w-[425px]'>
                    {!isUserLoading && selectedUser && (
                        <UserForm
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