import Sidebar from '../Sidebar/Sidebar'
import ProjectsTable from '../tables/ProjectsTable/ProjectsTable'

const ProjectsTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <ProjectsTable />
            </div>
        </div>
    )
}

export default ProjectsTablePage