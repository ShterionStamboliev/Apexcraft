import useProjectApi from '@/components/api/project/projectApi';
import { ProjectContextProps } from '@/types/project-types/projectActionTypes';
import { createContext, useContext } from 'react';

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

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
            createProject,
            getProject,
            getProjects,
            editProject,
            deactivateProject,
            isLoading: state.isLoading || false,
            isProjectLoading: state.isProjectLoading || false,
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