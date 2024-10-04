import { useState } from 'react';
import { useProject } from '@/context/Project/ProjectContext';
import CreateProject from '@/components/forms/projects-form/ProjectFormCreate/CreateProject';
import TableTopNavigation from '@/components/common/SearchBar/TableTopNavigation';
import ProjectsTableBody from './ProjectsTableBody';

const ProjectsTable = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <TableTopNavigation
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    Component={CreateProject}
                />
                <div className='flex flex-row flex-wrap gap-5'>
                    <ProjectsTableBody />
                </div>
            </div>
        </div>
    );
};

export default ProjectsTable;