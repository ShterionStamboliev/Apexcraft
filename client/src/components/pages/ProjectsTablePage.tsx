import Sidebar from '../Sidebar/Sidebar'
import ProjectsTableBody from '../tables/ProjectsTable/ProjectsTableBody'

const ProjectsTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex flex-col overflow-x-auto md:gap-8">
                <ProjectsTableBody />
            </div>
        </div>
    )
}

export default ProjectsTablePage