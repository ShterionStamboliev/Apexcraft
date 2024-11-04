import { Table, TableBody } from "../../../ui/table"
import ActivitiesHeader from '@/components/tables/ActivitiesTable/ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';
import { PaginatedArtisans } from '@/types/artisan-types/artisanTypes';
import ArtisansSkeleton from './ArtisansSkeleton';

type ActivitiesProps = {
    artisans: PaginatedArtisans;
}

const ArtisansLoader = ({ artisans }: ActivitiesProps) => {
    return (
        <Table className='w-full min-w-full'>
            <ActivitiesHeader />
            <TableBody>
                {
                    artisans && Array.from({ length: artisans.data.length }).map((_, i) => (
                        <ArtisansSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default ArtisansLoader