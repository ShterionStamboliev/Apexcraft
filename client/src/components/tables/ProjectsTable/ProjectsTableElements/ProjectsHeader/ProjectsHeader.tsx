import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProjectsHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>
                    Project name
                </TableHead>
                <TableHead>
                    Project company name
                </TableHead>
                <TableHead>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ProjectsHeader;