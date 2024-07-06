import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ActivitiesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='text-right pr-10'>
                    Activity
                </TableHead>
                <TableHead className='text-center'>
                    Status
                </TableHead>
                <TableHead className='pl-10'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ActivitiesHeader;