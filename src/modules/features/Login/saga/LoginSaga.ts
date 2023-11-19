import { PayloadAction } from "@reduxjs/toolkit";
import { signUpSession } from "@src/modules/root/authprovider/actions/AuthActions";
import { ICRUDResponse } from "@src/modules/root/authprovider/types/AuthSessionTypes";

import {
    all,
    call,
    fork,
    put,
    putResolve,
    takeLatest,
} from "redux-saga/effects";
import { IDatabaseCUDResponse } from "@features/Common/Supabase/SupabaseCommonTypes";
import {
    LoginActions,
    setSignupErrors,
    setUserStats,
} from "../actions/LoginActions";
import {
    IDbUserStats,
    IUserDatabaseEntryPayload,
    IUserSignupPayload,
    IUserStats,
    LOGIN_ERROR_KEY,
    LOGIN_ERROR_OBJECTS,
} from "../types/LoginActionPayloadTypes";
import { LoginErrorTypes } from "../types/LoginComponentTypes";
import {
    supaGetUsernameExists,
    supaGetUserStats,
    supaUpdateUserStats,
    supaGetEmailExist,
    updateStatsUsername,
    updateUserSecUsername,
} from "./LoginSagaSupabaseCalls";
import { transformUserStats } from "./LoginSagaUtils";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

function* getUserStatsImpl(action: PayloadAction<string>) {
    try {
        const userId: string = action.payload;
        // guard clause in case action misused or previous call not working
        if (!userId) throw `UserID Invalid!! Id Value: ${userId}`;

        const response: IDbUserStats = yield call(
            supaGetUserStats,
            action.payload
        );

        // Should not occur, since DB should generate stats on signup
        if (!response) throw `User doesn't have available stats!`;

        console.log("Stats Fetched:", response);
        // set user Stats
        yield put(setUserStats(transformUserStats(response)));
    } catch (e) {
        console.error("Error encountered at getUserStatsImpl");
        console.error(e);
        toast(LOGIN_ERROR_OBJECTS[LOGIN_ERROR_KEY.INIT_STATS]);
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

function* userSignupImpl(action: PayloadAction<IUserSignupPayload>) {
    try {
        const { username = "", email = "", password = "" } = action.payload;

        console.log(`payload:`, action.payload);
        // should not occur, but in the event  it does:
        if (!username || !email || !password) {
            yield putResolve(setSignupErrors([LoginErrorTypes.MISSING_FIELDS]));
        }

        // Managed to login as db Owner
        // perform checks on username/ email
        const responseArray: boolean[] = yield all([
            // Perform check on username
            call(supaGetUsernameExists, username),
            // perform check on email
            call(supaGetEmailExist, email),
        ]);

        console.log(responseArray);

        if (responseArray[0] || responseArray[1]) {
            yield call(handleSignupResponseArray, responseArray);
            return;
        }
        // No errors? Sign up user
        yield putResolve(
            signUpSession({
                email: email,
                password: password,
                username: username,
            })
        );
    } catch (e) {
        console.error("Error Encoutnered at userSignupImpl", e);
        toast(LOGIN_ERROR_OBJECTS[LOGIN_ERROR_KEY.SIGNUP]);
    }
}

function* handleSignupResponseArray(resultArray: boolean[]) {
    try {
        const errorList: LoginErrorTypes[] = [];
        if (resultArray[0]) errorList.push(LoginErrorTypes.USERNAME_TAKEN);
        if (resultArray[1]) errorList.push(LoginErrorTypes.EMAIL_IN_USE);

        yield put(setSignupErrors(errorList));
    } catch (e) {
        console.error("Error Encoutnered at handleSignupResponseArray", e);
        toast(LOGIN_ERROR_OBJECTS[LOGIN_ERROR_KEY.SIGNUP]);
    }
}

function* setupUserEntry(action: PayloadAction<IUserDatabaseEntryPayload>) {
    try {
        const { username = "", uid = "", email = "" } = action.payload;

        if (!email || !username || !uid)
            throw "Insufficient Details for DB Setup!";
        // userData is null

        // Update stats with username
        const results: IDatabaseCUDResponse[] = yield all([
            call(updateStatsUsername, uid, username),
            call(updateUserSecUsername, uid, username),
        ]);

        console.log(results);

        // Test for any error, if exist - trhow and return
        results.forEach((result) => {
            if (!result.success) throw result.errorMessage;
        });

        // No Errors fetch the user's stats
        const userStats: IDbUserStats = yield call(supaGetUserStats, uid);
        if (!userStats) throw `Unable to fetch stats for user: ${username}!`;

        yield put(setUserStats(transformUserStats(userStats)));
    } catch (e) {
        console.error("Error at Saga method: LoginAction - setupUserEntry");
        console.log(e);
        toast(LOGIN_ERROR_OBJECTS[LOGIN_ERROR_KEY.SIGNUP]);
    }
}

function* watchLoginSaga() {
    yield takeLatest(LoginActions.GET_USER_STATS, getUserStatsImpl);
    yield takeLatest(LoginActions.UPDATE_USER_STATS_DB, updateUserStatsDbImpl);
    yield takeLatest(LoginActions.USER_SIGNUP, userSignupImpl);
    yield takeLatest(LoginActions.SETUP_USER_ENTRY, setupUserEntry);
}

const testLoginSagaObj = {
    watchLoginSaga: watchLoginSaga,
    getUserStats: getUserStatsImpl,
    updateUserStats: updateUserStatsDbImpl,
    userSignup: userSignupImpl,
    setupUserEntry: setupUserEntry,
};

export { testLoginSagaObj };
/* Experiment with creating a dynamic reducer soon */
const loginSaga = fork(watchLoginSaga);
export default loginSaga;
