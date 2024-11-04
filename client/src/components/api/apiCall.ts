import { PaginatedDataResponse } from '../hooks/custom-hooks/useFetchQueryHook';

const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (endpoint: string, method: string, data?: unknown) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Something wrong happened')
    }

    const editEndpointPattern: RegExp = /^\/users\/\d+\/edit$/;

    if (editEndpointPattern.test(endpoint)) {
        return;
    }

    return response.json();
};

export const getPaginatedData = async <T>(
    URL: string,
    page: number,
    limit: number,
): Promise<PaginatedDataResponse<T>> => {
    const data: PaginatedDataResponse<T> = await apiCall(`/${URL}?_page=${page}&_limit=${limit}`, 'GET');
    return data;
};

export const getEntityData = async <T>(
    URL: string
): Promise<T> => {
    const data: T = await apiCall(`${URL}`, 'GET');
    return data;
};

export const createEntity = async <T>(
    URL: string,
    entityData: T
): Promise<void> => {
    const data = await apiCall(`${URL}`, 'POST', entityData);
    return data;
};

export const editEntity = async <T>(
    URL: string,
    entityData: T
): Promise<void> => {
    return await apiCall(`${URL}`, 'PUT', entityData);
};