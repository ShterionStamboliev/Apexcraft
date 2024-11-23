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
        <div className="flex flex-col flex-1 py-8">
            <div className='flex flex-col flex-1 py-8 items-center md:px-0'>
                <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 justify-center'>
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
                </div>
            </div>
        </div>
    )
}

export default ArtisansLoader