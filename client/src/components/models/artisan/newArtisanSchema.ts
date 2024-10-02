import { Artisan } from '@/types/artisan-types/artisanTypes';
import { z } from 'zod';
import { phoneValidator } from '../company/newCompanySchema';

enum ArtisanStatus {
    active = 'active',
    inactive = 'inactive'
}

export const newArtisanSchema = z.object({
    name: z.string().min(3, {
        message: 'Artisan name must be at least 3 characters.'
    }).max(50),
    note: z.string().min(0).max(100, {
        message: 'Note cannot exceed 100 characters.'
    }).optional(),
    number: z.string()
        .regex(phoneValidator, { message: 'Invalid phone format' }),
    email: z.string().min(5, {
        message: 'Email must be at least 5 characters long.'
    }).max(50, {
        message: 'Email cannot exceed 50 characters.'
    }).email('Please, enter a valid email.'),
    company: z.string(),
    status: z.nativeEnum(ArtisanStatus, {
        message: 'Please, select a status'
    }),
});

export const artisanDefaults: Partial<Artisan> = {
    name: '',
    note: '',
    email: '',
    number: '',
    company: '',
    status: ArtisanStatus.inactive
};