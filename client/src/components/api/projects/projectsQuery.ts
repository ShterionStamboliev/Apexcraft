import { useMutation, useQueryClient } from '@tanstack/react-query';
import useProjectsApi from './projectsApi';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { ProjectSchema } from '@/components/models/project/newProjectSchema';

type DialogStateAction = {
    projectId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useProjectsQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const { createProject, editProject } = useProjectsApi();

    const useCreateProject = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (projectData: ProjectSchema) => createProject(projectData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['projects']
                });
                fireSuccessToast('Project created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditProject = ({ setIsOpen, projectId }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (projectData: ProjectSchema) => editProject(projectId!, projectData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['projects']
                });
                fireSuccessToast('Project updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        })
    };

    return {
        useCreateProject,
        useEditProject
    }
};

export default useProjectsQuery;