import Sidebar from '../Sidebar/Sidebar';
import ProjectsTasks from '../tables/TasksTable/ProjectsTasksTable';

const ProjectTasksPage = () => {
    return (
        <div className="flex gap-2 md:gap-6">
            <Sidebar />
            
            <ProjectsTasks />
        </div>
    );
}

export default ProjectTasksPage;