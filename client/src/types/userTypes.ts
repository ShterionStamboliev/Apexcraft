export type UserLoginFormData = {
    username: string;
    password: string;
}

export type LoginFormProps = {
    title?: string;
    buttonText: string;
    isLoading: boolean;
};

// export type User = {
//     username: string;
//     password: string;
//     role?: string;
//     token?: string;
// }