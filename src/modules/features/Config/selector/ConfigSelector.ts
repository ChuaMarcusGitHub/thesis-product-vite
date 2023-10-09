import { AppState } from "@modules/root/rootReducer";
import { createSelector } from "@reduxjs/toolkit";

const configRoot = (state: AppState) => state.config;


export const getDefaultLanguage = createSelector(configRoot, (data) => data.defaultLang )
export const getDefaultFormat = createSelector(configRoot, (data) => data.defaultFormat )