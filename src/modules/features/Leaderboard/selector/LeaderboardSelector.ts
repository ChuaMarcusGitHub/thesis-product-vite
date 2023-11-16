import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@src/modules/root/rootReducer";

const leaderboardRoot = (state: AppState) => state.leaderboard;

export const getLeaderUsers = createSelector(leaderboardRoot, (data) => data.topUsers);
