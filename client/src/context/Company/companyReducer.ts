import { CompanyAction, CompanyActionType } from '@/types/company-types/companyActionTypes';
import { Company } from '@/types/company-types/companyTypes';

interface InitialCompanyState {
    company: Company[];
    isLoading: boolean;
    isCompanyLoading: boolean;
    error?: string;
}

export const initialState: InitialCompanyState = {
    company: [],
    isCompanyLoading: false,
    isLoading: false,
    error: undefined,
};

const companyReducer = (state: InitialCompanyState, action: CompanyAction) => {
    switch (action.type) {
        case CompanyActionType.CREATE_COMPANY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case CompanyActionType.CREATE_COMPANY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                company: [...state.company, action.payload],
            };
        case CompanyActionType.CREATE_COMPANY_ERROR:
            return {
                ...state,
                isMeasureLoading: false,
                error: action.payload.error,
            };
        case CompanyActionType.GET_COMPANY_REQUEST:
            return {
                ...state,
                isCompanyLoading: true,
                error: undefined,
            };
        case CompanyActionType.GET_COMPANY_SUCCESS:
            return {
                ...state,
                isCompanyLoading: false,
                company: [...state.company],
            };
        case CompanyActionType.GET_COMPANY_ERROR:
            return {
                ...state,
                isCompanyLoading: false,
                error: action.payload.error,
            };
        case CompanyActionType.GET_COMPANIES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case CompanyActionType.GET_COMPANIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                company: action.payload,
            };
        case CompanyActionType.GET_COMPANIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case CompanyActionType.EDIT_COMPANY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case CompanyActionType.EDIT_COMPANY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                company: state.company.map(company =>
                    company.id === action.payload.id
                        ? action.payload
                        : company
                )
            };
        case CompanyActionType.EDIT_COMPANY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case CompanyActionType.DEACTIVATE_COMPANY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case CompanyActionType.DEACTIVATE_COMPANY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                company: state.company.map(company =>
                    company.id === action.payload.id
                        ? { ...company, status: 'inactive' }
                        : company
                )
            };
        case CompanyActionType.DEACTIVATE_COMPANY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default companyReducer;