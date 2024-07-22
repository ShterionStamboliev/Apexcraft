import { Company } from '@/types/company-types/companyTypes';
import { z } from 'zod';

enum CompanyStatus {
    active = 'active',
    inactive = 'inactive',
}

enum CompanyDds {
    yes = 'yes',
    no = 'no',
}

export const newCompanySchema = z.object({
    name: z.string().min(3, {
        message: 'Company name must be at least 3 characters'
    }).max(50, {
        message: 'Company name cannot exceed 50 characters.'
    }),
    number: z.string().min(6, {
        message: 'Number must be at least 6 characters.'
    }).max(11, {
        message: 'Number cannot exceed 11 characters.'
    }).transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Not a number.',
            });
            return z.NEVER;
        }
        return parsed;
    }),
    address: z.string().min(3, {
        message: 'Address must be at least 3 characters'
    }).max(50, {
        message: 'Address cannot exceed 50 characters.'
    }),
    mol: z.string().min(3, {
        message: 'MOL name must be at least 3 characters.'
    }).max(11, {
        message: 'MOL cannot exceed 11 characters.'
    }),
    email: z.string().min(5, {
        message: 'Email must be at least 5 characters.'
    }).max(50, {
        message: 'Email cannot exceed 50 characters.'
    }).email('Please, enter a valid email.'),
    phone: z.string().min(6, {
        message: 'Phone number must be at least 6 characters.'
    }).max(11, {
        message: 'Phone number cannot exceed 11 characters.'
    }).transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Not a number.',
            });
            return z.NEVER;
        }
        return parsed;
    }),
    dds: z.nativeEnum(CompanyDds, {
        message: 'DDS is required.',
    }),
    status: z.nativeEnum(CompanyStatus, {
        message: 'Please, select status.'
    }),
});

export const formDefaultValues: Partial<Company> = {
    name: '',
    number: '',
    address: '',
    mol: '',
    phone: '',
    email: '',
    dds: 'no',
    status: 'active',
}