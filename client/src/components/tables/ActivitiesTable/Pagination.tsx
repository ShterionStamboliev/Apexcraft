import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';

type PaginatorProps = {
    totalPages: number | undefined;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Paginator = ({ totalPages, setPage }: PaginatorProps) => {

    const handlePreviousPage = (): void => {
        setPage((previousPage) => Math.max(previousPage - 1, 1));
    };

    const handleNextPage = (): void => {
        setPage((previousPage) => Math.min(previousPage + 1, totalPages as number));
    };

    return (
        <div className='mt-4'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className=''
                            onClick={handlePreviousPage}
                        />
                    </PaginationItem>
                    {
                        new Array(totalPages).fill('_').map((_, index) => (
                            <PaginationItem>
                                <PaginationLink isActive onClick={() => setPage(index + 1)}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={handleNextPage}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default Paginator