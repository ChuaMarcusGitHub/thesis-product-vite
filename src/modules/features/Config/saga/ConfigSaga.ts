import { PayloadAction } from "@reduxjs/toolkit";
import { fork, put, takeLeading } from "redux-saga/effects";

import { LOCAL_STORAGE_KEYS } from "@features/Common/types/LocalStorageTypes";
import { ConfigActions, setStoreNoticeRequied } from "../actions/ConfigActions";

function* initNoticeCheckImpl() {
    try {
        // If item not found - new user so trigger notice
        const noticeItem =
            localStorage.getItem(LOCAL_STORAGE_KEYS.noticeRequired) || "true";

        console.log(
            `Get LocalStorage Item: ${LOCAL_STORAGE_KEYS.noticeRequired}: ${noticeItem}`
        );

        const noticeFlag = noticeItem === "true" ? true : false;

        yield put(setStoreNoticeRequied(noticeFlag));
    } catch (e) {
        console.error(`Error in initNoticeCheckmpl: `, e);
    }
}

function* updateNoticeRequiredImpl(action: PayloadAction<boolean>) {
    try {
        const flag = action.payload || false;

        localStorage.setItem(LOCAL_STORAGE_KEYS.noticeRequired, `${flag}`);
        yield put(setStoreNoticeRequied(flag));
    } catch (e) {
        console.error(`Error in initNoticeCheckmpl: `, e);
    }
}

function* watchConfigSaga() {
    yield takeLeading(ConfigActions.INIT_NOTICE_CHECK, initNoticeCheckImpl);
    yield takeLeading(
        ConfigActions.UPDATE_NOTICE_REQ,
        updateNoticeRequiredImpl
    );
}

const configSaga = fork(watchConfigSaga);
export default configSaga;
