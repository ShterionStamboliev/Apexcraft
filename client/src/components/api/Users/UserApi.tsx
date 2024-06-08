import { useAuth } from '@/context/AuthContext';
import { CreateUserType } from '@/types/user-types/userTypes';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { UserActionType } from '@/types/user-types/userActionTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateUser = () => {
    const { token, user } = useAuth();
    const { state, dispatch } = useUser();
    console.log(token, user, state);

    const createUserRequest = useMutation({
        mutationFn: (user: CreateUserType) =>
            fetch(`${API_URL}/users/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }).then((response) => response.json()),

        onMutate: () => {
            dispatch({
                type: UserActionType.CREATE_USER_REQUEST
            });
        },
        onSuccess: () => {
            dispatch({
                type: UserActionType.CREATE_USER_SUCCESS
            });
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                dispatch({
                    type: UserActionType.CREATE_USER_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            };
        }
    });

    return {
        createUser: createUserRequest.mutateAsync
    }
};