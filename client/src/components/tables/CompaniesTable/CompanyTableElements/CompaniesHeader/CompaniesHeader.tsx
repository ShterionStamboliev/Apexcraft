import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CompaniesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[375px] font-bold'>
                    Company name
                </TableHead>
                <TableHead className='w-[345px]  font-bold text-center'>
                    Company number
                </TableHead>
                <TableHead className='w-[335px]  font-bold text-center'>
                    MRP
                </TableHead>
                <TableHead className='w-[200px]  font-bold text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default CompaniesHeader;