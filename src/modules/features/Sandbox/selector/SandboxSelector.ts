import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@modules/root/rootReducer";

/* List of Sandbox Selector features */
const getSandboxRoot = (state: AppState) => state.sandbox;

export const getTestItem = createSelector(getSandboxRoot, (data)=> data);