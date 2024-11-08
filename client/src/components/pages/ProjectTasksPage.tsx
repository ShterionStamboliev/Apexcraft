import Sidebar from '../Sidebar/Sidebar';
import ProjectsTasks from '../tables/TasksTable/TasksTable';

const ProjectTasksPage = () => {
    return (
        <div className="flex gap-2 pr-2 md:gap-8">
            <Sidebar />
            
            <ProjectsTasks />
        </div>
    );
}

export default ProjectTasksPage;