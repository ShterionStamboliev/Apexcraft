import { useAuth } from '@/context/AuthContext';
import { Company } from '@/types/company-types/companyTypes';
import { useCallback, useReducer } from 'react'
import { apiCall } from '../apiCall';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';

const useCompanyApi = () => {
    const initialCompanyState = initialState<Company>();

    const [state, dispatch] = useReducer(entityReducer<Company>, initialCompanyState);

    const { token } = useAuth();

    const createCompany = async (companyData: Company): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST
        });

        try {
            const newCompanyData: Company = await apiCall('/companies/create', 'POST', token!, companyData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newCompanyData
            });

            await getCompanies();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.CREATE_ERROR,
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
            type: EntityActionType.GET_REQUEST
        });

        try {
            const company: Company = await apiCall(`/companies/${companyId}`, 'GET', token!);

            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: company,
            });

            return company;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ERROR,
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
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const companies: Company[] = await apiCall('/companies', 'GET', token!);

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: companies,
            });

            return companies;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ALL_ERROR,
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
            type: EntityActionType.EDIT_REQUEST
        });

        try {
            await apiCall(`/companies/${companyId}/edit`, 'PUT', token!, companyData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: companyData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.EDIT_ERROR,
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
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const company: Company = await apiCall(`/companies/${companyId}/edit`, 'PUT', token!);

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: company
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.DEACTIVATE_ERROR,
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