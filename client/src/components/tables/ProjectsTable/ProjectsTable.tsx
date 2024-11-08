import CreateProject from '@/components/forms/projects-form/ProjectFormCreate/CreateProject';
import ProjectsTableBody from './ProjectsTableBody';

const ProjectsTable = () => {
    return (
        <div className="relative flex flex-col flex-1 pt-6 overflow-x-auto md:px-0 md:flex-row">
            <div className="flex-1 overflow-x-auto md:pb-0"> 
                <CreateProject />
                <div className="flex flex-row flex-wrap pt-6 mb-24 gap-5">
                    <ProjectsTableBody />
                </div>
            </div>
        </div>
    );
};

export default ProjectsTable;