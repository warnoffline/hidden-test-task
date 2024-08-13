export type AuthType = {
    auth_token: string;
    refresh_token: string;
    continue_uri: string | null;
}

export type AuthParams = {
    email: string;
    password: string;
}
export type NewTokenType = {
    auth_token: string;
    refresh_token: string;
}