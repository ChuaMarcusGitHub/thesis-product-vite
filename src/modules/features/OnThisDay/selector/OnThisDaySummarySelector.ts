import { AppState } from "@modules/root/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const summaryRoot = (state: AppState) => state.OnThisDay.summaryData;
const selectedArticle = (state:AppState) => state.OnThisDay.summaryData.selectedArticle;

export const getSelectedBriefArticle = createSelector(selectedArticle, (data) => data?.brief || null)
export const getSelectedDetailedArticle = createSelector(selectedArticle, (data) => data?.detailed || null)
