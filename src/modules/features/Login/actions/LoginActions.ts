import { action } from "typesafe-actions";
import { IUserStats } from "../types/LoginActionPayloadTypes";

export enum LoginActions {
    GET_USER_STATS = "LoginActions/GET_USER_STATS", // supabaseCall
    UPDATE_USER_STATS_DB = "LoginActions/UPDATE_USER_STATS_DB",
    // Reducer Calls
    SET_USER_STATS = "LoginActions/SET_USER_STATS",
}

// User Stats
export const getUserStats = (payload: string) =>
    action(LoginActions.GET_USER_STATS, payload);
export const setUserStats = (payload: IUserStats) =>
    action(LoginActions.SET_USER_STATS, payload);
export const updateUserStats = (payload: IUserStats) =>
    action(LoginActions.UPDATE_USER_STATS_DB, payload);
