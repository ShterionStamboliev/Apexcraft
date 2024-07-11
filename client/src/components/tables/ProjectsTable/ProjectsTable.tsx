import { Table } from '@/components/ui/table'
import ProjectsHeader from './ProjectsTableElements/ProjectsHeader/ProjectsHeader'
import ProjectsTableBody from './ProjectsTableBody'

const ProjectsTable = () => {
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <div className='flex-1 pr-12 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <ProjectsHeader />

                    <ProjectsTableBody />
                </Table>
            </div>
        </div>
    )
}

export default ProjectsTable