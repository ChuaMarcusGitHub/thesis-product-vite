import { PayloadAction } from "@reduxjs/toolkit";
import { ICRUDResponse } from "@src/modules/root/authprovider/types/AuthSessionTypes";
import { corsHeaders } from "@src/modules/root/webservice/cors";
import { WEBSERVICE_METHOD } from "@src/modules/root/webservice/WebserviceTypes";
import { fetchURL } from "@src/modules/root/webservice/WebserviceUtils";
import { call, fork, put, putResolve, takeLatest } from "redux-saga/effects";
import { LoginActions, setUserStats } from "../actions/LoginActions";
import { ILoginDetails, IUserStats } from "../types/LoginActionPayloadTypes";
import {
    supaGetUserStats,
    supaUpdateUserStats,
} from "./LoginSagaSupabaseCalls";

function* getUserStatsImpl(action: PayloadAction<string>) {
    try {
        // const uuid = action.payload;
        // const uuid = "db650c1a-653c-406c-82ef-3c06e85b8d2b";
        // const testUrl =
        //     "jwyyocimufwwpegtzgpt.supabase.co/functions/v1/get-user-stats";
        const response: ILoginDetails = yield call(
            supaGetUserStats,
            action.payload
        );

        if (response) console.log(response);
    } catch (e) {
        console.error("Error encountered at getUserStatsImpl");
        console.error(e);
    }
}

function* updateUserStatsDbImpl(action: PayloadAction<IUserStats>) {
    try {
        const updateResult: ICRUDResponse = yield call(
            supaUpdateUserStats,
            action.payload
        );
        if (!updateResult.success) {
            console.error("Error encountered - Updateing toast");
            // Update the toast
        } else {
            console.log("Success! Update store now");
            const { articlesRead, timeSpent } = action.payload;
            // ommitting the userId from the state
            yield put(
                setUserStats({
                    articlesRead: articlesRead,
                    timeSpent: timeSpent,
                })
            );
        }
    } catch (e) {
        console.error("Error encountered at udpateUserStatsImpl", e);
    }
}

function* watchLoginSaga() {
    yield takeLatest(LoginActions.GET_USER_STATS, getUserStatsImpl);
    yield takeLatest(LoginActions.UPDATE_USER_STATS_DB, updateUserStatsDbImpl);
}
/* Experiment with creating a dynamic reducer soon */
const loginSaga = fork(watchLoginSaga);
export default loginSaga;
