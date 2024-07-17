import { Artisan } from '@/types/artisan-types/artisanTypes';
import { z } from 'zod';

enum ArtisanStatus {
    active = 'active',
    inactive = 'inactive'
}

export const newProjectSchema = z.object({
    name: z.string().min(5, {
        message: 'Name of the project must be at least 5 characters long'
    }),
    note: z.string().min(1, {
        message: 'Please select a company'
    }),
    company: z.string().min(5, {
        message: 'Email must be at least 5 characters long'
    }).email('Please, enter a valid email'),
    user: z.string().min(10, {
        message: 'Note must be at least 10 characters long'
    }),
    status: z.nativeEnum(ArtisanStatus, {
        message: 'Please, select a status'
    }),
});

export const artisanDefaults: Partial<Artisan> = {
    name: '',
    note: '',
    company: '',
    user: '',
    status: ArtisanStatus.active
};