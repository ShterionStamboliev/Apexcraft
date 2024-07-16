import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProjectsHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[250px]'>
                    Project name
                </TableHead>
                <TableHead className='w-[200px]'>
                    Project company name
                </TableHead>
                <TableHead className='w-[280px]'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ProjectsHeader;