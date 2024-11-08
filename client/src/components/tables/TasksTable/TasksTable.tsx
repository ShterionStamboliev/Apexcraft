import CreateTask from '@/components/forms/tasks-form/TaskFormCreate/CreateTask';
import ProjectsTasksBody from './TasksTableBody';
import TasksBreadcrumbs from '@/components/common/Breadcrumbs/TasksBreadcrumbs';

const TasksTable = () => {
    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 overflow-x-auto'>
                <div className='mb-6'>
                    <TasksBreadcrumbs />
                </div>
                <div className='mb-6'>
                    <CreateTask />
                </div>
                <div className='flex flex-row flex-wrap gap-5'>
                    <ProjectsTasksBody />
                </div>
            </div>
        </div>
    );
};

export default TasksTable;