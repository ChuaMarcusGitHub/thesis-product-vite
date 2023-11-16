import { AuthError, Session, User } from "@supabase/supabase-js";

// Self typed because supabase has no typing for this
export enum AUTH_ERROR_KEY {
    INVALID_CREDS = "invalidCreds",
    MISSING_CREDS = "missingCreds",
}
export const AUTH_ERROR_OBJ = {
    invalidCreds: "Invalid Username or Password!",
    missingCreds: "Missing Username or Password!",
};
export interface ISessionObject {
    provider_token?: string | null;
    provider_refresh_token?: string | null;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
}
export interface IAuthLoginEmail {
    email: string;
    password: string;
    username?: string;
}
export interface IAuthReducerState {
    sessionUser?: User | null;
    sessionData?: Session | null;
    authError: IAuthErrorPayload | null;
}
export interface IAuthSessionData {
    user: User | null;
    session: Session | null;
}
export interface IAuthSessionObject {
    data: {
        session: Session | null;
    } | null;
    error: AuthError | null;
}
export interface ISessionResponse {
    session?: Session | null;
    error?: AuthError | null;
}
export interface IAuthErrorPayload {
    isError?: boolean;
    errorMsg?: string;
}
export interface ICRUDResponse {
    success: boolean;
    errorMessage?: string;
}
