import { PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import {
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
    setSessionData,
} from "../actions/AuthActions";
import { IAuthLoginEmail } from "../types/AuthSessionTypes";
import {
    fetchSessionData,
    loginEmail,
    logout,
} from "../utils/AuthUtilFunctions";

function* initializeSession() {
    try {
        const sessionData: { session: Session } = yield call(fetchSessionData);

        console.log("----Session Response success - Response Object----");
        console.log(sessionData);

        if (sessionData.session) yield putResolve(setSessionData(sessionData.session));
    } catch (e: any) {
        console.error(
            "Error Encountered at Saga method: AuthAction - initalizeSession"
        );
        console.error(e);
    }
}

function* loginSession(action: PayloadAction<IAuthLoginEmail>) {
    try {
        console.warn(action.payload);
        const sessionData: Session = yield call(loginEmail, action.payload);
        if (sessionData) yield putResolve(setSessionData(sessionData));
    } catch (e: any) {
        console.error(
            "Error Encountered at Saga method: AuthAction - initalizeSession"
        );
        console.error(e);
    }
}

function* logoutSession() {
    try {
        const isSuccess: boolean = yield call(logout);
        if (isSuccess) yield put(clearSessionData());
    } catch (e: any) {
        console.error(
            "Error Encountered at Saga method: AuthAction - initalizeSession"
        );
        console.error(e);
    }
}

function* watchAuthSaga() {
    yield takeLatest(AuthActions.INIT_SESSION, initializeSession);
    yield takeLatest(AuthActions.LOGIN_SESSION, loginSession);
    yield takeLeading(AuthActions.LOGOUT_SESSION, logoutSession);
}
/* Experiment with creating a dynamic reducer soon */
const authSaga = fork(watchAuthSaga);
export default authSaga;
