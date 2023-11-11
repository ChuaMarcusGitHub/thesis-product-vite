import { basicErrorTemplate } from "@features/Toast/type/ToastTypes";
import { LoginErrorTypes } from "./LoginComponentTypes";

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
    timeSpent: number; // float
}
export interface IDbUserStats {
    username?: string | null;
    user_id?: string;
    articles_read: number;
    time_spent: number | number;
}
export enum LOGIN_ERROR_KEY {
    LOGIN = "login",
    SIGNUP = "signup",
    INIT_LOGIN = "initializeLogin",
    INIT_STATS = "initUserStats",
}

export const LOGIN_ERROR_OBJECTS = {
    login: {
        description: "Unable to login! Try again later!",
        ...basicErrorTemplate,
    },
    initializeLogin: {
        description: "Unable to initialize user!!",
        ...basicErrorTemplate,
    },
    initUserStats: {
        description: "Unable to fetch user Stats!",
        ...basicErrorTemplate,
    },
    signup: {
        description: "Unable to signup! Try again later!",
        ...basicErrorTemplate,
    },
};
