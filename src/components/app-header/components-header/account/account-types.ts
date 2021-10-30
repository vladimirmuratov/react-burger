
export type TState = {
    user: {
        isAuth: boolean;
        error: string | '';
        profile: {
            name: string;
        };
        message: string | '';
        successUpdate: boolean;
        isLoading: boolean;
        isForgotEmailForm: boolean;
        user: {
            user: {
                name: string;
            }
        }
    }
}