export enum SUPABASE_RESPONSE {
    UPDATE_SUCCESS = 204,
}
export interface ILoginReducerState {
    placeholder: string;
    userStats: IUserStats | null;
    loginDetails: ILoginDetails | null;
}

export interface ILoginDetails {
    userId: string;
    username: string;
    email: string;
}
export interface IUserStats {
    userId?: string;
    articlesRead: number;
    timeSpent: string; // float string
}
