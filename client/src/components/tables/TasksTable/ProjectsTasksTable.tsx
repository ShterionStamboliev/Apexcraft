import { Suspense, lazy, useState } from 'react';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import TableTopNavigation from '@/components/common/SearchBar/TableTopNavigation';
import ProjectsLoader from '@/components/utils/SkeletonLoader/Projects/ProjectsLoader';
import { Task } from '@/types/task-types/taskTypes';
import { useTaskContext } from '@/context/Task/TaskContext';
import CreateTask from '@/components/forms/tasks-form/TaskFormCreate/CreateTask';

const ProjectsTasksBody = lazy(() => import('@/components/tables/TasksTable/ProjectsTasksBody'));

const ProjectsTasks = () => {
    const { state } = useTaskContext();
    const { tasks } = state;
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filteredData = useSearchFilter<Task>(tasks, searchQuery);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <TableTopNavigation
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    Component={CreateTask}
                />
                <div className='flex flex-row flex-wrap gap-5'>
                    <Suspense fallback={<ProjectsLoader />}>
                        <ProjectsTasksBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default ProjectsTasks;