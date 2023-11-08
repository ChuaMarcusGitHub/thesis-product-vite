import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@src/modules/root/rootReducer";

const getToastRoot = (state: AppState) => state.toast;

export const getToastData = createSelector(
    getToastRoot,
    (data) => data.toastData
);
