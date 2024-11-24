import Sidebar from '../Sidebar/Sidebar';
import ProjectsTasksBody from '../tables/TasksTable/TasksTableBody';

const ProjectTasksPage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex flex-col w-full overflow-x-auto md:gap-8">
                <ProjectsTasksBody />
            </div>
        </div>
    );
}

export default ProjectTasksPage;