import { Company } from './companyTypes';

export enum CompanyActionType {
    CREATE_COMPANY_REQUEST = 'CREATE_COMPANY_REQUEST',
    CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS',
    CREATE_COMPANY_ERROR = 'CREATE_COMPANY_ERROR',
    GET_COMPANY_REQUEST = 'GET_COMPANY_REQUEST',
    GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS',
    GET_COMPANY_ERROR = 'GET_COMPANY_ERROR',
    GET_COMPANIES_REQUEST = 'GET_COMPANIES_REQUEST',
    GET_COMPANIES_SUCCESS = 'GET_COMPANIES_SUCCESS',
    GET_COMPANIES_ERROR = 'GET_COMPANIES_ERROR',
    EDIT_COMPANY_REQUEST = 'EDIT_COMPANY_REQUEST',
    EDIT_COMPANY_SUCCESS = 'EDIT_COMPANY_SUCCESS',
    EDIT_COMPANY_ERROR = 'EDIT_COMPANY_ERROR',
    DEACTIVATE_COMPANY_REQUEST = 'DEACTIVATE_COMPANY_REQUEST',
    DEACTIVATE_COMPANY_SUCCESS = 'DEACTIVATE_COMPANY_SUCCESS',
    DEACTIVATE_COMPANY_ERROR = 'DEACTIVATE_COMPANY_ERROR',
}

export type CompanyContextProps = {
    state: {
        company: Company[];
    }
    isLoading?: boolean;
    isCompanyLoading?: boolean;
    error?: string;
    createCompany: (company: Company) => Promise<boolean>;
    getCompany: (companyId: number) => Promise<Company | null>;
    getCompanies: () => Promise<Company[]>;
    deactivateCompany: (companyId: number) => Promise<boolean>;
    editCompany: (companyId: number, company: Company) => Promise<boolean>;
}

export interface CompanyAction {
    type: CompanyActionType;
    payload?: any;
}