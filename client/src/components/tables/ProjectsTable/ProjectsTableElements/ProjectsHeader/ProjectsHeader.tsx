import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProjectsHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[250px]'>
                    Project name
                </TableHead>
                <TableHead className='w-[250px] text-center'>
                    Project company name
                </TableHead>
                <TableHead className='w-[220px] text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ProjectsHeader;