const API_URL = import.meta.env.VITE_API_URL;

export const apiCall = async (endpoint: string, method: string, token: string, body?: any) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        
        if (!response.ok) {
            throw new Error('Error');
        }

        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
