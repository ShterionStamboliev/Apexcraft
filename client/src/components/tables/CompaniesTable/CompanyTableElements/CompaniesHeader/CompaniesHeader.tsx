import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CompaniesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[375px]'>
                    Company name
                </TableHead>
                <TableHead className='w-[345px] text-center'>
                    Company number
                </TableHead>
                <TableHead className='w-[335px] text-center'>
                    MRP
                </TableHead>
                <TableHead className='w-[200px] text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default CompaniesHeader;