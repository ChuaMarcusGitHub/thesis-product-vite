import { LoginErrorTypes } from "./LoginComponentTypes";

export enum SUPABASE_RESPONSE {
    UPDATE_SUCCESS = 204,
}
export interface ILoginReducerState {
    userStats: IUserStats | null;
    loginDetails: ILoginDetails | null;
    signupErrors: LoginErrorTypes[] | null;
}

export interface IUserSignupPayload {
    email: string;
    username: string;
    password: string;
}

export interface IUserDatabaseEntryPayload {
    uid?: string;
    username?: string;
    email?: string;
}

export interface ILoginDetails {
    userId: string;
    username: string;
    email: string;
}
export interface IUserStats {
    userId?: string;
    username?: string | null;
    articlesRead: number;
    timeSpent: number; // float string
}
export interface IDbUserStats {
    username?: string | null;
    user_id?: string;
    articles_read: number;
    time_spent: number | number;
}
export interface IDatabaseCUDResponse {
    // No "R" of CRUD
    success: boolean;
    errorMessage?: string;
}
