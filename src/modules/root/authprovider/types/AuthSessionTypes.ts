import { AuthError, Session } from "@supabase/supabase-js";

// Self typed because supabase has no typing for this
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
}
export interface IAuthReducerState {
    sessionData?: Session | null;
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
    status: boolean; // true for successful get, false for any failure
}
export interface ICRUDResponse {
    success: boolean;
    errorMessage?: string;
}

