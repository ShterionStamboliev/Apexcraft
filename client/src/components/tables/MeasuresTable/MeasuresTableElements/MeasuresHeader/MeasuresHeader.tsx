import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MeasuresHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>
                    Measure
                </TableHead>
                <TableHead>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default MeasuresHeader;