import EditTask from '../forms/tasks-form/TaskFormEdit/EditTask';
import Sidebar from '../Sidebar/Sidebar';

const TaskEditPage = () => {
    return (
        <div className="flex gap-2 md:gap-2">
            <Sidebar />

            <EditTask />
        </div>
    );
}

export default TaskEditPage