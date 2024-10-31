import { Table } from '@/components/ui/table'
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader'
import CreateActivity from '@/components/forms/activities-form/ActivityFormCreate/CreateActivity'
import ActivitiesTableBody from './ActivitiesTableBody';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const ActivitiesTable = () => {
    return (
        <div className="flex flex-col flex-1 py-8 items-center md:px-0">
            <div className='w-full mb-4'>
                <CreateActivity />
            </div>
            <Table className='w-full min-w-full'>
                <ActivitiesHeader />
                <ActivitiesTableBody />
            </Table>
            <div className='mt-4'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
};

export default ActivitiesTable