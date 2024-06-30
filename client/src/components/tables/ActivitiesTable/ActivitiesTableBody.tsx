import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import DesktopViewButtons from '../UsersTable/UserTableElements/TableButtons/DesktopViewButtons';
import MobileViewButtons from '../UsersTable/UserTableElements/TableButtons/MobileViewButtons';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useEntityHook from '@/components/hooks/UserHooks/useEntityHook';
import { Activity } from '@/types/activity-types/activityTypes';

const API_URL = import.meta.env.VITE_API_URL;

const ActivitiesTableBody = () => {
    const { token } = useAuth();
    const [data, setData] = useState<Activity[]>();

    const {
        isDialogOpen,
        handleCloseDialog,
        handleEditClick,
        handleDeactivateClick,
    } = useEntityHook();

    const onDesktop = useMediaQuery('(min-width: 960px)');

    const dataFetcher = async () => {
        try {
            const response = await fetch(`${API_URL}/activities`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Грешка при зареждане на данните');
            };

            const data = await response.json();
            if (data) {
                setData(data);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Възникна грешка')
            }
        }
    }

    useEffect(() => {
        dataFetcher();
    }, []);

    return (
        <>
            <TableBody>
                {data && data.map((item, i) => (
                    <TableRow key={i}>
                        <TableCell className='text-right pr-10'>
                            {item.name}
                        </TableCell>
                        <TableCell className='text-center'>
                            {item.status}
                        </TableCell>
                        <TableCell className='text-start pl-10'>
                            {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    userId={item.id}
                                />
                            ) : (
                                <MobileViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDeactivateClick}
                                    userId={item.id}
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

export default ActivitiesTableBody