import Sidebar from '../Sidebar/Sidebar';
import ProjectsTasks from '../tables/TasksTable/TasksTable';

const ProjectTasksPage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <ProjectsTasks />
            </div>
        </div>
    );
}

export default ProjectTasksPage;