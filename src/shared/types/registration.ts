export type RegParams = {
    email: string;
    password: string;
    repeat_password: string;
}
export type ConfirmType = {
    success: boolean;
    message: string;
    result: {
        email: string;
        email_verified: boolean;
    }
}
export type ConfirmParams = {
    confirmation_code: string;
}

export type RegistrationType = {
    success: boolean;
    message: string;
}