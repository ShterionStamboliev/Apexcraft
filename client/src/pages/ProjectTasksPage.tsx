import Sidebar from '../components/Sidebar/Sidebar';
import ProjectsTasksBody from '../components/Tables/TasksTable/TasksTableBody';

const ProjectTasksPage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex flex-col w-full overflow-x-auto md:gap-8'>
                <ProjectsTasksBody />
            </div>
        </div>
    );
};

export default ProjectTasksPage;
