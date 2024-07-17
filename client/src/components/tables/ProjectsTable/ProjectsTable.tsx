import { Table } from "../../ui/table"
import { Suspense, lazy, useState } from 'react';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import FilterDropdown from '@/components/common/Filter/FilterDropdown';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import { useProject } from '@/context/Project/ProjectContext';
import { Project } from '@/types/project-types/projectTypes';
import CreateProject from '@/components/forms/projects-form/ProjectFormCreate/CreateProject';
import ProjectsHeader from './ProjectsTableElements/ProjectsHeader/ProjectsHeader';

const ProjectsTableBody = lazy(() => import('@/components/tables/ProjectsTable/ProjectsTableBody'));

const UsersTable = () => {
    const { state } = useProject();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filteredData = useSearchFilter<Project>(state.data, searchQuery);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>
                        <FilterDropdown />
                        <CreateProject />
                    </div>
                </div>
                <Table className='w-full min-w-full'>
                    <ProjectsHeader />
                    <Suspense fallback={<UsersLoader />}>
                        <ProjectsTableBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </Table>
            </div>
        </div>
    );
};

export default UsersTable;