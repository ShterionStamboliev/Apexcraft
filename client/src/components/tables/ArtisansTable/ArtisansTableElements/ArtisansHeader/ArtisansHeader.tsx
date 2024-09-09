import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ArtisansHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[320px]'>
                    Name
                </TableHead>
                <TableHead className='w-[200px] text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ArtisansHeader;