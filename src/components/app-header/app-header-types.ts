export type TState = {
    user: {
        isAuth: boolean;
        error: string | '';
        profile: object;
        message: string | '';
        successUpdate: boolean;
        isLoading: boolean;
        isForgotEmailForm: boolean;
    };
}