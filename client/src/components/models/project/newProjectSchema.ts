import { Project } from '@/types/project-types/projectTypes';
import { z } from 'zod';

enum ProjectStatus {
    active = 'active',
    inactive = 'inactive',
}

export const newProjectSchema = z.object({
    name: z.string().min(3, {
        message: 'Project name must be at least 3 characters long.'
    }).max(50, {
        message: 'Project name cannot exceed 50 characters.'
    }),
    company_name: z.string().min(1, {
        message: 'Please select a company.'
    }),
    email: z.string().min(5, {
        message: 'Email must be at least 5 characters long.'
    }).max(50, {
        message: 'Email cannot exceed 50 characters.'
    }).email('Please, enter a valid email.'),
    note: z.string().min(0).max(100, {
        message: 'Note cannot exceed 100 characters.'
    }).optional(),
    status: z.nativeEnum(ProjectStatus, {
        message: 'Please, select a status.'
    }),
});

export const projectDefaults: Partial<Project> = {
    name: '',
    company_name: '',
    email: '',
    note: '',
    status: ProjectStatus.active
}