import useProjectApi from '@/components/api/project/projectApi';
import { createContext, useContext } from 'react';
import { Project } from '@/types/project-types/projectTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';

const ProjectContext = createContext<EntityContextProps<Project> | undefined>(undefined);

type ProjectProviderProps = {
    children: React.ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const {
        state,
        createProject,
        getProject,
        getProjects,
        editProject,
        deactivateProject,
    } = useProjectApi();

    return (
        <ProjectContext.Provider value={{
            state,
            createEntity: createProject,
            getEntity: getProject,
            getEntities: getProjects,
            editEntity: editProject,
            deactivateEntity: deactivateProject,
            isLoading: state.isLoading || false,
            isEntityLoading: state.isEntityLoading || false,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('Project context must be used inside of a provider component');
    };
    return context;
}