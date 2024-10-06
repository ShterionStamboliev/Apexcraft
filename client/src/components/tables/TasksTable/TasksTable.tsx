import CreateTask from '@/components/forms/tasks-form/TaskFormCreate/CreateTask';
import ProjectsTasksBody from './TasksTableBody';

const TasksTable = () => {
    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <CreateTask />
                <div className='flex flex-row flex-wrap gap-5'>
                    <ProjectsTasksBody />
                </div>
            </div>
        </div>
    );
};

export default TasksTable;