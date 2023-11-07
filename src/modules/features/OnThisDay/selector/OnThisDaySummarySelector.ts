import { AppState } from "@modules/root/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const summaryRoot = (state: AppState) => state.OnThisDay.summaryData;
const loadState = (state: AppState) => state.OnThisDay.summaryData.loadState;
const selectedArticle = (state: AppState) =>
    state.OnThisDay.summaryData.selectedArticle;

export const getSummaryRoot = createSelector(summaryRoot, (data) => data);
export const getArticleSummaries = createSelector(summaryRoot, (data) => ({
    selected: data.selected || null, // Order matters
    all: data.all || null,
    births: data.births || null,
    deaths: data.deaths || null,
    events: data.events || null,
    holidays: data.holidays || null,
}));
export const getSelectedBriefArticle = createSelector(
    selectedArticle,
    (data) => data?.brief || null
);
export const getSelectedDetailedArticle = createSelector(
    selectedArticle,
    (data) => data?.detailed || null
);

export const getActiveTabs = createSelector(
    summaryRoot,
    (data) => data.activeTabs
);
// Modal Props
export const getModalProps = createSelector(
    summaryRoot,
    (data) => data.modalProps
);

// Load State Items
export const getIsLoading = createSelector(loadState, (data) => data.isLoading);
