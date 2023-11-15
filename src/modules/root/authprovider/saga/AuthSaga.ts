/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";
import { initializeNoticeCheck } from "@src/modules/features/Config/actions/ConfigActions";
import {
    clearUserStats,
    getUserStats,
    setupUserEntry,
} from "@src/modules/features/Login/actions/LoginActions";
import {
    clearReadList,
    fetchReadList,
} from "@src/modules/features/OnThisDay/actions/OnThisDaySummaryActions";
import { Session } from "@supabase/supabase-js";
import {
    all,
    call,
    fork,
    put,
    putResolve,
    takeLatest,
    takeLeading,
} from "redux-saga/effects";

import {
    AuthActions,
    clearSessionData,
    setAuthError,
    setSessionData,
} from "../actions/AuthActions";
import {
    AUTH_ERROR_KEY,
    AUTH_ERROR_OBJ,
    IAuthLoginEmail,
    IAuthSessionData,
    ISessionResponse,
} from "../types/AuthSessionTypes";
import {
    getUserSession,
    loginEmail,
    logout,
    setUserSession,
    signup,
} from "../utils/AuthUtilFunctions";

function* initializeSession() {
    try {
        // Check for Notice Required
        yield put(initializeNoticeCheck());

        const sessionData: { session: Session } = yield call(getUserSession);

        console.log("----Session Response success - Response Object----");
        console.log(sessionData);

        if (!sessionData.session) return;

        // Add session to store
        yield putResolve(setSessionData(sessionData.session));
        // Prepare to fetch related Stats for user
        const userId = sessionData.session.user?.id || null;

        if (!userId) return;

        yield put(fetchReadList(userId));
        yield put(getUserStats(userId));
    } catch (e: any) {
        console.error(
            "Error Encountered at Saga method: AuthAction - initalizeSession"
        );
        console.error(e);
    }
}

function* loginSession(action: PayloadAction<IAuthLoginEmail>) {
    try {
        const { password, email } = action.payload;
        if (!password || !email) {
            const errorMsg = AUTH_ERROR_OBJ[AUTH_ERROR_KEY.MISSING_CREDS];
            yield put(setAuthError({ isError: true, errorMsg: errorMsg }));
            throw errorMsg;
        }
        const { session: sessionData = null, error = null }: ISessionResponse =
            yield call(loginEmail, action.payload);
        if (sessionData && !error) {
            yield all([
                putResolve(setSessionData(sessionData)),
                put(getUserStats(sessionData.user.id)),
                put(fetchReadList(sessionData.user.id)),
            ]);
            return true;
        }
        // No session Data, only error
        const loginError = AUTH_ERROR_OBJ[AUTH_ERROR_KEY.INVALID_CREDS];
        yield put(setAuthError({ isError: true, errorMsg: loginError }));
        return false;
    } catch (e: any) {
        console.error(
            "Error Encountered at Saga method: AuthAction - initalizeSession: ",
            e
        );
    }
}

function* logoutSession() {
    try {
        const isSuccess: boolean = yield call(logout);
        if (isSuccess) {
            yield all([
                put(clearSessionData()),
                put(clearUserStats()),
                put(clearReadList()),
            ]);
        }
    } catch (e: any) {
        console.error(
            "Error Encountered at Saga method: AuthAction - initalizeSession"
        );
        console.error(e);
    }
}

function* signUpSessionImpl(action: PayloadAction<IAuthLoginEmail>) {
    try {
        if (!action.payload) return null;
        const response: IAuthSessionData = yield call(signup, action.payload);
        if (!response) return null;

        if (response.session && response.user) {
            yield putResolve(setSessionData(response.session));
            yield call(setUserSession, response.session);
            // Needs to be after the call as session needs to be established and authenticated

            yield putResolve(
                setupUserEntry({
                    uid: response.user.id,
                    username: action.payload.username || "",
                    email: action.payload.email || "",
                })
            );
        }
    } catch (e) {
        console.error(
            "Error Encountered at Saga method: AuthAction - signUpSessionImpl"
        );
        console.error(e);
    }
}

function* watchAuthSaga() {
    yield takeLatest(AuthActions.INIT_SESSION, initializeSession);
    yield takeLatest(AuthActions.LOGIN_SESSION, loginSession);
    yield takeLeading(AuthActions.LOGOUT_SESSION, logoutSession);
    yield takeLeading(AuthActions.SIGN_UP_SESSION, signUpSessionImpl);
}
/* Experiment with creating a dynamic reducer soon */
const authSaga = fork(watchAuthSaga);
export default authSaga;
