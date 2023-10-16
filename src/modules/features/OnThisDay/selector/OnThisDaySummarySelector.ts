import { AppState } from "@modules/root/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const summaryRoot = (state: AppState) => state.OnThisDay.summaryData;
const loadState = (state: AppState) => state.OnThisDay.summaryData.loadState;
const selectedArticle = (state: AppState) =>
    state.OnThisDay.summaryData.selectedArticle;

export const getSummaryRoot = createSelector(summaryRoot, (data) => data);
export const getArticleSummaries = createSelector(summaryRoot, (data) => ({
    births: data.births || null,
    deaths: data.deaths || null,
    events: data.events || null,
    holidays: data.holidays || null,
    selected: data.selected || null,
}));
export const getSelectedBriefArticle = createSelector(
    selectedArticle,
    (data) => data?.brief || null
);
export const getSelectedDetailedArticle = createSelector(
    selectedArticle,
    (data) => data?.detailed || null
);

// Load State Items
export const getIsLoading = createSelector(loadState, (data) => data.isLoading);
