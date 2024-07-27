import { UserTuple } from '@/types/user-types/userTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (
    endpoint: string,
    method: string,
    token: string,
    data?: any
) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: data ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
        throw new Error('Грешка при обработка на заявката')
    }

    const editEndpointPattern: RegExp = /^\/users\/\d+\/edit$/;

    if (editEndpointPattern.test(endpoint)) {
        return;
    }

    return response.json();
}