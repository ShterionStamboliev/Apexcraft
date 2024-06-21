import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import DesktopViewButtons from '../UsersTable/UserTableElements/TableButtons/DesktopViewButtons';

const API_URL = import.meta.env.VITE_API_URL;

const ActivitiesTableBody = () => {
    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModified, setIsModified] = useState(false);

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

    const handleEditClick = async (activityId: string | undefined) => {
        setIsDialogOpen(true);

    };

    const handleDisableClick = async (activityId: string | undefined) => {
    };

    useEffect(() => {
        dataFetcher();
    }, []);

    return (
        <>
            <TableBody>
                {data.map((item, i) => (
                    <TableRow key={i}>
                        {Object.keys(item).map((key, i) => (
                            key !== 'ID' && (
                                <TableCell className='text-right' key={i}>
                                    {item[key as keyof typeof item]}
                                </TableCell>
                            )
                        ))}
                        <TableCell className='text-center'>
                            {/* {onDesktop ? (
                                <DesktopViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDisableClick}
                                    userId={user.id}
                                />
                            ) : (
                                <MobileViewButtons
                                    handleEditClick={handleEditClick}
                                    handleDisableClick={handleDisableClick}
                                    userId={user.id}
                                />
                            )} */}
                            {/* <Button className='mr-2' variant={'outline'}>
                                Edit
                            </Button>
                            <Button variant={'outline'}>
                                Deactivate
                            </Button> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}

export default ActivitiesTableBody