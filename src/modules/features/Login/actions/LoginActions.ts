import { action } from "typesafe-actions";
import {
    IUserDatabaseEntryPayload,
    IUserSignupPayload,
    IUserStats,
} from "../types/LoginActionPayloadTypes";
import { LoginErrorTypes } from "../types/LoginComponentTypes";

export enum LoginActions {
    GET_USER_STATS = "LoginActions/GET_USER_STATS", // supabaseCall
    UPDATE_USER_STATS_DB = "LoginActions/UPDATE_USER_STATS_DB",
    USER_SIGNUP = "LoginActions/USER_SIGNUP",
    SETUP_USER_ENTRY = "LoginActions/SETUP_USER_ENTRY",
    // Reducer Calls
    SET_USER_STATS = "LoginActions/SET_USER_STATS",
    SET_SIGNUP_ERRORS = "LoginActions/SET_SIGNUP_ERRORS",
}

// User Stats
export const getUserStats = (payload: string) =>
    action(LoginActions.GET_USER_STATS, payload);
export const setUserStats = (payload: IUserStats) =>
    action(LoginActions.SET_USER_STATS, payload);
export const updateUserStats = (payload: IUserStats) =>
    action(LoginActions.UPDATE_USER_STATS_DB, payload);
export const userSignup = (payload: IUserSignupPayload) =>
    action(LoginActions.USER_SIGNUP, payload);
export const setSignupErrors = (payload: LoginErrorTypes[]) =>
    action(LoginActions.SET_SIGNUP_ERRORS, payload);
export const setupUserEntry = (payload: IUserDatabaseEntryPayload) =>
    action(LoginActions.SETUP_USER_ENTRY, payload);
