import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@/types/project-types/projectTypes';
import { useProject } from '@/context/Project/ProjectContext';
import { newProjectSchema } from '@/components/models/project/newProjectSchema';

const useEditProject = (project: Project, onSuccess?: () => void) => {
    const { editEntity, isLoading } = useProject();
    const { fireToast } = useToastHook();

    const form = useForm<Project>({
        defaultValues: project && {
            ...project
        },
        resolver: zodResolver(newProjectSchema)
    });

    const { reset } = form;

    const onSubmit = async (data: Project) => {
        try {
            if (project?.id) {
                const isEditSuccess = await editEntity(project.id, data);
                if (isEditSuccess && onSuccess) {
                    onSuccess();
                    reset();
                    fireToast({
                        title: 'Edit successful',
                        variant: 'success',
                    });
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                fireToast({
                    title: error.message,
                    variant: 'destructive',
                });
            }
        }
    };

    return {
        form,
        isLoading,
        onSubmit
    };
};

export default useEditProject;