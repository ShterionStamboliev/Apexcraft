import { createContext, useContext } from 'react';
import { Project } from '@/types/project-types/projectTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';
import useEntityApi from '@/components/api/entityApi';

const ProjectContext = createContext<EntityContextProps<Project> | undefined>(undefined);

type ProjectProviderProps = {
    children: React.ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const {
        state,
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    } = useEntityApi<Project>('projects');

    return (
        <ProjectContext.Provider value={{
            state,
            createEntity,
            getEntity,
            getEntities,
            editEntity,
            deactivateEntity,
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