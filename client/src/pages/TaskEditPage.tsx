import EditTaskForm from '../components/forms/tasks-form/TaskFormEdit/EditTask';
import Sidebar from '../components/Sidebar/Sidebar';

const TaskEditPage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex-1 flex px-2 md:gap-8'>
                <EditTaskForm />
            </div>
        </div>
    );
};

export default TaskEditPage;
