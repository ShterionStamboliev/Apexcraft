import { Table } from "../../ui/table"
import { Suspense, lazy, useState } from 'react';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import { useProject } from '@/context/Project/ProjectContext';
import { Project } from '@/types/project-types/projectTypes';
import CreateProject from '@/components/forms/projects-form/ProjectFormCreate/CreateProject';
import ProjectsHeader from './ProjectsTableElements/ProjectsHeader/ProjectsHeader';
import TableTopNavigation from '@/components/common/SearchBar/TableTopNavigation';
import ProjectsLoader from '@/components/utils/SkeletonLoader/Projects/ProjectsLoader';

const ProjectsTableBody = lazy(() => import('@/components/tables/ProjectsTable/ProjectsTableBody'));

const UsersTable = () => {
    const { state } = useProject();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filteredData = useSearchFilter<Project>(state.data, searchQuery);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <TableTopNavigation
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    Component={CreateProject}
                />
                {/* <Table className='w-full min-w-full'> */}
                {/* <ProjectsHeader /> */}
                <div className='flex flex-row flex-wrap gap-5'>
                    <Suspense fallback={<ProjectsLoader />}>
                        <ProjectsTableBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </div>
                {/* </Table> */}
            </div>
        </div>
    );
};

export default UsersTable;