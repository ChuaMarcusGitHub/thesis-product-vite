import { ActionType, Reducer } from "typesafe-actions";
import { ILeaderboardReducerState } from "@src/modules/features/Leaderboard/types/LeaderboardTypes";
import {
    LeaderboardActions,
    setLeaderboardUsers,
} from "../actions/LeaderboardActions";

const initialState: ILeaderboardReducerState = {
    topUsers: [],
};

type LeaderboardActionType = typeof setLeaderboardUsers;
const leaderboardReducer: Reducer<
    ILeaderboardReducerState,
    ActionType<LeaderboardActionType>
> = (state = initialState, action: ActionType<LeaderboardActionType>) => {
    switch (action.type) {
        case LeaderboardActions.SET_LEADERBOARD_USERS:
            return {
                ...state,
                topUsers: action.payload,
            };
        default:
            return state;
    }
};

export default leaderboardReducer;
