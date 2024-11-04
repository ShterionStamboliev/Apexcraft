import { PaginatedUsers, User } from '@/types/user-types/userTypes'
import { apiCall } from '../apiCall'

const useUsersApi = () => {
    const createUser = async (userData: User): Promise<void> => {
        const data = await apiCall('/users/create', 'POST', userData);
        return data;
    };

    const getUsers = async (): Promise<PaginatedUsers> => {
        const data: PaginatedUsers = await apiCall('/users', 'GET');
        return data;
    }

    const getPaginatedUsers = async (page: number, limit: number): Promise<PaginatedUsers> => {
        const data: PaginatedUsers = await apiCall(`/users?_page=${page}&_limit=${limit}`, 'GET');
        return data;
    };

    const editUser = async (userId: string, userData: User): Promise<void> => {
        return await apiCall(`/users/${userId}/edit`, 'PUT', userData);
    };

    return {
        createUser,
        getPaginatedUsers,
        getUsers,
        editUser
    }
}

export default useUsersApi;