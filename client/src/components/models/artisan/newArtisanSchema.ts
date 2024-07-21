import { Artisan } from '@/types/artisan-types/artisanTypes';
import { z } from 'zod';

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
    company: z.union([
        z.string()
            .min(1),
        z.string()
            .length(0)])
        .transform(
            companyName => companyName === ""
                ? undefined
                : companyName).optional(),
    status: z.nativeEnum(ArtisanStatus, {
        message: 'Please, select a status'
    }),
});

export const artisanDefaults: Partial<Artisan> = {
    name: '',
    note: '',
    company: '',
    status: ArtisanStatus.inactive
};