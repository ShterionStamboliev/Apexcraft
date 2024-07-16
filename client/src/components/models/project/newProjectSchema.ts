import { Project } from '@/types/project-types/projectTypes';
import { z } from 'zod';

enum ProjectStatus {
    active = 'active',
    inactive = 'inactive',
}

export const newProjectSchema = z.object({
    name: z.string().min(5, {
        message: 'Name of the project must be at least 5 characters long'
    }),
    company_id: z.string().min(1, {
        message: 'Please select a company'
    }),
    main_email: z.string().min(5, {
        message: 'Email must be at least 5 characters long'
    }).email('Please, enter a valid email'),
    note: z.string().trim().min(10, {
        message: 'Note must be at least 10 characters long'
    }),
    status: z.nativeEnum(ProjectStatus, {
        message: 'Please, select a status'
    }),
});

export const projectDefaults: Partial<Project> = {
    name: '',
    company_id: '',
    main_email: '',
    note: '',
    status: ProjectStatus.active
}