import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CompaniesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[375px]'>
                    Company name
                </TableHead>
                <TableHead className='w-[375px]'>
                    Company number
                </TableHead>
                <TableHead className='w-[375px]'>
                    MRP
                </TableHead>
                <TableHead className='w-[375px]'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default CompaniesHeader;