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
    company_name: z.string().min(4, {
        message: 'Company name must be at least 4 characters'
    }),
    company_number: z.string().min(10, {
        message: 'Number must be at least 10 characters'
    }).transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Not a number',
            });
            return z.NEVER;
        }
        return parsed;
    }),
    company_address: z.string().min(5, {
        message: 'Address must be at least 5 characters'
    }),
    company_mol: z.string().min(6, {
        message: 'MOL name must be at least 6 characters'
    }),
    company_email: z.string().min(6, {
        message: 'Email must be at least 6 characters'
    }).email('Please, enter a valid email'),
    company_phone: z.string().min(10, {
        message: 'Phone number must be at least 10 characters'
    }).transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Not a number',
            });
            return z.NEVER;
        }
        return parsed;
    }),
    company_dds: z.nativeEnum(CompanyDds, {
        message: 'DDS is required',
    }),
    status: z.nativeEnum(CompanyStatus, {
        message: 'Please, select status'
    }),
});

export const formDefaultValues: Partial<Company> = {
    company_dds: 'no',
    status: 'active',
}