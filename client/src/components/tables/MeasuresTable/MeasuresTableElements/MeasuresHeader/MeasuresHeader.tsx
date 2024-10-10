import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MeasuresHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[320px] font-bold'>
                    Measure
                </TableHead>
                <TableHead className='w-[200px] font-bold text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default MeasuresHeader;