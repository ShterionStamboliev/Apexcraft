import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useArtisansQuery from '@/components/api/artisans/artisansQuery';
import EditArtisanForm from '@/components/forms/artisans-form/ArtisanFormEdit/EditArtisan';
import { CircleAlert, ContactRound } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';

const ArtisansTableBody = () => {
    const { useGetArtisans } = useArtisansQuery();
    const { data: artisans, isPending, isError, error } = useGetArtisans();

    if (isPending) {
        return <ActivitiesLoader />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <TableBody>
            {artisans.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={2} className='text-center text-3xl'>
                        <NoResultsFound
                            title='No artisans found'
                            description="It looks like you haven't added any artisans yet."
                            Icon={ContactRound}
                        />
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
                )))
            }
        </TableBody>
    )
}

export default ArtisansTableBody