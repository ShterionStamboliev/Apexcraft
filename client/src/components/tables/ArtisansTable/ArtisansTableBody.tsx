import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useArtisansQuery from '@/components/api/artisans/artisansQuery';
import EditArtisanForm from '@/components/forms/artisans-form/ArtisanFormEdit/EditArtisan';

const ArtisansTableBody = () => {
    const { useGetArtisans } = useArtisansQuery();
    const { data: artisans, isPending, isError, error } = useGetArtisans();

    if (isPending) {
        return <ActivitiesLoader />
    };

    if (isError) {
        return <div>Error: {error.message}</div>
    };

    return (
        <TableBody>
            {artisans.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={2} className='text-center text-3xl'>
                        No results found
                    </TableCell>
                </TableRow>
            ) : (
                artisans.map((artisan) => (
                    <TableRow key={artisan.id}>
                        <TableCell>
                            {artisan.name}
                        </TableCell>
                        <TableCell className='text-end w-[200px]'>
                            <EditArtisanForm
                                artisan={artisan}
                                artisanId={artisan.id!}
                            />
                        </TableCell>
                    </TableRow>
                )))}
        </TableBody>
    )
}

export default ArtisansTableBody