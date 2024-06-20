import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const ActivitiesTableBody = () => {
    const { token } = useAuth();
    const [data, setData] = useState([]);

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
    console.log(data);

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
                                <TableCell className='text-center' key={i}>
                                    {item[key as keyof typeof item]}
                                </TableCell>
                            )
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}

export default ActivitiesTableBody