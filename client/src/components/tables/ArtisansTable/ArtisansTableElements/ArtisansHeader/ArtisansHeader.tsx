import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ArtisansHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[320px]'>
                    Name
                </TableHead>
                <TableHead className='w-[200px]'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ArtisansHeader;