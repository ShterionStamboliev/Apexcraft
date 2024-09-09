import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ActivitiesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[320px]'>
                    Activity
                </TableHead>
                <TableHead className='w-[200px] text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ActivitiesHeader;