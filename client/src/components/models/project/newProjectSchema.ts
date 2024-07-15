import { Project } from '@/types/project-types/projectTypes';
import { z } from 'zod';

enum ProjectStatus {
    active = 'active',
    inactive = 'inactive',
}

export const newProjectSchema = z.object({
    project_name: z.string().min(5, {
        message: 'Name of the project must be at least 5 characters long'
    }),
    project_company: z.string().min(5, {
        message: 'Name of the company must be at least 5 characters long'
    }),
    project_email: z.string().min(5, {
        message: 'Email must be at least 5 characters long'
    }).email('Please, enter a valid email'),
    project_note: z.string().min(10, {
        message: 'Note must be at least 10 characters long'
    }),
    status: z.nativeEnum(ProjectStatus, {
        message: 'Please, select a status'
    }),
});

export const projectDefaults: Project = {
    project_name: '',
    project_company: '',
    project_email: '',
    project_note: '',
    status: 'active',
}