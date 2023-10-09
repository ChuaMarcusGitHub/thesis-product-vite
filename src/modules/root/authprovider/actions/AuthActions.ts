import { Session } from "@supabase/supabase-js";
import { action } from "typesafe-actions";
import { IAuthLoginEmail } from "../types/AuthSessionTypes";

export enum AuthActions {
    INIT_SESSION = "AuthActions/INIT",
    LOGIN_SESSION = "AuthActions/LOGIN_SESSION",
    LOGOUT_SESSION = "AuthActions/LOGOUT_SESSION",
    SET_SESSION_DATA = "AuthActions/SET_SESSION_DATA",
    CLEAR_SESSION_DATA = "AuthActions/CLEAR_SESSION_DATA",

}

export const initSession = () => action(AuthActions.INIT_SESSION);
export const loginSession = (payload: IAuthLoginEmail) => action(AuthActions.LOGIN_SESSION, payload);
export const logoutSession = () => action(AuthActions.LOGOUT_SESSION);
export const setSessionData = (payload: Session) => action(AuthActions.SET_SESSION_DATA, payload);
export const clearSessionData = () => action(AuthActions.CLEAR_SESSION_DATA);
