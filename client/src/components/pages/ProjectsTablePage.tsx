import Sidebar from '../Sidebar/Sidebar'
import ProjectsTable from '../tables/ProjectsTable/ProjectsTable'

const ProjectsTablePage = () => {
    return (
        <div className="flex gap-2 pr-2 md:gap-8">
            <Sidebar />

            <ProjectsTable />
        </div>
    )
}

export default ProjectsTablePage