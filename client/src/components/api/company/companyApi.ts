import { useAuth } from '@/context/AuthContext';
import companyReducer, { initialState } from '@/context/Companies/companyReducer'
import { CompanyActionType } from '@/types/company-types/companyActionTypes';
import { Company } from '@/types/company-types/companyTypes';
import { useCallback, useReducer } from 'react'
import { apiCall } from '../apiCall';

const useCompanyApi = () => {
    const [state, dispatch] = useReducer(companyReducer, initialState);

    const { token } = useAuth();

    const createCompany = async (companyData: Company): Promise<boolean> => {
        dispatch({
            type: CompanyActionType.CREATE_COMPANY_REQUEST
        });

        try {
            const newCompanyData: Company = await apiCall('/companies/create', 'POST', token!, companyData);

            dispatch({
                type: CompanyActionType.CREATE_COMPANY_SUCCESS,
                payload: newCompanyData
            });

            await getCompanies();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: CompanyActionType.CREATE_COMPANY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const getCompany = async (companyId: number): Promise<Company | null> => {
        dispatch({
            type: CompanyActionType.GET_COMPANY_REQUEST
        });

        try {
            const company: Company = await apiCall(`/companies/${companyId}`, 'GET', token!);

            dispatch({
                type: CompanyActionType.GET_COMPANY_SUCCESS,
                payload: company,
            });

            return company;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: CompanyActionType.GET_COMPANY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return null;
        }
    };

    const getCompanies = useCallback(async (): Promise<Company[]> => {
        dispatch({
            type: CompanyActionType.GET_COMPANIES_REQUEST,
        });

        try {
            const companies: Company[] = await apiCall('/companies', 'GET', token!);

            dispatch({
                type: CompanyActionType.GET_COMPANIES_SUCCESS,
                payload: companies,
            });

            return companies;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: CompanyActionType.GET_COMPANIES_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return [];
        }
    }, [token]);

    const editCompany = async (companyId: number, companyData: Company): Promise<boolean> => {
        dispatch({
            type: CompanyActionType.EDIT_COMPANY_REQUEST
        });

        try {
            await apiCall(`/companies/${companyId}/edit`, 'PUT', token!, companyData);

            dispatch({
                type: CompanyActionType.EDIT_COMPANY_SUCCESS,
                payload: companyData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: CompanyActionType.EDIT_COMPANY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateCompany = async (companyId: number): Promise<boolean> => {
        dispatch({
            type: CompanyActionType.DEACTIVATE_COMPANY_REQUEST,
        });

        try {
            const company: Company = await apiCall(`/companies/${companyId}/edit`, 'PUT', token!);

            dispatch({
                type: CompanyActionType.DEACTIVATE_COMPANY_SUCCESS,
                payload: company
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: CompanyActionType.DEACTIVATE_COMPANY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    return {
        state,
        createCompany,
        getCompany,
        getCompanies,
        editCompany,
        deactivateCompany
    };
};

export default useCompanyApi;