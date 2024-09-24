const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (
    endpoint: string,
    method: string,
    data?: any
) => {
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
}