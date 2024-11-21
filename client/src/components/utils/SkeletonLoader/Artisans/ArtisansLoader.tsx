import { Table, TableBody } from "../../../ui/table"
import ActivitiesHeader from '@/components/tables/ActivitiesTable/ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import ArtisansSkeleton from './ArtisansSkeleton';
import { PaginatedData } from '@/components/common/Pagination/Pagination';

type ActivitiesProps = {
    artisans: PaginatedData<Artisan> | undefined;
}

const ArtisansLoader = ({ artisans }: ActivitiesProps) => {
    const artisansCount = artisans ? artisans.data.length : 10;

    return (
        <Table className='w-full min-w-full'>
            <ActivitiesHeader />
            <TableBody>
                {
                    Array.from({ length: artisansCount }).map((_, i) => (
                        <ArtisansSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default ArtisansLoader