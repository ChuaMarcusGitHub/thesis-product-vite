import { call, fork, put, takeLatest } from "redux-saga/effects";
import {
    ILeaderboardStats,
    TOP_LIMIT,
} from "@src/modules/features/Leaderboard/types/LeaderboardTypes";
import {
    LeaderboardActions,
    setLeaderboardUsers,
} from "../actions/LeaderboardActions";
import { supaGetTopXUsers } from "./supaLeaderboardCalls";
import { IDbUserStats } from "@features/Login/types/LoginActionPayloadTypes";
import { transformUserToLeaderboardStats } from "./LeaderboardSagaUtils";

function* initializeLeaderboardImpl() {
    try {
        const userStats: IDbUserStats[] = yield call(
            supaGetTopXUsers,
            TOP_LIMIT
        );
        if (userStats.length) {
            //transform data so that userId is removed
            const transformedUserIds: ILeaderboardStats[] =
                transformUserToLeaderboardStats(userStats);

            yield put(setLeaderboardUsers(transformedUserIds));
        }

    } catch (e) {
        console.error("Error encountered at initializeLeaderboardImpl: ", e);
    }
}

function* watchLeaderboardSaga() {
    yield takeLatest(LeaderboardActions.INIT, initializeLeaderboardImpl);
}
/* Experiment with creating a dynamic reducer soon */
const leaderboardSaga = fork(watchLeaderboardSaga);
export default leaderboardSaga;
