import { useQueries, useQuery } from '@tanstack/react-query';
import Sidebar from '../Sidebar/Sidebar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import { Measure } from '@/types/measure-types/measureTypes';
import { Activity } from '@/types/activity-types/activityTypes';
const API_URL = import.meta.env.VITE_API_URL;

const Homepage = () => {

    const fetchArtisans = async (): Promise<Artisan[]> => {
        const response = await fetch(`${API_URL}/artisans`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = response.json();
        return data;
    };

    const fetchMeasures = async (): Promise<Measure[]> => {
        const response = await fetch(`${API_URL}/measures`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = response.json();
        return data;
    }
    const fetchActivities = async (): Promise<Activity[]> => {
        const response = await fetch(`${API_URL}/activities`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = response.json();
        return data;
    }


    // const { data: artisans } = useQuery({
    //     queryKey: ['artisans'],
    //     queryFn: fetchArtisans
    // });

    const [artisans, measures, activities] = useQueries({
        queries: [
            {
                queryKey: ['artisans'],
                queryFn: fetchArtisans,
                staleTime: 15000,
            },
            {
                queryKey: ['measures'],
                queryFn: fetchMeasures,
                staleTime: 15000,
            },
            {
                queryKey: ['activities'],
                queryFn: fetchActivities,
                staleTime: 15000,
            },
        ]
    });

    return (
        <>
            <div className="flex gap-2">
                <Sidebar />
                <div className='flex flex-col gap-10'>
                    <h1>These are the artisans of our company</h1>
                    <ul>
                        <div className='flex gap-10'>
                            {artisans.data && artisans.data.map((artisan) => (
                                <ol key={artisan.id}>
                                    <li>
                                        {artisan.id}
                                    </li>
                                    <li>
                                        {artisan.name}
                                    </li>
                                    <li>
                                        {artisan.company}
                                    </li>
                                </ol>
                            ))}
                        </div>
                    </ul>
                    <h1>These are the measures we use</h1>

                    <ul>
                        {measures.data && measures.data.map((measure) => (
                            <ol key={measure.id}>
                                <li>
                                    {measure.id}
                                </li>
                                <li>
                                    {measure.name}
                                </li>
                            </ol>
                        ))}
                    </ul>
                    <h1>These are the activities we provide</h1>
                    <ul>
                        {activities.data && activities.data.map((activity) => (
                            <ol key={activity.id}>
                                <li>
                                    {activity.id}
                                </li>
                                <li>
                                    {activity.name}
                                </li>
                            </ol>
                        ))}
                    </ul>
                </div>


                {/* <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select artisan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {artisans?.map((artisan) => (
                                <SelectItem
                                    key={artisan.id}
                                    value={artisan.name}
                                >
                                    {artisan.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select> */}

            </div >
        </>
    );
}

export default Homepage