import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MeasuresHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[320px]'>
                    Measure
                </TableHead>
                <TableHead className='w-[200px] text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default MeasuresHeader;