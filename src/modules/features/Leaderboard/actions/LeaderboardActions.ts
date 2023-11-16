import { action } from "typesafe-actions";
import { ILeaderboardStats } from "@features/Leaderboard/types/LeaderboardTypes";

export enum LeaderboardActions {
    INIT = "LeaderboardActions/INIT",
    SET_LEADERBOARD_USERS = "LeaderboardActions/SET_LEADERBOARD_USERS",
}

// Sagas
export const initLeaderboard = () => action(LeaderboardActions.INIT);

// Reducers
export const setLeaderboardUsers = (payload: ILeaderboardStats[]) =>
    action(LeaderboardActions.SET_LEADERBOARD_USERS, payload);
