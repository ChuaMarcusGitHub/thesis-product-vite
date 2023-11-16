import { AppState } from "@modules/root/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const authStore = (state: AppState) => state.authSession;

export const getSessionData = createSelector(
    authStore,
    (data) => data.sessionData
);
export const getSessionUser = createSelector(
    authStore,
    (data) => data.sessionData?.user
);
export const getAuthError = createSelector(authStore, (data) => data.authError);
export const getIsLoggedIn = createSelector(authStore, (data) =>
    data.sessionData ? true : false
);
