import { Artisan } from '@/types/artisan-types/artisanTypes';
import { z } from 'zod';

enum ArtisanStatus {
    active = 'active',
    inactive = 'inactive'
}

export const newArtisanSchema = z.object({
    name: z.string().min(5, {
        message: 'Artisan name must be at least 5 characters'
    }),
    note: z.string().min(10, {
        message: 'Note must be at least 10 characters long'
    }),
    company_id: z.union([
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
    company_id: '',
    status: ArtisanStatus.inactive
};