import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ActivitiesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[320px] font-bold'>
                    Activity
                </TableHead>
                <TableHead className='w-[200px] font-bold text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ActivitiesHeader;